import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';

import {NativeRouter, Switch, Route} from 'react-router-native';


import WelcomeScene from './src/scenes/WelcomeScene';
import LoginScene from './src/scenes/LoginScene';
import SignupScene from './src/scenes/SignupScene';
import PasswordResetScene from './src/scenes/PasswordResetScene';
import HomeSceneAdaptor from './src/scenes/adaptor/HomeSceneAdaptor';
import HomeSceneOwner from './src/scenes/owner/HomeSceneOwner';


export default function App() {
  
  return (
    <NativeRouter>
      <Switch>
        <Route exact path = "/" component={WelcomeScene} />
        <Route exact path = "/login" component={LoginScene} />
        <Route exact path = "/signup" component={SignupScene} />
        <Route exact path = '/reset' component={PasswordResetScene}/>
        <Route exact path = '/ownerHome' component={HomeSceneOwner} />
        <Route exact path = '/adaptorHome' component={HomeSceneAdaptor} />
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
