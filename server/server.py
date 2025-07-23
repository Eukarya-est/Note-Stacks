from flask import Flask, jsonify, Response

import os
from logger import debug_logger, info_logger, warning_logger, error_logger
from json_handler import load_json, create_json, reset_json
from db_manager import DBManager


app = Flask(__name__)

mysql = DBManager()

def get_upper_limit(category):
    carrier = {}

    try:
        upper_limit = mysql.query_upper_limit()

    except Exception as error:
        error_logger.error(f"Failed to query upper limit for category; {category}")
        error_logger.error(error)

    if not upper_limit or not upper_limit[0][0]:
        upper_limit = 0

    carrier['category'] = category
    carrier['bound'] = upper_limit[0][0]

    debug_logger.debug(f"{carrier}")

    return carrier

@app.route('/server/shelf', methods=['GET'])
def get_shelf_category():

    make_dir = os.listdir('./markdown')

    dir_count = 1
    # If 'shelfCategory.json' does not exist, create it
    if not os.path.exists('shelf_category.json'):
        info_logger.info("'shelf_category.json' does not exist, creating a new one...")
        reset_json('shelf_category.json')
        for dir in make_dir:
            create_json('shelf_category.json', dir_count, dir)
            dirCount += 1

    shelf_category = load_json('shelf_category.json')

    if not make_dir:
        error_logger.error("No markdown files found in the directory.")
        return "No markdown files found", 404
    
    dir_count = 1
    rebuild_flag = False
    for key in shelf_category:
        if shelf_category[key] not in make_dir:
            reset_json('shelf_category.json')
            rebuild_flag = True
            info_logger.info("There is difference from shelf_category and markdown directories, Reset Json")
            break
        else:
            dir_count += 1

    """ Error handling for 'shelf_category.json' """
    
    # If 'shelfCategory.json' is not a valid JSON object, return an error
    if not isinstance(shelf_category, dict):
            error_logger.error("'shelfCategory.json' is not a valid JSON object.")
            return "Invalid 'shelfCategory.json' format", 500
    
    # If 'shelfCategory.json' does not match the markdown diretories, return an error
    if len(make_dir) != len(shelf_category):
        rebuildFlag = True
    
    # If 'shelfCategory.json' has duplicate keys, return an error
    if len(shelf_category) != len(set(shelf_category.values())):
        error_logger.error("'shelf_category.json' has duplicate keys, please check the markdown files.")
        return "'shelf_category.json' has duplicate keys", 500
    
    if rebuild_flag:
        info_logger.info("Rebuilding 'shelf_category.json'...")
        for dir in make_dir:
            create_json('shelf_category.json', dir_count, dir)
            dir_count += 1
        shelf_category = load_json('shelf_category.json')

    return shelf_category

@app.route('/server/shelf/<category>', methods=['GET'])
def get_default_pages(category):
    carrier = {}
    upper_limit = ''

    try:
        response = get_upper_limit(category)
        upper_limit = response['bound']

    except Exception as error:
        error_logger.error(error)

    range_post = upper_limit
    range_pre = range_post - 2
    if range_pre < 1:
        range_pre = 1

    try:
        pages = mysql.query_pages(range_pre, range_post, category)
    
    except Exception as error:
        error_logger.error(f"Faild to query default pages for category; {category} / range_pre: {range_pre} / range_post: {range_post}")
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
def get_pages(category, number):
    upper_limit = ''
    range_pre = number - 2
    range_post = number + 2

    try:
        response = get_upper_limit(category)
        upper_limit = response['bound']

    except Exception as error:
        error_logger.error(error)

    diff = range_post - upper_limit 
    if(0 <= diff <= 2):
        range_post = upper_limit
        range_pre = upper_limit - 4

    debug_logger.debug(f"{diff}")

    try:
        pages = mysql.query_pages(range_pre, range_post, category)
    
    except Exception as error:
        error_logger.error(f"Faild to query pages for category; {category} / range_pre: {range_pre} / range_post: {range_post}")
        error_logger.error(error)

    while(len(pages) != 5):
        temp = list(pages)
        temp.append((" - " ," - "))
        pages = tuple(temp)

    debug_logger.debug(f"{pages}")
    
    return jsonify(pages)

@app.route('/server/shelf/<category>/<int:number>/page', methods=['GET'])
def get_page(category, number):

    try:
        page = mysql.query_pages(number, category)
    
    except Exception as error:
        error_logger.error(f"Faild to query page for category; {category} / page: {number}")
        error_logger.error(error)

    debug_logger.debug(f"{page[0]}")

    return jsonify(page[0])

@app.route('/server/shelf/<category>/<int:number>/<MD>', methods=['GET'])
def get_markdown(category, number, MD):

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