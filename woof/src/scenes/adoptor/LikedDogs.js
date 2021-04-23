import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { useHistory } from "react-router-native";
//import styles from "../../../styles/GlobalStyles";
import jwt_decode from "jwt-decode";
import Axios from "../../utilities/axios";
const Storage = require("../../utilities/TokenStorage");

const LikedDogs = () => {
  const [userId, setUserId] = useState("");
  const history = useHistory();
  // const [chatItem, setChatItem] = useState([
  //   { id: 0, name: "Ahmed", avatar: "https://placeimg.com/140/140/any" },
  //   { id: 1, name: "Anna", avatar: "https://placeimg.com/140/140/any" },
  //   { id: 2, name: "Christian", avatar: "https://placeimg.com/140/140/any" },
  //   { id: 3, name: "Steven", avatar: "https://placeimg.com/140/140/any" },
  //   { id: 4, name: "Mathew", avatar: "https://placeimg.com/140/140/any" },
  //   { id: 5, name: "Aiden", avatar: "https://placeimg.com/140/140/any" },
  //   { id: 6, name: "David", avatar: "https://placeimg.com/140/140/any" },
  // ]);

  /*

    name -> ChatList[i].dog.name
    id -> ChatList[i]._id
    avatar -> "https://wo0of.s3.amazonaws.com/" + ChatList[i].dog._id


  */
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await Storage.load("accessToken");
        const user = await jwt_decode(data, { complete: true });
        console.log(JSON.stringify(user));
        const id = user.userId;
        console.log(id);
        setUserId(id);
        try {
          var obj = {
            id: id,
          };
          console.log("obj : " + JSON.stringify(obj));
          let response = await Axios.post("/getLikedDogs", obj);
          let res = response.data;
          console.log("array of liked dogs: " + JSON.stringify(res));
          setDogs(res);
        } catch (e) {
          Alert.alert(e.toString());
        }
      } catch (e) {
        Alert.alert(e.toString());
      }
    };
    getInfo();
    //getChats();
  }, []);

  const Item = ({ name, avatar }) => (
    <View style={styles.dog}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.title}>{name}</Text>
    </View>
  );
  return (
    <SafeAreaView>
      <Text style={styles.title}>Liked Dogs</Text>
      <FlatList
        data={dogs}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              history.push('/chat');
            }}
          >
            <Item
              name={item.Name}
              avatar={"https://wo0of.s3.amazonaws.com/" + item._id}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  dog: {
    margin: 5,
    padding: 15,
    backgroundColor: "#E6EDEF",
    borderRadius: 10,
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  title: {
    fontSize: 40,
  },
});
export default LikedDogs;
