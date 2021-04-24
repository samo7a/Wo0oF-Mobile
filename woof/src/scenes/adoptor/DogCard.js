import "react-native-gesture-handler";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
const { height, width } = Dimensions.get("window");
const Storage = require("../../utilities/TokenStorage");
import jwt_decode from "jwt-decode";
import Axios from "../../utilities/axios";

const DogCard = ({ dog, removeDogCard }) => {
  const [isFlipped, setFlipped] = useState(false);
  const [userId, setUserId] = useState();
  const flipCard = () => setFlipped(!isFlipped);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const token = await Storage.load("accessToken");
        const userData = await jwt_decode(token, { complete: true });
        var id = userData.userId;
        setUserId(id);
      } catch (e) {
        Alert.alert(e.toString());
      }
    };
    getInfo();
  }, []);
  const likeDog = async () => {
    var obj = {
      UserID: userId,
      Dog: dog,
      IsLiked: true,
    };
    try {
      await Axios.post("/likeDog", obj);
    } catch (e) {
      Alert.alert(e.toString());
    }
  };
  const skipDog = async () => {
    var obj = {
      UserID: userId,
      Dog: dog,
      IsLiked: false,
    };
    try {
      await Axios.post("/likeDog", obj);
    } catch (e) {
      Alert.alert(e.toString());
    }
  };
  const handleLike = async () => {
    likeDog();
    removeDogCard(dog._id);
  };

  const handleSkip = () => {
    skipDog();
    removeDogCard(dog._id);
  };
  return (
    <>
      {!isFlipped ? (
        <TouchableOpacity
          activeOpacity={5}
          onPress={flipCard}
          style={styles.container}
        >
          <Image
            key={Date.now().toString()}
            source={{
              uri:
                `https://wo0of.s3.amazonaws.com/${dog._id}` +
                "?" +
                Date.now().toString(),
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={styles.gradient}
          />
          <Text style={styles.name}>{`${dog.Name}, ${dog.Age}`} years old</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={5}
          onPress={flipCard}
          style={styles.container}
        >
          <View style={styles.info}>
            <Text style={styles.desText}>Name: {dog.Name}</Text>

            <Text style={styles.desText}>Breed: {dog.Breed}</Text>

            <Text style={styles.desText}>Age: {dog.Age} years old</Text>

            <Text style={styles.desText}>Sex: {dog.Sex}.</Text>

            <Text style={styles.desText}>Size: {dog.Size}.</Text>

            <Text style={styles.desText}>
              Potty Trained? : {dog.isPottyTrained ? " Yes" : " No"}{" "}
            </Text>

            <Text style={styles.desText}>
              {" "}
              Neutered?: {dog.isNeutered ? " Yes" : " No"}{" "}
            </Text>

            <Text style={styles.bio}>Bio: {dog.bio}</Text>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => handleSkip()}>
          <View style={styles.skip}>
            <Icon2
              name="cross"
              size={35}
              color="#EDF2F4"
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLike()}>
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
    </>
  );
};
const styles = StyleSheet.create({
  container: {
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
  name: {
    position: "absolute",
    bottom: 22,
    left: 22,
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
    textShadowColor: "black",
    textShadowRadius: 10,
  },

  image: {
    borderRadius: 20,
    width: width * 0.85,
    height: height * 0.7,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    borderRadius: 20,
  },

  desText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
    textShadowColor: "black",
    textShadowRadius: 10,
    height: 40,
  },
  bio: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
    textShadowColor: "black",
    textShadowRadius: 10,
    height: 150,
  },

  des: {
    borderRadius: 10,
    padding: 10,
    margin: 1,
    width: "100%",
    alignSelf: "center",
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
    padding: 40,
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
});
export default DogCard;
