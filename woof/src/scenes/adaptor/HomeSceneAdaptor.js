import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ChatStack from '../chat/ChatStack';
import  ChatScene from '../chat/ChatScene';
import BrowseAdaptor from './BrowseAdaptor';
import Profile from './ProfileAdaptor';





const Tab = createBottomTabNavigator();

const HomeSceneAdaptor = () => {
    const [noOfMessages, setNoOfMessages] = useState(3);
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName = 'Browse'
      shifting = "true"
      barStyle={{ backgroundColor: '#green' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = focused ? '#D90429' : '#2B2D42';
          if (route.name === 'Profile') {
            iconName = focused ? 'account-settings' : 'account-settings-outline';
            return <MIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Browse') {
            iconName = focused ? 'paw-sharp' : 'ios-paw-outline';
            return <IonIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Chats'){
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            return <IonIcon name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#D90429',
        inactiveTintColor: '#2B2D42',
      }} >
        <Tab.Screen
            name="Profile" 
            component={Profile}
            />
        <Tab.Screen
            name="Browse" 
            title="Dogs" 
            component={BrowseAdaptor} 
            
            />
        <Tab.Screen 
            name="Chats"   
            component={ChatStack}
            options={
              { 
                tabBarBadge: noOfMessages == 0 ? null : noOfMessages
              }
            }
            />
      </Tab.Navigator>
    </NavigationContainer>
  );
}   

export default HomeSceneAdaptor;