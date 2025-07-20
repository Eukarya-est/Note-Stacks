from jproperties import Properties

def load_properties(properties_name):
    """
    Load properties from a file.
    @param propeties_name: The name of the properties file to load.
    @return properties: object contatining the loaded properties.
    """
    properites = Properties()
    try:
        with open("./properites/" + properties_name, 'rb') as properties_file:
            properites.load(properties_file)
    except Exception as error:
        print(f"Failed to load properties from {properties_name}: {error}")

    return properites