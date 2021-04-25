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
  Modal,
} from "react-native";
import { useHistory } from "react-router-native";
//import styles from "../../../styles/GlobalStyles";
import jwt_decode from "jwt-decode";
import Axios from "../../utilities/axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Storage = require("../../utilities/TokenStorage");

const Likes = () => {
  const [userId, setUserId] = useState("");
  const [nme, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [likers, setlikers] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await Storage.load("accessToken");
        const user = await jwt_decode(data, { complete: true });
        const id = user.userId;
        setUserId(id);
        try {
          var obj = {
            id: id,
          };
          console.log("obj : " + JSON.stringify(obj));
          let response = await Axios.post("/getLikers", obj);
          let res = response.data;
          console.log("array of likers " + JSON.stringify(res));
          setlikers(res);
        } catch (e) {
          Alert.alert(e.toString());
        }
      } catch (e) {
        Alert.alert(e.toString());
      }
    };
    getInfo();
  }, []);

  const Item = ({ name, avatar }) => (
    <View style={styles.dog}>
      <Image
        key={Date.now().toString()}
        source={{ uri: avatar }}
        style={styles.avatar}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
  const hideModal = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleModal = async (ownerId) => {
    console.log("is this the correct id? : " + ownerId);
    //showModal();
    try {
      let obj = {
        OwnerID: ownerId,
      };
      let response = await Axios.post("/getOwner", obj);
      let res = response.data;
      setName(res.FirstName + " " + res.LastName);
      setEmail(res.Email);
      setPhone(res.Phone);
      setBio(res.ShortBio);
      showModal();
    } catch (e) {
      Alert.alert(e.toString());
    }
  };
  const handleModal2 = async () => {
    setName("");
    setPhone("");
    setBio("");
    setEmail("");
    hideModal();
  };
  return (
    <SafeAreaView>
      <Text style={styles.title}>Likers</Text>
      <FlatList
        style={{ marginBottom: 100 }}
        data={likers}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleModal(item.OwnerID);
            }}
          >
            <Item
              name={item.FirstName + " " + item.LastName}
              avatar={
                "https://wo0of.s3.amazonaws.com/" +
                item._id +
                "?" +
                Date.now().toString()
              }
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        style={{ zIndex: 1100 }}
        onRequestClose={handleModal2}
      >
        <View style={styles.modalBackground}>
          <View style={styles.form}>
            <View style={styles.row}>
              <Icon name="face-profile" size={30} style={styles.icon} />
              <Text style={styles.ownerText}>{nme}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" size={30} style={styles.icon} />
              <Text style={styles.ownerText}>{phone}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email-outline" size={30} style={styles.icon} />
              <Text style={styles.ownerText}>{email}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="text-box-outline" size={30} style={styles.icon} />
              <Text style={styles.ownerText}>{bio}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dog: {
    margin: 5,
    padding: 15,
    backgroundColor: "#E6EDEF",
    borderRadius: 10,
    flexDirection: "row",
    alignContent: "center",
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    //backgroundColor: "blue",
    padding: 10,
    margin: 10,
    width: 300,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    marginLeft: 40,
    alignSelf: "center",
    justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    padding: 20,
  },
  form: {
    borderRadius: 20,
    backgroundColor: "white",
    height: 285,
    width: 285,
    justifyContent: "center",
  },
  ownerText: {
    fontSize: 18,
  },
  icon: {
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    margin: 5,
    padding: 5,
  },
});
export default Likes;
