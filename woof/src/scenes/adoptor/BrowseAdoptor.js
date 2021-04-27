import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DogCard from "./DogCard";
const { height, width } = Dimensions.get("window");
const Storage = require("../../utilities/TokenStorage");
import jwt_decode from "jwt-decode";
import Axios from "../../utilities/axios";

const BrowseAdoptor = (props) => {
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
        const array = response.data;
        if (!dogs.length) {
          setDogs(array);
        }
      } catch (e) {
        Alert.alert("Technical Error, Please Try agian!", e.toString());
      }
    } catch (e) {
      Alert.alert("Technical Error, Please Try again!", e.toString());
    }
  };
  useEffect(() => {
    getDogs();
  }, [dogs.length]);

  const removeDogCard = (id) => {
    props.changeUpdate();
    setDogs(dogs.filter((dog) => dog._id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {dogs.length !== 0 ? (
          dogs.map((dog) => (
            <DogCard key={dog._id} dog={dog} removeDogCard={removeDogCard} />
          ))
        ) : (
          <>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.9)"]}
              style={styles.card}
            >
              <View style={styles.info}>
                <Text style={styles.desText}>
                  Sorry there are no more dogs up for adoption in your area.
                </Text>
                <Text style={styles.desText}>
                  Change your search area or come back later....
                </Text>
                <ActivityIndicator
                  animating={true}
                  color="#E6EDEF"
                  size="large"
                  style={{ marginTop: 35 }}
                />
              </View>
            </LinearGradient>
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
  card: {
    position: "absolute",
    top: 15,
    borderRadius: 20,
    backgroundColor: "#5D6B83",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  info: {
    borderRadius: 20,
    width: width * 0.85,
    height: height * 0.7,
  },
  desText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
    textShadowColor: "black",
    textShadowRadius: 10,
    height: 40,
    margin: 30,
  },
});
export default BrowseAdoptor;
