import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const DogManager = () => {
  const [array, setArray] = useState(myDogs);
  const myDogs = [
    {
      key: 1,
      name: "Max",
      sex: "M",
      breed: "rare",
      weight: 20,
      height: 10,
      bio: "good dog",
    },
    {
      key: 2,
      name: "Lana",
      sex: "F",
      breed: "rare",
      weight: 20,
      height: 10,
      bio: "good dog",
    },
    {
      key: 3,
      name: "Sisi",
      sex: "F",
      breed: "rare",
      weight: 20,
      height: 10,
      bio: "good dog",
    },
    {
      key: 4,
      name: "Rex",
      sex: "M",
      breed: "rare",
      weight: 20,
      height: 10,
      bio: "good dog",
    },
    {
      key: 5,
      name: "Roy",
      sex: "M",
      breed: "rare",
      weight: 20,
      height: 10,
      bio: "good dog",
    },
  ];
  const showModal = () => {};
  return (
    <SafeAreaView>
        <View>
          <FlatList
            ListHeaderComponent={
              <>
                <TouchableOpacity style={styles.box} onPress={() => showModal}>
                  <Text style={styles.item}>
                    {" "}
                    Add Dog <Icon name="pluscircleo" />{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => showModal}>
                  <Text style={styles.item}>
                    {" "}
                    Delete Dog <Icon name="minuscircleo" />{" "}
                  </Text>
                </TouchableOpacity>
              </>
            }
            data={myDogs}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.box} onPress={() => showModal}>
                <Text style={styles.item}> {item.name} </Text>
              </TouchableOpacity>
            )}
          />
        </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: "blue",
    color: "white",
    margin: 20,
    padding: 20,
  },
  box: {
    backgroundColor: "yellow",
    margin: 15,
    padding: 20,
  },
});
export default DogManager;
