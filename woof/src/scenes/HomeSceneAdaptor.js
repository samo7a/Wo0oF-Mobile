import 'react-native-gesture-handler';
import React, {useState} from 'react';
import View from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Text} from 'native-base';

import  ChatScene from './ChatScene';
import HomeScene from './HomeScene';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const HomeSceneAdaptor = () => {
    const [noOfMessages, setNoOfMessages] = useState(3);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Browse"
        shifting={true}
        labeled={false}
        sceneAnimationEnabled={true}
        activeColor="green"
        inactiveColor="yellow"
        barStyle={{ backgroundColor: '#ffff' }} >
        <Tab.Screen
            name="Profile" 
            component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account-settings" color='#EF233C' size={26} />
                ),
              }}/>
        <Tab.Screen
            name="Browse" 
            title="Dogs" 
            component={HomeScene} 
            options={{
                tabBarLabel: 'Browse',
                tabBarIcon: () => (
                  <Icon name="paw-sharp" color='#EF233C' size={26} />
                ),
              }}
            />
        <Tab.Screen 
            name="Chats"   
            component={ChatScene}
            options={{
                tabBarBadge: noOfMessages === 0  ? null : noOfMessages,
                tabBarLabel: 'Chats',
                tabBarIcon: () => (
                  <Icon name="chatbubble" color='#EF233C' size={26}/>
                ),
                tabBarOptions: { activeTintColor:'blue', }
              }} 
            />
        <Tab.Screen 
        
            name="Settings"   
            component={ChatScene}
            options={{
                tabBarBadge: 1,
                tabBarLabel: 'Settings',
                tabBarIcon: ({tintColor}) => <Icon name='settings' color={tintColor} size={25}/>,
                tabBarOptions: {
                    activeTintColor: 'red', 
                    inactiveTintColor: 'green', 
                    showIcon: true
                }
              }} 
            />
      </Tab.Navigator>
    </NavigationContainer>
  );
}   

export default HomeSceneAdaptor;