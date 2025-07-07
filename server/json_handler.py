import json

from logger import debug_logger, info_logger, warning_logger, error_logger


def _load_json(jsonName):

    info_logger.info(f"Loading {jsonName}...")

    try:
        with open(jsonName, 'r') as file:
            data = json.load(file)
    except Exception as error:
        error_logger.error(f"Failed to load {jsonName}; {error}")
    
    file.close()
    return data


def _create_json(jsonName, key, value):

    info_logger.info(f"Creating {jsonName}...")

    try:
        with open(jsonName, 'r') as file:
            data = json.load(file)
        
        data[key] = value

        with open(jsonName, 'w') as file:
            json.dump(data, file, indent=4)

    except Exception as error:
        error_logger.error(f"Fail to edit {jsonName}; {error}")
    
    file.close()


def _reset_json(jsonName):

    info_logger.info(f"Reset {jsonName}...")

    clear = {}

    try:
        with open(jsonName, 'w') as file:
            json.dump(clear, file)
            
    except Exception as error:
        error_logger.error(f"Fail to edit {jsonName}; {error}")
    
    file.close()