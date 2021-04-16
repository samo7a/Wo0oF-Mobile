import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";

const SCREEN_WIDTH = Dimensions.get("window").width;

const DogItem = (props) => {
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0],
      outputRange: [1, 0],
      //extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={[{ transform: [{ scale: scale }] }]}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={13}
              color="#fff"
            />
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe} overshootRight={false}>
      <TouchableOpacity onPress={props.showModal}>
        <View style={styles.container}>
          <Text>My name is {props.data.name}.</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default DogItem;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 16,
    margin: 15,
    alignSelf: "center",
    borderRadius: 10,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 80,
    marginRight: 40,
    marginTop: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
