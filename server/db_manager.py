import mysql.connector

from property_handler import load_properties

class _DBManager:
    """
    This class manages the database connection and operttions.
    It uses the mysql.connector library to connect to a MySQL database.
    """

    def __init__(self, database='example', host="db", user="root", password_file=None):
        self.dbconfig = load_properties('sql.properties')
        self.connection = mysql.connector.connect(
            user=self.dbconfig['config']['user'],
            password=self.dbconfig['config']['password'],
            host=self.dbconfig['config']['host'], # name of the mysql service as set in the docker compose file
            database=self.dbconfig['config']['database'],
            port=self.dbconfig['config']['port'],
            auth_plugin='mysql_native_password'
        )
        self.cursor = self.connection.cursor()
    
    def populate_db(self):
        self.cursor.execute(self.dbconfig['query']['table_check'])
        self.cursor.execute(self.dbconfig['query']['create_table'])
        self.cursor.executemany(self.dbconfig['query']['insert_data'], (1, 'Practical statstics', 1, 1, '2025-05-02 16:28:04', '', 'Bayesian statistics', '', 'Bayesian statistics.md', 1))
        self.connection.commit()
        self.cursor.close()
    
    def query_upper_limit(self):
        self.cursor.execute(self.dbconfig['query']['select_max_num'])
        result = self.cursor.fetchall()
        self.cursor.close()
        return result
    
    def query_pages(self, range_pre, range_post, category):
        self.cursor.execute(self.dbconfig['query']['select_pages'], (range_pre, range_post, category))
        pages = self.cursor.fetchall()
        self.cursor.close()
        return pages
    
    def query_page(self, number, category):
        self.cursor.execute(self.dbconfig['query']['select_page'], (number, category))
        page = self.cursor.fetchall()
        self.cursor.close()
        return page