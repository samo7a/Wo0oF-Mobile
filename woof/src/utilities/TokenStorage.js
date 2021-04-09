import AsyncStorage from "@react-native-async-storage/async-storage";
export async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("error from TokenStorage.save ** " + e);
  }
}

export async function load(key) {
  try {
    let result = await AsyncStorage.getItem(key);
    if (result) {
      return result;
    } else {
      console.log("error from TokenStorage.load **");
      return null;
    }
  } catch (e) {
    console.log("error from TokenStorage.save ** " + e);
    return null;
  }
}

export async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log("error from TokenStorage.remove ** " + e);
  }
}

