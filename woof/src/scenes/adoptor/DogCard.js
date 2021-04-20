import "react-native-gesture-handler";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React, { useState, useCallback, useEffect } from "react";
import Choice from "../../components/Choice";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
const { height, width } = Dimensions.get("window");

const DogCard = ({
  name,
  sex,
  imageUri,
  age,
  weight,
  breed,
  high,
  bio,
  flip,
  isFirst,
  swipe,
  titleSign,
  ...rest
}) => {
  const [flipped, setFlipped] = useState(flip);
  // const flip = () => {
  //   setIsFlipped(isFlipped);
  // };

  const rotate = Animated.multiply(swipe.x, titleSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };
  useEffect(() => {
    setFlipped(flip);
  }, [flip]);
  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Choice type="like" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}
        >
          <Choice type="nope" />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  return flipped ? (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
      />
      <Text style={styles.name}>{`${name}, ${age}`} years old</Text>
      {isFirst && renderChoice()}
    </Animated.View>
  ) : (
    <Animated.View
      style={[styles.container, animatedCardStyle]}
      {...rest}
    >
      <View style={styles.image}>
        <View style={styles.des}>
          <Text style={styles.desText}>Name: {name}</Text>
        </View>
        <View style={styles.des}>
          <Text style={styles.desText}>Breed: {breed}</Text>
        </View>
        <View style={styles.des}>
          <Text style={styles.desText}>Age: {age} years old</Text>
        </View>
        <View style={styles.des}>
          <Text style={styles.desText}>Sex: {sex}</Text>
        </View>
        <View style={styles.des}>
          <Text style={styles.desText}>Weight: {weight} lb.</Text>
        </View>
        <View style={styles.des}>
          <Text style={styles.desText}>Height: {height} in</Text>
        </View>
        <View style={[styles.des, {height : 100}]}>
          <Text style={styles.desText}>Bio: {bio}</Text>
        </View>
      </View>
      {isFirst && renderChoice()}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
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
    height: 190,
    borderRadius: 20,
  },
  choiceContainer: {
    position: "absolute",
    top: 25,
  },
  likeContainer: {
    left: 40,
    transform: [{ rotate: "-30deg" }],
  },
  nopeContainer: {
    right: 25,
    transform: [{ rotate: "30deg" }],
  },
  desText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
    textShadowColor: "black",
    textShadowRadius: 10,
    height : 30,
  },
  des: {
    borderRadius: 10,
    padding: 10,
    margin: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#2B2D42",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
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
  },
});
export default DogCard;
