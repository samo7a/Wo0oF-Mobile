import "react-native-gesture-handler";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Alert
} from "react-native";

import { useHistory, withRouter } from "react-router";
import DogCard from "./DogCard";
//import Dogs from "../../components/Dogs";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
const Storage = require("../../utilities/TokenStorage");
const { width } = Dimensions.get("window");
import jwt_decode from "jwt-decode";
import Axios from "../../utilities/axios";

const BrowseAdoptor = () => {
  //const [index, setIndex] = useState(0);
  //const [cards, setCards] = useState(Dogs);
  const swipe = useRef(new Animated.ValueXY(0)).current;
  const titleSign = useRef(new Animated.Value(1)).current;
  const [isFlipped, setIsFlipped] = useState(true);
  const [dogs, setDogs] = useState([]);

  const getDogs = async () => {
    try {
      const token = await Storage.load("accessToken");
      console.log("token : " + token);
      const userData = await jwt_decode(token, { complete: true });
      var zip = userData.location;
      var json = {
        Location: zip,
      };
      try {
        const response = await Axios.post("/displayDogs", json);
        console.log("response length should be 5 : " + response.data.length);
        console.log(response.data);
        const array = [];
        for (var i = 0; i < response.data.length; i++) {
          var obj = {
            key: response.data[i]._id,
            name: response.data[i].Name,
            age: response.data[i].Age,
            bio: response.data[i].Bio,
            size: response.data[i].Size,
            breed: response.data[i].Breed,
            sex: response.data[i].Sex,
            isNeutered: response.data[i].isNeutered,
            isPottyTrained: response.data[i].isPottyTrained,
            ownerId: response.data[i].OwnerID,
          };
          array.push(obj);
        }
        console.log(" array : " + array);
        if (!dogs.length) {
          setDogs(array);
        }

        console.log(" myDogs : " + array);
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
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => {
      console.log("onmoveshouldsetpanresoponder");
      return true;
    },
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titleSign.setValue(y0 > (896 * 0.7) / 2 ? 1 : -1);
      console.log("pan srsslsl");
      return true;
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      console.log(dx + dy);
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;
      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: ((direction * 3) / 2) * width,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
      return true;
    },
  });
  const love = () => {
    console.log(`I love this dog`);
    handleChoice(1);
  };
  const skip = () => {
    console.log(`skip `);
    handleChoice(-1);
  };
  const info = () => {
    setIsFlipped(!isFlipped);
    console.log(isFlipped);
  };

  const removeCard = useCallback(() => {
    setDogs((previous) => previous.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: ((direction * 3) / 2) * width,
        duration: 750,
        useNativeDriver: true,
      }).start(removeCard);
    },
    [removeCard, swipe.x]
  );
  return (
    <View style={styles.container}>
      <View style={[styles.container]}>
        {dogs
          .map((item, index) => {
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};
            return (
              <DogCard
                key={item.key}
                name={item.name}
                sex={item.sex}
                imageUri={"https://source.unsplash.com/random"} // /change to real uri
                age={item.age}
                breed={item.breed}
                size={item.size}
                bio={item.bio}
                flip={isFlipped}
                isFirst={isFirst}
                swipe={swipe}
                titleSign={titleSign}
                {...dragHandlers}
              />
            );
          })
          .reverse()}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => skip()}>
          <View style={styles.skip}>
            <Icon2
              name="cross"
              size={35}
              color="#EDF2F4"
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => info()}>
          <View style={styles.info}>
            <Icon2
              name="info"
              size={35}
              color="#EDF2F4"
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => love()}>
          <View style={styles.love}>
            <Icon
              name="heart"
              size={35}
              color="#EDF2F4"
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
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
  buttonView: {
    position: "absolute",
    bottom: 15,
    width: 170,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: -1,
  },
  love: {
    backgroundColor: "green",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 15,
    marginHorizontal: 10,
  },
  skip: {
    backgroundColor: "red",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 15,
    marginHorizontal: 10,
  },
  info: {
    backgroundColor: "#ffcc00",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 15,
    marginHorizontal: 10,
  },
});
export default BrowseAdoptor;
