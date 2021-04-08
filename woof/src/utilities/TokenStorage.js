// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const save = async (value) => {
//     try {
//       await AsyncStorage.setItem('key', value);
//     } catch(e) {
//      setError(e);
//     }
//   }
// export const setError = async (e) => {
//   const jsonValue = JSON.stringify(e);
//   await AsyncStorage.setItem('error', jsonValue);
// }
//   export const load = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('key');
//       return jsonValue !== null ? jsonValue : null;
//     } catch(e) {
//       setError(e);
//     }
//   }

//   export const remove = async () =>{
//     try {
//       await AsyncStorage.removeItem('key');
//     }
//     catch (e){
//       setError(e);
//     }
//   }

import * as SecureStore from 'expo-secure-store';

export async function save(key, value) {
  try{
    let result = await SecureStore.setItemAsync(key, value);
    return result;
  } catch (e) {
    return e;
  }
}

export async function load(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    //alert('No values stored under that key.');
    return null;
  }
}

export async function remove(key) {
  try {
    return await SecureStore.deleteItemAsync(key, null);
  }
  catch (e){
    return null;
  }
}


