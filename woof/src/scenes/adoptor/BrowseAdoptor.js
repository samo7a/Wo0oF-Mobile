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
} from "react-native";

import { useHistory, withRouter } from "react-router";
import DogCard from "./DogCard";
import Dogs from "../../components/Dogs";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Entypo";
const Storage = require("../../utilities/TokenStorage");
const { width } = Dimensions.get("window");

const BrowseAdoptor = () => {
  //const [index, setIndex] = useState(0);
  const [cards, setCards] = useState(Dogs);
  const swipe = useRef(new Animated.ValueXY(0)).current;
  const titleSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!cards.length) {
      setCards(Dogs);
    }
  }, [cards.length]);
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
  const removeCard = useCallback(() => {
    setCards((previous) => previous.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * 3 / 2 * width,
        duration: 750,
        useNativeDriver: true,
      }).start(removeCard);
    },
    [removeCard, swipe.x]
  );
  return (
    <View style={styles.container}>
      <View style={[styles.container]}>
        {cards
          .map((item, index) => {
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};
            return (
              <DogCard
                key={item.id}
                name={item.name}
                sex="F"
                imageUri={item.image.url}
                age={item.life_span.charAt(0)}
                weight={item.weight.imperial}
                breed={item.breed_group}
                high={item.height.imperial}
                bio={item.description}
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
    justifyContent: "space-between",
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
export default BrowseAdoptor;
