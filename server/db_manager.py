
# import time

# from logger import debug_logger, info_logger, warning_logger, error_logger
# from properties.db_config import DBconfig
# from properties.sql_query import SqlQuery

# class DBManager:
#     """
#     This class manages the database connection and operttions.
#     It uses the mysql.connector library to connect to a MySQL database.
#     """

#     def __init__(self):
#         self.connection = None
#         db_config = {
#             'host': DBconfig.host.value,
#             'user': DBconfig.user.value,
#             'password': DBconfig.password.value,
#             'database': DBconfig.database.value,
#         }
#         try:
#             self.connection = mysql.connector.connect(
#                 pool_name = "mypool", pool_size = 3, *db_config        
#             )
#         except Error as e:
#             error_logger.error(f"Error connecting to the database: {e}")
#             self.connection = None
#         info_logger.info("Successfully connected to the database")
    
#     def query_shelf_category(self):
#         result = None
#         if not self.connection.is_connected():
#             try:
#                 self.connection.reconnect()
#             except Error as e:
#                 info_logger.info(f"Error reconnecting to the database: {e}")
#                 error_logger.error(f"Error reconnecting to the database: {e}")
#                 return result
#             info_logger.info("Reconnected to the database")

#         cursor = self.connection.cursor()

#         try:
#             cursor.execute(SqlQuery.select_all_cover.value)
#             result = cursor.fetchall()
#             info_logger.info("Query executed successfully; select_query")
#         except Error as e:
#             info_logger.info(f"Error select_query: {e}")
#             error_logger.error(f"Error select_query: {e}")
#             self.connection.rollback()
#             raise e
#         return result

#     def query_upper_limit(self, category):
#         result = None
#         if not self.connection.is_connected():
#             try:
#                 self.connection.reconnect()
#             except Error as e:
#                 info_logger.info(f"Error reconnecting to the database: {e}")
#                 error_logger.error(f"Error reconnecting to the database: {e}")
#                 return result
#             info_logger.info("Reconnected to the database")

#         cursor = self.connection.cursor()

#         try:
#             cursor.execute(SqlQuery.select_max_num.value, (category,))
#             result = cursor.fetchall()
#             info_logger.info("Query executed successfully; select_query")
#         except Error as e:
#             info_logger.info(f"Error select_query: {e}")
#             error_logger.error(f"Error select_query: {e}")
#             self.connection.rollback()
#             raise e
#         return result
    
#     def query_pages(self, range_pre, range_post, category):
#         result = None
#         if not self.connection.is_connected():
#             try:
#                 self.connection.reconnect()
#             except Error as e:
#                 info_logger.info(f"Error reconnecting to the database: {e}")
#                 error_logger.error(f"Error reconnecting to the database: {e}")
#                 return result
#             info_logger.info("Reconnected to the database")

#         cursor = self.connection.cursor()

#         try:
#             cursor.execute(SqlQuery.select_pages.value, (range_pre, range_post, category))
#             result = cursor.fetchall()
#             info_logger.info("Query executed successfully; select_query")
#         except Error as e:
#             info_logger.info(f"Error select_query: {e}")
#             error_logger.error(f"Error select_query: {e}")
#             self.connection.rollback()
#             raise e
#         return result
    
#     def query_page(self, number, category):
#         result = None
#         if not self.connection.is_connected():
#             try:
#                 self.connection.reconnect()
#             except Error as e:
#                 info_logger.info(f"Error reconnecting to the database: {e}")
#                 error_logger.error(f"Error reconnecting to the database: {e}")
#                 return result
#             info_logger.info("Reconnected to the database")

#         cursor = self.connection.cursor()

#         try:
#             cursor.execute(SqlQuery.select_page.value, (category, number, category))
#             result = cursor.fetchall()
#             info_logger.info("Query executed successfully; select_query")
#         except Error as e:
#             info_logger.info(f"Error select_query: {e}")
#             error_logger.error(f"Error select_query: {e}")
#             self.connection.rollback()
#             raise e
#         return result
    
#     @staticmethod
#     def get_instance():
#         if not hasattr(DBManager, "_instance"):
#             DBManager._instance = DBManager()
#         return DBManager._instance