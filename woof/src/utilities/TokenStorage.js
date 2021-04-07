import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (value) => {
    try {
      await AsyncStorage.setItem('key', value);
    } catch(e) {
     setError(e);
    }
  }
export const setError = async (e) => {
  const jsonValue = JSON.stringify(e);
  await AsyncStorage.setItem('error', jsonValue);
}
  export const load = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      return jsonValue !== null ? jsonValue : null;
    } catch(e) {
      setError(e);
    }
  }

  export const remove = async () =>{
    try {
      await AsyncStorage.removeItem('key');
    }
    catch (e){
      setError(e);
    }
  }

