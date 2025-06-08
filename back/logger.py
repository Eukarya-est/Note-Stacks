import logging
from logging import FileHandler, Formatter

# Debug logger
DEBUG_LOG_FORMAT = (
    "%(asctime)s [%(levelname)s]: %(message)s in %(pathname)s:%(lineno)d")
DEBUG_LOG_LEVEL = logging.DEBUG

DEBUG_LOG_FILE = "./logs/DEBUG.log"

debug_logger = logging.getLogger("noteStacks.debug")
debug_logger.setLevel(DEBUG_LOG_LEVEL)
debug_logger_file_handler = FileHandler(DEBUG_LOG_FILE)
debug_logger_file_handler.setLevel(DEBUG_LOG_LEVEL)
debug_logger_file_handler.setFormatter(Formatter(DEBUG_LOG_FORMAT))
debug_logger.addHandler(debug_logger_file_handler)

# Info logger
INFO_LOG_FORMAT = (
    "%(asctime)s [%(levelname)s]: %(message)s in %(pathname)s:%(lineno)d")
INFO_LOG_LEVEL = logging.INFO

INFO_LOG_FILE = "./logs/INFO.log"

info_logger = logging.getLogger("noteStacks.info")
info_logger.setLevel(INFO_LOG_LEVEL)
info_logger_file_handler = FileHandler(INFO_LOG_FILE)
info_logger_file_handler.setLevel(INFO_LOG_LEVEL)
info_logger_file_handler.setFormatter(Formatter(INFO_LOG_FORMAT))
info_logger.addHandler(info_logger_file_handler)

# Warning logger
WARNING_LOG_FORMAT = (
    "%(asctime)s [%(levelname)s]: %(message)s in %(pathname)s:%(lineno)d")
WARNING_LOG_LEVEL = logging.WARNING

WARNING_LOG_FILE = "./logs/WARNING.log"

warning_logger = logging.getLogger("noteStacks.warning")
warning_logger.setLevel(WARNING_LOG_LEVEL)
warning_logger_file_handler = FileHandler(WARNING_LOG_FILE)
warning_logger_file_handler.setLevel(WARNING_LOG_LEVEL)
warning_logger_file_handler.setFormatter(Formatter(WARNING_LOG_FORMAT))
warning_logger.addHandler(warning_logger_file_handler)

# Error logger
ERROR_LOG_FORMAT = (
    "%(asctime)s [%(levelname)s]: %(message)s in %(pathname)s:%(lineno)d")
ERROR_LOG_LEVEL = logging.ERROR

ERROR_LOG_FILE = "./logs/ERROR.log"

error_logger = logging.getLogger("noteStacks.error")
error_logger.setLevel(ERROR_LOG_LEVEL)
error_logger_file_handler = FileHandler(ERROR_LOG_FILE)
error_logger_file_handler.setLevel(ERROR_LOG_LEVEL)
error_logger_file_handler.setFormatter(Formatter(ERROR_LOG_FORMAT))
error_logger.addHandler(error_logger_file_handler)