import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcon from "react-native-vector-icons/Ionicons";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BrowseAdoptor from "./BrowseAdoptor";
import Profile from "../Profile";
import LikedDogs from "./LikedDogs";

const Tab = createBottomTabNavigator();

const HomeSceneAdoptor = () => {
  const [update, setUpdate] = useState(0);


  const [likeUpdate, setLikeUpdate] = useState(update);
  useEffect(()=>{
    setLikeUpdate(update);
  }, [update]);
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
              iconName = focused ? "paw-sharp" : "ios-paw-outline";
              return <IonIcon name={iconName} size={size} color={color} />;
            } else if (route.name === "Liked Dogs") {
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
        <Tab.Screen name="Browse" title="Dogs" children={() => <BrowseAdoptor changeUpdate={() => setUpdate(update + 1)}/>} />
        <Tab.Screen name="Liked Dogs" children={()=><LikedDogs update={likeUpdate}/>}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeSceneAdoptor;
