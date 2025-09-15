import os
from flask import Flask, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text

from logger import debug_logger, info_logger, warning_logger, error_logger
from properties.sql_query import SqlQuery
from properties.db_config import DBconfig
import properties.path as PATH

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

engine = create_engine(DBconfig.url.value, pool_recycle=3600)

db = SQLAlchemy(app)

@app.route('/server', methods=['GET'])
def get_sever_check():
        
    return "Server is running"

@app.route('/server/shelf', methods=['GET'])
def get_shelf_category():
    shelf_category = []

    try:
        with engine.connect() as connection:
            result = connection.execute(text(SqlQuery.select_all_cover.value)).fetchall()
            for category in result:
                shelf_category.append(category[0])
    
    except Exception as error:
        error_logger.error("Faild to query shelf category")
        error_logger.error(error)

    return shelf_category

@app.route('/server/shelf/<category>', methods=['GET'])
def get_default_pages(category):
    carrier = {}
    pages = []
    upper_limit = 1

    try:
        upper_limit = get_upper_limit(category)

    except Exception as error:
        error_logger.error(error)

    range_post = upper_limit
    range_pre = range_post - 2
    if range_pre < 1:
        range_pre = 1

    try:
        with engine.connect() as connection:
            result = connection.execute(text(SqlQuery.select_pages.value), 
                                       {'rangePre': range_pre, 'rangePost': range_post, 'category': category}).fetchall()
            for page in result:
                pages.append(list(page))
    
    except Exception as error:
        error_logger.error(f"Faild to query default pages for category; {category} / range_pre: {range_pre} / range_post: {range_post}")
        error_logger.error(error)

    while(len(pages) != 5):
        pages.append([" - " ," - "])

    carrier['category']= category
    carrier['bound'] = upper_limit
    carrier['pages'] = pages

    return carrier

@app.route('/server/shelf/<category>/<int:number>', methods=['GET'])
def get_pages(category, number):
    pages=[]
    upper_limit = 1
    range_pre = number - 2
    range_post = number + 2

    try:
        upper_limit = get_upper_limit(category)

    except Exception as error:
        error_logger.error(error)

    diff = range_post - upper_limit 
    if(0 <= diff <= 2):
        range_post = upper_limit
        range_pre = upper_limit - 4
        if(range_pre < 1):
            range_pre = 1

    try:
        with engine.connect() as connection:
            result = connection.execute(text(SqlQuery.select_pages.value), 
                                        {'rangePre': range_pre, 'rangePost': range_post, 'category': category}).fetchall()
            for page in result:
                pages.append(list(page))

    except Exception as error:
        error_logger.error(f"Faild to query pages for category; {category} / range_pre: {range_pre} / range_post: {range_post}")
        error_logger.error(error)

    while(len(pages) != 5):
        pages.append([" - " ," - "])
    
    return pages

@app.route('/server/shelf/<category>/<int:number>/page', methods=['GET'])
def get_page(category, number):

    try:
        with engine.connect() as connection:
            result = connection.execute(text(SqlQuery.select_page.value), 
                                      {'category1': category, 'number': number, 'category2': category}).fetchall()
            page = list(result[0])

    except Exception as error:
        error_logger.error(f"Faild to query page for category; {category} / page: {number}")
        error_logger.error(error)

    return page

@app.route('/server/shelf/<category>/<int:number>/<filename>', methods=['GET'])
def get_doc(category, number, filename):

    file_path = f'{PATH.HTMLS}/{category}/{filename}'

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()

        # Return as plain text
        return Response(text, mimetype='text/plain')

    except Exception as error:
        error_logger.error(f"Failed: Load Markdown")
        error_logger.error(error)

def get_upper_limit(category):
    upper_limit = 1

    try:
        with engine.connect() as connection:
            result = connection.execute(
                text(SqlQuery.select_max_num.value), {'category': category}).fetchall()
            upper_limit = result[0][0]

    except Exception as error:
        error_logger.error(f"Failed to query upper limit for category; {category}")
        error_logger.error(error)
        return 1

    if upper_limit is None:
        return 1

    return upper_limit
    
if __name__ == '__main__':
    app.run()