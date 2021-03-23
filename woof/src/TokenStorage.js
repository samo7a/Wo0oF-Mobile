import AsyncStorage from 'react-native';

export const save = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('key', jsonValue);
    } catch(e) {
     
    }
  }
export const getError = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }
  catch (e) {
    await AsyncStorage.setItem('error', e);
  }
}
  export const load = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      await AsyncStorage.setItem('error', e);
    }
  }

  export const remove = async () =>{
    try {
      await AsyncStorage.removeItem('key');
    }
    catch (e){
      await AsyncStorage.setItem('error', e);
    }
  }

