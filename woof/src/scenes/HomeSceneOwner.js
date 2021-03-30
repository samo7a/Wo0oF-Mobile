import 'react-native-gesture-handler';
import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Text} from 'native-base';

import  ChatScene from './ChatScene';
import HomeScene from './HomeScene';
import Profile from './Profile';


const Tab = createBottomTabNavigator();

 const HomeSceneOwner = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Browse" component={HomeScene} />
        <Tab.Screen name="Profile" title="Dogs" component={Profile} />
        <Tab.Screen name="Chats" component={ChatScene} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}   

export default HomeSceneOwner;