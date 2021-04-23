import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import styles from "../../../styles/GlobalStyles";
import jwt_decode from "jwt-decode";
import Axios from "../../utilities/axios";
const Storage = require("../../utilities/TokenStorage");

const ChatList = ({ navigation }) => {
  const [userId, setUserId] = useState("");
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
  const [chatItem, setChatItem] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await Storage.load("accessToken");
        const user = await jwt_decode(data, { complete: true });
        console.log(JSON.stringify(user));
        const id = user.userId;
        console.log(id);
        setUserId(id);
      } catch (e) {
        Alert.alert(e.toString());
      }
    };
    getInfo();
    getChats();
  }, []);
  const getChats = async () => {
    var obj = {
      id: userId,
    };

    try {
      let response = await Axios.post("/getChats", obj);
      let res = response.data;
      console.log(JSON.stringify(res));
      setChatItem(res);
    } catch (e) {
      Alert.alert(e.toString());
    }

    // try {
    //   // Axios code follows
    //   var config = {
    //     method: "post",
    //     url: bp.buildPath("getChats"),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },

    //     data: js,
    //   };

    //   axios(config)
    //     .then(function (response) {
    //       var res = response.data;

    //       if (res.error) {
    //         console.log(res);
    //       } else {
    //         setChatItem(res);
    //       }
    //     })
    //     .catch(function (error) {
    //       // setMessage(error);
    //     });
    // } catch (e) {
    //   alert(e.toString());
    //   return;
    // }
  };
  const Item = ({ name, avatar }) => (
    <View style={styles.chatItem}>
      <Image source={{ uri: avatar }} />
      <Text style={styles.title}>{name}</Text>
    </View>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={chatItem}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChatScene", item);
            }}
          >
            <Item name={item.name} avatar={item.avatar} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};
export default ChatList;
