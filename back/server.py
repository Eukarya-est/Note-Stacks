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
    
    result = ();

    # Inquery defalut data
    try:
        cursor = mysql.connect().cursor()
        
        query = "SELECT * FROM page_test WHERE COVER = %s AND DISPLAY = 1 ORDER BY NUM DESC LIMIT 5"
        cursor.execute(query, category)
        defaultPages = cursor.fetchall()

    except Exception as error:
        error_logger.error(f"Failed: SELECT * FROM page_test WHERE COVER = {category} AND DISPLAY = 1 ORDER BY NUM DESC LIMIT 3")
        error_logger.error(error)

    while(len(defaultPages) != 5):
            carrier = list(defaultPages)
            carrier.append((" - " ," - "," - "," - "," - " ," - "," - " ," - "," - " ," - "))
            defaultPages = tuple(carrier)
    
    debug_logger.debug(f"{carrier}")
            
    # Inquery supreme number
    try:
        cursor = mysql.connect().cursor()
        
        query = "SELECT MAX(NUM) FROM page_test WHERE COVER = %s AND DISPLAY = 1"
        cursor.execute(query, category)
        suptemp = cursor.fetchall()

    except Exception as error:
        error_logger.error(f"Failed: SELECT MAX(NUM) FROM page_test WHERE COVER = {category} AND DISPLAY = 1")
        error_logger.error(error)

    carrier.insert(0,(list(suptemp)[0]))
    debug_logger.debug(f"{carrier}")

    result = tuple(carrier)
    
    debug_logger.debug(f"{result}")
    return jsonify(result)

@app.route('/api/shelf/<category>/<int:number>', methods=['GET'])
def getPages(category, number):

    try:
        cursor = mysql.connect().cursor()

        rangePre = number - 2
        rangePost = number + 2

        query = "SELECT * FROM page_test WHERE (NUM BETWEEN %s AND %s) AND COVER = %s AND DISPLAY = 1 ORDER BY NUM DESC"
        var = (rangePre, rangePost, category)
        cursor.execute(query, var)
        pages = cursor.fetchall()
        cursor.close()
    
    except Exception as error:
        error_logger.error(f"Failed: SELECT * FROM page_test WHERE (NUM BETWEEN {number - 2} AND {number + 2}) AND COVER = {category} AND DISPLAY = 1 ORDER BY NUM DESC")
        error_logger.error(error)

    while(len(pages) != 5):
        temp = list(pages)
        temp.append((" - " ," - "," - "," - "," - " ," - "," - " ," - "," - " ," - "))
        pages = tuple(temp)

    debug_logger.debug(f"{pages}")
    return jsonify(pages)

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

@app.route('/api/shelf -', methods=['GET'])
def getNonePage():
    
    return ' - ';

if __name__ == '__main__':
    app.run(debug=True)