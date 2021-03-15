import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import HomeScene from './src/scenes/HomeScene';

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScene /> 
    </SafeAreaProvider>
      
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
