import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcon from "react-native-vector-icons/Ionicons";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Likes from "../owner/Likes";
import DogManager from "./DogManager";
import Profile from "../Profile";

const Tab = createBottomTabNavigator();

const HomeSceneOwner = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Browse"
        shifting="true"
        barStyle={{ backgroundColor: "#green" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            color = focused ? "#D90429" : "#2B2D42";
            if (route.name === "Profile") {
              iconName = focused
                ? "account-settings"
                : "account-settings-outline";
              return <MIcon name={iconName} size={size} color={color} />;
            } else if (route.name === "Browse") {
              iconName = focused ? "dog-side" : "dog-service";
              return <MIcon name={iconName} size={size} color={color} />;
            } else if (route.name === "Likes") {
              iconName = focused ? "heart-sharp" : "heart-outline";
              return <IonIcon name={iconName} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "#D90429",
          inactiveTintColor: "#2B2D42",
        }}
      >
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Browse" component={DogManager} />
        <Tab.Screen name="Likes" component={Likes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeSceneOwner;
