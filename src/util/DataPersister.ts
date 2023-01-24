import AsyncStorage from '@react-native-async-storage/async-storage';

// Set & Get String
const setString = async (key: string, value: any) => {
  try {
    if (value !== undefined && value !== null) {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (error) {
    console.error('DataPersister -> setItem -> error:', error);
  }
};

const getString = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }
    return null;
  } catch (error) {
    console.error('DataPersister -> getItem -> error:', error);
    return null;
  }
};

// Set & Get Json
const setJson = async (key: string, jsonObj: any) => {
  try {
    if (jsonObj !== undefined && jsonObj !== null) {
      const jsonString = JSON.stringify(jsonObj);
      await AsyncStorage.setItem(key, jsonString);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (error) {
    console.error('DataPersister -> setJson -> error:', error);
  }
};

const getJson = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonString = await AsyncStorage.getItem(key);
    if (jsonString) {
      return JSON.parse(jsonString);
    }
    return null;
  } catch (error) {
    console.error('DataPersister -> getJson -> error:', error);
    return null;
  }
};

// Set & Get Boolean
const setBoolean = async (key: string, bool: boolean) => {
  try {
    const stringBool = bool === true ? 'true' : 'false';
    if (stringBool !== undefined && stringBool !== null) {
      await AsyncStorage.setItem(key, stringBool);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (error) {
    console.error('DataPersister -> setBoolean -> error:', error);
  }
};

const getBoolean = async (key: string): Promise<any | null> => {
  try {
    const boolValue = await AsyncStorage.getItem(key);
    if (boolValue) {
      return boolValue === 'true';
    }
    return null;
  } catch (error) {
    console.error('DataPersister -> getBoolean -> error:', error);
    return null;
  }
};

export default {
  setString,
  getString,
  setJson,
  getJson,
  setBoolean,
  getBoolean,
};
