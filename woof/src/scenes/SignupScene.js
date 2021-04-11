import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useHistory } from "react-router-native";
import LinearGradient from "react-native-linear-gradient";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import logo from "../images/logo.png";
import styles from "../../styles/GlobalStyles";
import Axios from "../utilities/axios";
const storage = require("../utilities/TokenStorage");

const SignupScene = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  // const [visible, setVisible] = useState(false); //for a future modal (email verification)

  const showAlert = (title, msg) =>
    Alert.alert(
      title,
      msg,
      [
        {
          text: "OK",
          onPress: () => {},
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  const signupHandler = async () => {
    //setVisible(false);
    const json = {
      Email: email,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      isOwner: isOwner,
    };

    await Axios.post("/signup", json)
      .then(async function (response) {
        showAlert(null, JSON.stringify(response.data.msg));
      })
      .catch(function (error) {
        showAlert(null, JSON.stringify(error));
      });
    history.push("/login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#8D99AE", "#EDF2F4"]}
        style={{ height: 1300, flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
              <View style={styles.form}>
                <Text style={styles.text}>First Name</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="First Name"
                  onChangeText={(e) => setFirstName(e)}
                  value={firstName}
                  backgroundColor="white"
                  keyboardType="default"
                />

                <Text style={styles.text}>Last Name</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="Last Name"
                  onChangeText={(e) => setLastName(e)}
                  value={lastName}
                  backgroundColor="white"
                  keyboardType="default"
                />

                <Text style={styles.text}>Email</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="Email"
                  onChangeText={(e) => setEmail(e)}
                  value={email}
                  backgroundColor="white"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.text}>Password</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="Password"
                  onChangeText={(e) => setPassword(e)}
                  value={password}
                  backgroundColor="white"
                  secureTextEntry={true}
                  textContentType="password"
                  keyboardType="default"
                />

                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Are you a dog owner?"
                  iconStyle={{ borderColor: "red" }}
                  textStyle={{ textDecorationLine: "none" }}
                  onPress={() => {
                    setIsOwner(!isOwner);
                  }}
                  style={styles.checkbox}
                />
                <TouchableOpacity onPress={signupHandler}>
                  <View style={styles.button}>
                    <Text
                      style={{
                        fontFamily: "Arial",
                        fontSize: 15,
                        color: "white",
                        alignSelf: "center",
                      }}
                    >
                      Signup
                      <Icon name="chevron-up" size={15} color="white" />
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.text}>Already have an account?</Text>
                <Text
                  style={styles.link}
                  onPress={() => history.push("/login")}
                >
                  {" "}
                  Login{" "}
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignupScene;
