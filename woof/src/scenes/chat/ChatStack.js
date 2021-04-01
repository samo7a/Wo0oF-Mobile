import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import ChatList from './ChatList';
import ChatScene from './ChatScene';

const ChatStack = ({navigation}) => {
    return (
        <Stack.Navigator
        initialRouteName="ChatList"
        screenOptions={{
            headerTintColor: '#D90429',
            headerStyle: { backgroundColor: '#8D99AE' },
          }}
        >
          <Stack.Screen name="ChatList" component={ChatList} 
          options={{
            title: 'Chats',
          }}
          />
          <Stack.Screen name="ChatScene" component={ChatScene} 
          options={{
            title: 'Chat',
          }}/>
        </Stack.Navigator>
      );
}

export default ChatStack;
