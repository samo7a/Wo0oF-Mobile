import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

import DogCard from "./DogCard";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
const Storage = require("../../utilities/TokenStorage");
import jwt_decode from "jwt-decode";
import Axios from "../../utilities/axios";

const BrowseAdoptor = () => {
  //const [isFlipped, setIsFlipped] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [userId, setUserId] = useState();

  const getDogs = async () => {
    try {
      const token = await Storage.load("accessToken");
      console.log("token : " + token);
      const userData = await jwt_decode(token, { complete: true });
      var zip = userData.location;
      var id = userData.userId;
      setUserId(id);
      var json = {
        Location: zip,
        id: id,
      };
      try {
        const response = await Axios.post("/displayDogs", json);
        console.log("response length should be 5 : " + response.data.length);
        console.log(response.data);
        const array = response.data;
        if (!dogs.length) {
          setDogs(array);
        }
        console.log(" array : " + dogs);
      } catch (e) {
        console.log(e);
        Alert.alert("Technical Error, Please Try !");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Technical Error, Please  again!");
    }
  };
  useEffect(() => {
    getDogs();
    // if (!dogs.length) {
    //   // setCards(Dogs);
    //   setDogs(dogs)
    // }
  }, [dogs.length]);

  const removeDogCard = (id) => {
    console.log("hello");
    console.log(dogs.length);
    setDogs(dogs.filter((dog) => dog._id !== id));
    console.log(dogs.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {dogs.length !== 0 ? (
          dogs.map((dog) => (
            <DogCard key={dog._id} dog={dog} removeDogCard={removeDogCard} />
          )).reverse()
        ) : (
          <>
            <Text>
              Sorry there are no more dogs up for adoption in your area Change
              your search area or come back later.
            </Text>
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default BrowseAdoptor;
