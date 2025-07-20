import json

from logger import debug_logger, info_logger, warning_logger, error_logger


def load_json(jsonName):
    """
    Load json.
    @param json_name: The name of the json file to load.
    @return data: data to be loaded from the json file.
    """

    info_logger.info(f"Loading {jsonName}...")

    try:
        with open(jsonName, 'r') as file:
            data = json.load(file)
    except Exception as error:
        error_logger.error(f"Failed to load {jsonName}; {error}")
    
    file.close()
    return data


def create_json(jsonName, key, value):
    """
    Create json.
    @param jsonName: The name of the json file to create.
    @param key: The key to be added to the json file.
    @param value: The value to be added to the json file.
    @return data: data to be loaded from the json file.
    """

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


def reset_json(jsonName):
    """
    Reset json.
    @param resetJson: The name of the json file to reset.
    """

    info_logger.info(f"Reset {jsonName}...")

    clear = {}

    try:
        with open(jsonName, 'w') as file:
            json.dump(clear, file)
            
    except Exception as error:
        error_logger.error(f"Fail to edit {jsonName}; {error}")
    
    file.close()