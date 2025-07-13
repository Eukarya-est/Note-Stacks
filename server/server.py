from flask import Flask, jsonify, Response

import os
from logger import debug_logger, info_logger, warning_logger, error_logger
from json_handler import _load_json, _create_json, _reset_json
from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL(app)
dbconfig = _load_json('mysql.json')
app.config['MYSQL_HOST'] = dbconfig['host']
app.config['MYSQL_DATABASE_USER'] = dbconfig['user']
app.config['MYSQL_DATABASE_PASSWORD'] = dbconfig['password']
app.config['MYSQL_DATABASE_DB'] = dbconfig['db']
app.config['MYSQL_DATABASE_PORT'] = dbconfig['port']
mysql.init_app(app)

def _get_upper_limit(category):
    carrier = {}
    
    try:
        cursor = mysql.connect().cursor()
        
        query = "SELECT MAX(NUM) FROM page_test WHERE COVER = %s AND DISPLAY = 1"
        cursor.execute(query, category)
        upper_limit = cursor.fetchall()
        cursor.close()

    except Exception as error:
        error_logger.error(f"Failed: SELECT MAX(NUM) FROM page_test WHERE COVER = {category} AND DISPLAY = 1")
        error_logger.error(error)

    if not upper_limit or not upper_limit[0][0]:
        upper_limit = 0

    carrier['category'] = category
    carrier['bound'] = upper_limit[0][0]

    debug_logger.debug(f"{carrier}")

    return carrier

@app.route('/server/shelf', methods=['GET'])
def _get_shelf_category():

    _make_dir = os.listdir('../markdown')
    shelf_category = _load_json('shelf_category.json')

    if not _make_dir:
        error_logger.error("No markdown files found in the directory.")
        return "No markdown files found", 404
    
    dir_count = 1
    rebuild_flag = False
    for key in shelf_category:
        if shelf_category[key] not in _make_dir:
            _reset_json('shelf_category.json')
            rebuild_flag = True
            info_logger.info("There is difference from shelf_category and markdown directories, Reset Json")
            break;
        else:
            dir_count += 1

    """ Error handling for 'shelf_category.json' """

    # If 'shelfCategory.json' does not exist, create it
    if not os.path.exists('shelf_category.json'):
        info_logger.info("'shelf_category.json' does not exist, creating a new one...")
        _reset_json('shelf_category.json')
        for dir in _make_dir:
            _create_json('shelf_category.json', dir_count, dir)
            dirCount += 1
        shelf_category = _load_json('shelf_category.json')
    
    # If 'shelfCategory.json' is not a valid JSON object, return an error
    if not isinstance(shelf_category, dict):
            error_logger.error("'shelfCategory.json' is not a valid JSON object.")
            return "Invalid 'shelfCategory.json' format", 500
    
    # If 'shelfCategory.json' does not match the markdown diretories, return an error
    if len(_make_dir) != len(shelf_category):
        rebuildFlag = True
    
    # If 'shelfCategory.json' has duplicate keys, return an error
    if len(shelf_category) != len(set(shelf_category.values())):
        error_logger.error("'shelf_category.json' has duplicate keys, please check the markdown files.")
        return "'shelf_category.json' has duplicate keys", 500
    
    if rebuild_flag:
        info_logger.info("Rebuilding 'shelf_category.json'...")
        for dir in _make_dir:
            _create_json('shelf_category.json', dir_count, dir)
            dir_count += 1
        shelf_category = _load_json('shelf_category.json')

    return shelf_category

@app.route('/server/shelf/<category>', methods=['GET'])
def _get_default_pages(category):
    carrier = {}
    upper_limit = ''

    try:
        response = _get_upper_limit(category)
        upper_limit = response['bound']

    except Exception as error:
        error_logger.error(error)

    range_post = upper_limit
    range_pre = range_post - 2
    if range_pre < 1:
        range_pre = 1

    try:
        cursor = mysql.connect().cursor()

        query = "SELECT NUM, TITLE FROM page_test WHERE (NUM BETWEEN %s AND %s) AND COVER = %s AND DISPLAY = 1 ORDER BY NUM DESC"
        var = (range_pre, range_post, category)
        cursor.execute(query, var)
        pages = cursor.fetchall()
        cursor.close()
    
    except Exception as error:
        error_logger.error(f"Failed: SELECT * FROM page_test WHERE (NUM BETWEEN {range_pre} AND {upper_limit}) AND COVER = {category} AND DISPLAY = 1 ORDER BY NUM DESC")
        error_logger.error(error)

    while(len(pages) != 5):
        temp = list(pages)
        temp.append((" - " ," - "))
        pages = tuple(temp)

    carrier['category']= category
    carrier['bound'] = upper_limit
    carrier['pages'] = pages

    debug_logger.debug(f"{carrier}")

    return jsonify(carrier)

@app.route('/server/shelf/<category>/<int:number>', methods=['GET'])
def _get_pages(category, number):
    upper_limit = ''
    range_pre = number - 2
    range_post = number + 2

    try:
        response = _get_upper_limit(category)
        upper_limit = response['bound']

    except Exception as error:
        error_logger.error(error)

    diff = range_post - upper_limit 
    if(0 <= diff <= 2):
        range_post = upper_limit
        range_pre = upper_limit - 4

    debug_logger.debug(f"{diff}")

    try:
        cursor = mysql.connect().cursor()   

        query = "SELECT NUM, TITLE FROM page_test WHERE (NUM BETWEEN %s AND %s) AND COVER = %s AND DISPLAY = 1 ORDER BY NUM DESC"
        var = (range_pre, range_post, category)
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

    debug_logger.debug(f"{pages}")
    
    return jsonify(pages)

@app.route('/server/shelf/<category>/<int:number>/page', methods=['GET'])
def _get_page(category, number):

    try:
        cursor = mysql.connect().cursor()

        query = "SELECT * FROM page_test WHERE NUM = %s AND COVER = %s AND DISPLAY = 1"
        var = (number, category)
        cursor.execute(query, var)
        page = cursor.fetchall()
        cursor.close()
    
    except Exception as error:
        error_logger.error(f"Failed: SELECT * FROM page_test WHERE NUM = %s AND COVER = %s AND DISPLAY = 1")
        error_logger.error(error)

    debug_logger.debug(f"{page[0]}")

    return jsonify(page[0])

@app.route('/server/shelf/<category>/<int:number>/<MD>', methods=['GET'])
def _get_markdown(category, number, MD):

    file_path = f'../markdowns/{category}/{MD}'

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()

        # Return as plain text
        return Response(text, mimetype='text/plain')

    except Exception as error:
        error_logger.error(f"Failed: Load Markdown")
        error_logger.error(error)
    
if __name__ == '__main__':
    app.run(debug=True)