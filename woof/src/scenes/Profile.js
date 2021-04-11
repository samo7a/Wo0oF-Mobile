import React, { useState, useEffect, useRef } from "react";
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
  ScrollView,
} from "react-native";
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view";
import { useHistory } from "react-router-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import defaultProfilePic from "../images/default-profile-with-dog.png";
import styles from "../../styles/GlobalStyles";
import Axios from "../utilities/axios";
import * as ImagePicker from "react-native-image-picker";
import jwt_decode from "jwt-decode";
import Loader from "../components/Loader";
const Storage = require("../utilities/TokenStorage");

const Profile = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const bioRef = useRef();
  const [id, setId] = useState("");
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  const history = useHistory();
  const [editmode, setEditmode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getInfo() {
      try {
        const token = await Storage.load("accessToken");
        const data = jwt_decode(token, { complete: true });
        setId(data.userId);
        setBio(data.bio);
        setAddress(data.location);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhone(data.phone);
        setEmail(data.email);
        //console.log(data);
      } catch (e) {
        console.warn(e);
      }
    }
    getInfo();
  }, []);
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
    //TODO: send the photo the server
  };
  const removePhoto = () => {
    setProfilePic(defaultProfilePic);
    //TODO: send the profile pic to the server.
  };

  const cancel = async () => {
    try {
      const token = await Storage.load("accessToken");
      const data = jwt_decode(token, { complete: true });
      setId(data.userId);
      setBio(data.bio);
      setAddress(data.location);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
      setEmail(data.email);
    } catch (e) {
      console.warn(e);
    }
    setEditmode(false);
  };
  const editProfile = () => {
    setEditmode(true);
  };
  const submit = async () => {
    setIsLoading(true);
    const json = {
      UserId: id,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      Location: address,
      ShortBio: bio,
    };
    await Axios.post("/editUser", json)
      .then(async function (response) {
        var token = response.data.accessToken;
        if (token.error) {
          console.warn("token.error = " + token.error);
          setIsLoading(false);
          setEditmode(false);
        } else {
          await Storage.save("accessToken", JSON.stringify(token));
          const data = jwt_decode(token, { complete: true });
          setClientToken(token);
          setId(data.userId);
          setBio(data.bio);
          setAddress(data.location);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setPhone(data.phone);
          setEmail(data.email);
          setEditmode(false);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.warn("e = " + e);
        cancel();
        setIsLoading(false);
      });
  };

  const logoutHandle = async () => {
    try {
      await Storage.save("isLoggedIn", "false");
      await Storage.remove("accessToken");
    } catch (e) {
      alert(e);
    }
    history.push("/login");
  };
  return (
    <LinearGradient
      colors={["#8D99AE", "#EDF2F4"]}
      style={{ height: 1300, flex: 1 }}
    >
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <SafeAreaView>
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                {/* profile Picture */}
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
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
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

                {/* FirstName */}
                <Text style={styles.text}>First Name</Text>
                <TextInput
                  ref={firstNameRef}
                  onSubmitEditing={() => lastNameRef.current.focus()}
                  editable={editmode}
                  style={styles.inputText}
                  placeholder="First Name"
                  onChangeText={(e) => setFirstName(e)}
                  value={firstName}
                  backgroundColor="white"
                  keyboardType="default"
                />
                {/* LastName */}
                <Text style={styles.text}>Last Name</Text>
                <TextInput
                  ref={lastNameRef}
                  onSubmitEditing={() => emailRef.current.focus()}
                  editable={editmode}
                  style={styles.inputText}
                  placeholder="Last Name"
                  onChangeText={(e) => setLastName(e)}
                  value={lastName}
                  backgroundColor="white"
                  keyboardType="default"
                />
                {/* Email */}
                <Text style={styles.text}>Email</Text>
                <TextInput
                  ref={emailRef}
                  onSubmitEditing={() => phoneRef.current.focus()}
                  editable={editmode}
                  style={styles.inputText}
                  placeholder="Email"
                  onChangeText={(e) => setEmail(e)}
                  value={email}
                  backgroundColor="white"
                  keyboardType="email-address"
                />
                {/* Phone */}
                <Text style={styles.text}>Phone</Text>
                <TextInput
                  ref={phoneRef}
                  onSubmitEditing={() => addressRef.current.focus()}
                  editable={editmode}
                  style={styles.inputText}
                  placeholder="Phone Number"
                  onChangeText={(e) => setPhone(e)}
                  value={phone}
                  backgroundColor="white"
                  keyboardType="decimal-pad"
                />
                {/* location */}
                <Text style={styles.text}>Location</Text>
                <TextInput
                  ref={addressRef}
                  onSubmitEditing={() => bioRef.current.focus()}
                  editable={editmode}
                  style={styles.inputText}
                  placeholder="Address"
                  onChangeText={(e) => setAddress(e)}
                  value={address}
                  backgroundColor="white"
                  keyboardType="default"
                />
                {/* bio */}
                <Text style={styles.text}>Bio</Text>
                <TextInput
                  ref={bioRef}
                  editable={editmode}
                  style={styles.inputbio}
                  placeholder="Bio..."
                  onChangeText={(e) => setBio(e)}
                  value={bio}
                  backgroundColor="white"
                  keyboardType="default"
                  multiline={true}
                />
                {/* edit button  and submit */}
                {editmode ? (
                  <>
                    <TouchableOpacity onPress={submit}>
                      <View style={styles.button}>
                        <Text
                          style={{
                            fontFamily: "Arial",
                            fontSize: 15,
                            color: "white",
                            alignSelf: "center",
                          }}
                        >
                          Save <Icon name="save" size={15} color="white" />
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancel}>
                      <View style={styles.button}>
                        <Text
                          style={{
                            fontFamily: "Arial",
                            fontSize: 15,
                            color: "white",
                            alignSelf: "center",
                          }}
                        >
                          Cancel <Icon3 name="cancel" size={15} color="white" />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
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
                          Edit Profile{" "}
                          <Icon name="edit" size={15} color="white" />
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logoutHandle}>
                      <View style={styles.button}>
                        <Text
                          style={{
                            fontFamily: "Arial",
                            fontSize: 15,
                            color: "white",
                            alignSelf: "center",
                          }}
                        >
                          Logout <Icon2 name="logout" size={15} color="white" />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
                <Loader isLoading={isLoading} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Profile;
