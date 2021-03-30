import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Text} from 'native-base';

import  ChatScene from './ChatScene';
import HomeScene from './HomeScene';



function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function NavigationScene() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Profile"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
      options={{ tabBarBadge: 3 }}
    >
        <Tab.Screen title="Dogs" name="Browse" component={HomeScene} />
        <Tab.Screen name="Profile" title="Dogs" component={SettingsScreen} />
        <Tab.Screen name="Chats" component={ChatScene} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}   