import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useHistory } from "react-router-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import defaultProfilePic from "../../images/default-profile-with-dog.png";
import styles from "../../styles/GlobalStyles";
import * as ImagePicker from "react-native-image-picker";
import jwt_decode from 'jwt-decode';
//import Axios from "../../utilities/axios";
const Storage = require("../utilities/TokenStorage");

const Profile = () => {
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  const choosePhoto = () => {
    const options = {
      noData: true,
      mediaType: "photo",
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setProfilePic(response);
      }
    });
  };
  const removePhoto = () => {
    setProfilePic(defaultProfilePic);
  };

  const editProfile = () => {
      console.warn("not working");
  }
  return (
    <LinearGradient
      colors={["#8D99AE", "#EDF2F4"]}
      style={{ height: 1300, flex: 1 }}
    >
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={choosePhoto} style={{ margin: 25 }}>
              <View
                style={{
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image style={styles.photo} source={profilePic} />
                <Text
                  style={{
                    color: "white",
                    position: "absolute",
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  Upload Profile Picture
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={removePhoto} style={styles.button}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    textAlign: "center",
                    padding: 5,
                  }}
                >
                  Remove Photo
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.text}>Address</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Address"
              onChangeText={(e) => setAddress(e)}
              value={address}
              backgroundColor="white"
              keyboardType="default"
            />
            <Text style={styles.text}>Bio</Text>
            <TextInput
              style={styles.inputbio}
              placeholder="Bio..."
              onChangeText={(e) => setBio(e)}
              value={bio}
              backgroundColor="white"
              keyboardType="default"
              multiline={true}
            />
            <TouchableOpacity onPress={editProfile}>
              <View style={styles.button}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 15,
                    color: "white",
                    alignSelf: "center",
                  }}
                >
                  Edit Profile
                  <Icon name="chevron-up" size={15} color="white" />
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={hideModal}>
              <View style={styles.button}>
                <Text
                  style={{
                    fontFamily: "Arial",
                    fontSize: 15,
                    color: "white",
                    alignSelf: "center",
                  }}
                >
                  Cancel
                  <Icon name="remove" size={15} color="white" />
                </Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Profile;
