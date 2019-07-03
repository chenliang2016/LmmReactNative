import { AsyncStorage } from "react-native"
let LmmStore = {};

LmmStore.setConfig = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, "" + value);
    } catch (error) {
      console.log(error);
    }
}

LmmStore.getConfig = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value
      }
    } catch (error) {
      // Error retrieving data
      return undefined;
    }
    return undefined;
}  

export default LmmStore  
