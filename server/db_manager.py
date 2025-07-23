import mysql.connector
from mysql.connector import Error
import time

from properties.db_config import DbConfig
from properties.sql_query import SqlQuery

class DBManager:
    """
    This class manages the database connection and operttions.
    It uses the mysql.connector library to connect to a MySQL database.
    """

    def __init__(self, database='example', host="db", user="root", password_file=None):
        self.connection = mysql.connector.connect(
            user=DbConfig.user.value,
            password=DbConfig.password.value,
            host=DbConfig.host.value, # name of the mysql service as set in the docker compose file
            database=DbConfig.database.value,
            port=DbConfig.port.value,            
        )
        self.cursor = self.connection.cursor()
    
    def query_upper_limit(self):
        self.cursor.execute(SqlQuery.select_max_num.value)
        result = self.cursor.fetchall()
        self.cursor.close()
        return result
    
    def query_pages(self, range_pre, range_post, category):
        self.cursor.execute(SqlQuery.select_pages.value, (range_pre, range_post, category))
        pages = self.cursor.fetchall()
        self.cursor.close()
        return pages
    
    def query_page(self, number, category):
        self.cursor.execute(SqlQuery.select_page.value, (number, category))
        page = self.cursor.fetchall()
        self.cursor.close()
        return page