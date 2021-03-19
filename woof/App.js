import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import StackNavigator from './StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NativeRouter, Switch, Route} from 'react-router-native';


import WelcomeScene from './src/scenes/WelcomeScene';
import LoginScene from './src/scenes/LoginScene';
import SignupScene from './src/scenes/SignupScene';
import HomeScene from './src/scenes/HomeScene';


export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path = "/" component={WelcomeScene} />
        <Route exact path = "/login" component={LoginScene} />
        <Route exact path = "/signup" component={SignupScene} />
        <Route exact path = "/home" component={HomeScene} />
      </Switch>
      
    </NativeRouter>
      
    
      
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
