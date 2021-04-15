import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";

const EditDog = (props) => {
  const nameRef = useRef();
  const bioRef = useRef();
  const breedRef = useRef();
  const sizeRef = useRef();
  const ageRef = useRef();
  const sexRef = useRef();

  const [name, setName] = useState();
  const [userId, setUserId] = useState();
  const [bio, setBio] = useState();
  const [breed, setBreed] = useState();
  const [size, setSize] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState();
  const [isPottyTrained, setIsPottyTrained] = useState();
  const [isNeutered, setIsNeutered] = useState();
  const [dogId, setDogId] = useState();

  const addDog = () => {};
  const cancel = () => {};
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={props.isVisible}
      style={{ zIndex: 1100 }}
      onRequestClose={() => {}}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            <View style={styles.modalBackground}>
              <View style={styles.form}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="Name"
                  ref={nameRef}
                  onSubmitEditing={() => bioRef.current.focus()}
                  onChangeText={(e) => setName(e)}
                  value={name}
                  backgroundColor="white"
                  keyboardType="default"
                />
                <Text style={styles.text}>Bio</Text>
                <TextInput
                  style={styles.inputbio}
                  placeholder="Bio..."
                  ref={bioRef}
                  onSubmitEditing={() => breedRef.current.focus()}
                  onChangeText={(e) => setBio(e)}
                  value={bio}
                  backgroundColor="white"
                  keyboardType="default"
                  multiline={true}
                />
                <Text style={styles.text}>Breed</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="Breed"
                  ref={breedRef}
                  onSubmitEditing={() => sizeRef.current.focus()}
                  onChangeText={(e) => setBreed(e)}
                  value={breed}
                  backgroundColor="white"
                  keyboardType="default"
                />
                <Text style={styles.text}>Size</Text>
                <TextInput
                  style={styles.inputText}
                  placeholder="Size (height in inches)"
                  ref={sizeRef}
                  onSubmitEditing={() => ageRef.current.focus()}
                  onChangeText={(e) => setSize(e)}
                  value={breed}
                  backgroundColor="white"
                  keyboardType="default"
                />
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Potty Trained?"
                  iconStyle={{ borderColor: "red" }}
                  textStyle={{ textDecorationLine: "none" }}
                  onPress={() => {
                    setIsPottyTrained(!isPottyTrained);
                  }}
                  style={styles.checkbox}
                />
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text="Neutered?"
                  iconStyle={{ borderColor: "red" }}
                  textStyle={{ textDecorationLine: "none" }}
                  onPress={() => {
                    setIsNeutered(!isNeutered);
                  }}
                  style={styles.checkbox}
                />
                <View style={styles.buttonView}>
                  <TouchableOpacity onPress={cancel}>
                    <View style={styles.secondaryButton}>
                      <Text
                        style={{
                          fontFamily: "Arial",
                          fontSize: 15,
                          color: "white",
                          alignSelf: "center",
                        }}
                      >
                        <Ionicons name="close" size={25} color="white" />
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={addDog}>
                    <View style={styles.primaryButton}>
                      <Text
                        style={{
                          fontFamily: "Arial",
                          fontSize: 15,
                          color: "white",
                          alignSelf: "center",
                        }}
                      >
                        <Ionicons
                          name="add-circle-outline"
                          size={25}
                          color="white"
                        />
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  form: {
    padding: 5,
    height: "90%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: 300,
  },
  checkbox: {
    alignSelf: "center",
    padding: 10,
    margin: 15,
  },
  text: {
    color: "black",
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    width: 300,
    height: 10,
    margin: 1,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "flex-start",
  },

  inputText: {
    borderWidth: 1,
    borderColor: "#2B2D42",
    borderStyle: "solid",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    height: 40,
    width: "75%",
    margin: 10,
    fontWeight: "600",
    alignSelf: "center",
  },
  inputText2: {
    borderWidth: 1,
    borderColor: "#2B2D42",
    borderStyle: "solid",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    height: 40,
    width: "90%",
    margin: 10,
    fontWeight: "600",
    alignSelf: "center",
  },
  inputbio: {
    borderWidth: 1,
    borderColor: "#2B2D42",
    borderStyle: "solid",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    height: 90,
    width: "75%",
    margin: 10,
    fontWeight: "600",
    alignSelf: "center",
    //textAlignVertical : 'top'
  },
  buttonView: {
    flexDirection: "row",
  },
  secondaryButton: {
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#2B2D42",
    width: 50,
    height: 50,
    margin: 15,
  },
  primaryButton: {
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#EF233C",
    width: 50,
    height: 50,
    margin: 15,
  },
  button: {
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "#EF233C",
    width: 200,
    height: 25,
    margin: 10,
  },
});

export default EditDog;
