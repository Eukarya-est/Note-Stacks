from flask import Flask, jsonify, Response

import os
import markdown
from logger import debug_logger, info_logger, warning_logger, error_logger
from jsonHandler import loadJson, createJson, resetJson
from flaskext.mysql import MySQL


app = Flask(__name__)

mysql = MySQL(app)
dbconfig = loadJson('mysql.json')
app.config['MYSQL_HOST'] = dbconfig['host']
app.config['MYSQL_DATABASE_USER'] = dbconfig['user']
app.config['MYSQL_DATABASE_PASSWORD'] = dbconfig['password']
app.config['MYSQL_DATABASE_DB'] = dbconfig['db']
app.config['MYSQL_DATABASE_PORT'] = dbconfig['port']
mysql.init_app(app)

# Initialize shelfCategory variable
shelfCategory = 0
supNum = 0;

@app.route('/api/shelf', methods=['GET'])
def getShelfCategory():
    global shelfCategory

    markDir = os.listdir('../markdown')
    shelfCategory = loadJson('shelfCategory.json')

    if not markDir:
        error_logger.error("No markdown files found in the directory.")
        return "No markdown files found", 404
    
    dirCount = 1
    rebuildFlag = False
    for key in shelfCategory:
        if shelfCategory[key] not in markDir:
            resetJson('shelfCategory.json')
            rebuildFlag = True
            break;
        else:
            dirCount += 1

    """ Error handling for 'shelfCategory.json' """

    # If 'shelfCategory.json' does not exist, create it
    if not os.path.exists('shelfCategory.json'):
        info_logger.info("'shelfCategory.json' does not exist, creating a new one...")
        resetJson('shelfCategory.json')
        for dir in markDir:
            createJson('shelfCategory.json', dirCount, dir)
            dirCount += 1
        shelfCategory = loadJson('shelfCategory.json')
    
    # If 'shelfCategory.json' is not a valid JSON object, return an error
    if not isinstance(shelfCategory, dict):
            error_logger.error("'shelfCategory.json' is not a valid JSON object.")
            return "Invalid 'shelfCategory.json' format", 500
    
    # If 'shelfCategory.json' does not match the markdown diretories, return an error
    if len(markDir) != len(shelfCategory):
        rebuildFlag = True
    
    # If 'shelfCategory.json' has duplicate keys, return an error
    if len(shelfCategory) != len(set(shelfCategory.values())):
        error_logger.error("'shelfCategory.json' has duplicate keys, please check the markdown files.")
        return "'shelfCategory.json' has duplicate keys", 500
    
    if rebuildFlag:
        info_logger.info("Rebuilding 'shelfCategory.json'...")
        for dir in markDir:
            createJson('shelfCategory.json', dirCount, dir)
            dirCount += 1
        shelfCategory = loadJson('shelfCategory.json')

    return shelfCategory

@app.route('/api/shelf/<category>', methods=['GET'])
def getDefault(category):
    global supNum
    
    try:
        cursor = mysql.connect().cursor()
        
        query = "SELECT MAX(NUM) FROM page_test WHERE COVER = %s AND DISPLAY = 1"
        cursor.execute(query, category)
        supreme = cursor.fetchall()
        cursor.close()

    except Exception as error:
        error_logger.error(f"Failed: SELECT MAX(NUM) FROM page_test WHERE COVER = {category} AND DISPLAY = 1")
        error_logger.error(error)

    if not supreme or not supreme[0][0]:
        supreme = 0

    supNum = supreme[0][0]  
       
    debug_logger.debug(f"{supNum}")

    return jsonify(supNum)

@app.route('/api/shelf/<category>/<int:number>', methods=['GET'])
def getPages(category, number):
    carrier = {}

    try:
        cursor = mysql.connect().cursor()
 
    # Ensure the number is within the valid range
        if number - 2 < 1:
            rangePre = 1
        else:
            rangePre = number - 2
        if number + 2 > supNum: 
            rangePost = supNum
        else:
            rangePost = number + 2

        query = "SELECT NUM, TITLE FROM page_test WHERE (NUM BETWEEN %s AND %s) AND COVER = %s AND DISPLAY = 1 ORDER BY NUM DESC"
        var = (rangePre, rangePost, category)
        cursor.execute(query, var)
        pages = cursor.fetchall()
        cursor.close()
    
    except Exception as error:
        error_logger.error(f"Failed: SELECT * FROM page_test WHERE (NUM BETWEEN {number - 2} AND {number + 2}) AND COVER = {category} AND DISPLAY = 1 ORDER BY NUM DESC")
        error_logger.error(error)

    while(len(pages) != 5):
        temp = list(pages)
        temp.append((" - " ," - "))
        pages = tuple(temp)
        carrier['pages'] = pages

    try:
        cursor = mysql.connect().cursor()

        query = "SELECT * FROM page_test WHERE NUM = %s  AND COVER = %s AND DISPLAY = 1"
        var = (number, category)
        cursor.execute(query, var)
        page = cursor.fetchall()
        cursor.close()
    
    except Exception as error:
        error_logger.error(f"Failed: SELECT * FROM page_test WHERE (NUM BETWEEN {number - 2} AND {number + 2}) AND COVER = {category} AND DISPLAY = 1 ORDER BY NUM DESC")
        error_logger.error(error)

    carrier['page'] = page[0]
    debug_logger.debug(f"{page}")

    return jsonify(carrier)

@app.route('/api/shelf/<category>/<int:number>/<MD>', methods=['GET'])
def getPage(category, number, MD):

    file_path = f'../markdown/{category}/{MD}'

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()
        # Return as plain text
        return Response(text, mimetype='text/plain')
    
    except Exception as error:
        error_logger.error(f"Failed: Load Markdown")
        error_logger.error(error)
        
        return text

if __name__ == '__main__':
    app.run(debug=True)