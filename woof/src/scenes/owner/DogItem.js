import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import RNPickerSelect from "react-native-picker-select";
import LinearGradient from "react-native-linear-gradient";
import Axios from "../../utilities/axios";

//dog properties for editing a dog

const SCREEN_WIDTH = Dimensions.get("window").width;

const DogItem = (props) => {
  const [editName, editSetName] = useState(props.data.name);
  const [editBio, editSetBio] = useState(props.data.bio);
  const [editBreed, editSetBreed] = useState(props.data.breed);
  const [editSize, editSetSize] = useState(props.data.size);
  const [editAge, editSetAge] = useState(props.data.age);
  const [editSex, editSetSex] = useState(props.data.sex);
  const [editIsPottyTrained, editSetIsPottyTrained] = useState(
    props.data.isPottyTrained
  );
  const [dogId, setDogId] = useState(props.data.key);
  const [userId, setUserId] = useState(props.userId);
  const [editIsNeutered, editSetIsNeutered] = useState(props.data.isNeutered);
  //const [editDogId, editSDogId] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const showModal = () => {
    setshowEditDog(true);
  };

  const editDog = async () => {
    console.log(dogId);
    var obj = {
      UserID: userId,
      Name: editName,
      DogID: dogId,
      Bio: editBio,
      Breed: editBreed,
      Size: editSize,
      isPottyTrained: editIsPottyTrained,
      isNeutered: editIsNeutered,
      Age: editAge,
      Sex: editSex,
    };
    console.log(JSON.stringify(obj));

    try {
      await Axios.post("/editDog", obj);
      props.editDogArray(props.data);
      setEditmode(false);
      setshowEditDog(false);
    } catch (e) {
      console.log(e);
    }
  };

  // for showing modal
  const [showEditDog, setshowEditDog] = useState(false);
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      //extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={[{ transform: [{ scale: scale }] }]}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={25}
              color="#fff"
            />
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          height: 200,
          width: SCREEN_WIDTH * 0.8,
          backgroundColor: "red",
          justifyContent: "center",
          //paddingHorizontal: 16,
          marginRight: 15,
          marginTop : 15,
          marginBottom : 15,
          alignSelf: "center",
          borderRadius: 10,
        }}
      >
        <Swipeable renderRightActions={rightSwipe} overshootRight={false}>
          <TouchableOpacity onPress={showModal}>
            <View style={styles.container}>
              <Text>Name: {props.data.name}.</Text>
              <Text>Age: {props.data.age}.</Text>
              <Text>Bio: {props.data.bio}.</Text>
              <Text>Size: {props.data.size}.</Text>
              <Text>Breed: {props.data.breed}.</Text>
              <Text>Sex: {props.data.sex}.</Text>
              <Text>isNeutered: {props.data.isNeutered}.</Text>
              <Text>isPottyTrained: {props.data.isPottyTrained}.</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>

      <Modal
        transparent={true}
        animationType="none"
        visible={showEditDog}
        style={{ zIndex: 1100 }}
        onRequestClose={() => {}}
      >
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalBackground}>
                  <View style={styles.form}>
                    <Text style={styles.text}>Name</Text>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Name"
                      placeHolderTextColor={editmode ? "#2B2D42" : "black"}
                      onChangeText={(e) => editSetName(e)}
                      value={editName}
                      editable={editmode}
                      backgroundColor="white"
                      keyboardType="default"
                    />
                    <Text style={styles.text}>Bio</Text>
                    <TextInput
                      style={styles.inputbio}
                      placeholder="Bio..."
                      onChangeText={(e) => editSetBio(e)}
                      value={editBio}
                      editable={editmode}
                      backgroundColor="white"
                      keyboardType="default"
                      multiline={true}
                    />
                    <Text style={styles.text}>Breed</Text>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Breed"
                      value={editBreed}
                      editable={editmode}
                      backgroundColor="white"
                      keyboardType="default"
                    />
                    <View style={styles.pickerView}>
                      <Text>
                        {!editSize ? "What is the size of your dog?" : null}
                      </Text>
                      <RNPickerSelect
                        placeholder={{
                          label: "What is the size of your dog?",
                          value: null,
                        }}
                        onValueChange={(e) => editSetSize(e)}
                        items={[
                          { label: "Small", value: "Small" },
                          { label: "Medium", value: "Medium" },
                          { label: "Large", value: "Large" },
                        ]}
                        value={editSize}
                        disabled={!editmode}
                      />
                    </View>
                    <View style={styles.pickerView}>
                      <Text>
                        {!editSex ? "What is the sex of your dog?" : null}
                      </Text>
                      <RNPickerSelect
                        placeholder={{
                          label: "What is the sex of your dog?",
                          value: null,
                        }}
                        onValueChange={(e) => editSetSex(e)}
                        items={[
                          { label: "Female", value: "Female" },
                          { label: "Male", value: "Male" },
                          { label: "Other", value: "Other" },
                        ]}
                        value={editSex}
                        disabled={!editmode}
                      />
                      <Text>{editSex ? `It is a ${editSex} Dog!` : null}</Text>
                    </View>
                    <Text style={styles.text}>Age: {editAge} years old</Text>
                    <Slider
                      style={{ width: 300, height: 40 }}
                      minimumValue={0}
                      maximumValue={25}
                      step={0.25}
                      value={editAge}
                      disabled={!editmode}
                      minimumTrackTintColor="#2B2D42"
                      maximumTrackTintColor="#8D99AE"
                      thumbTintColor="#D90429"
                      onValueChange={(e) => editSetAge(e)}
                    />

                    <BouncyCheckbox
                      size={25}
                      fillColor="red"
                      unfillColor="#FFFFFF"
                      text="Potty Trained?"
                      iconStyle={{ borderColor: "red" }}
                      textStyle={{ textDecorationLine: "none" }}
                      onPress={() => {
                        editSetIsPottyTrained(!editIsPottyTrained);
                      }}
                      style={styles.checkbox}
                      disabled={!editmode}
                    />
                    <BouncyCheckbox
                      size={25}
                      fillColor="red"
                      unfillColor="#FFFFFF"
                      text="Neutered?"
                      iconStyle={{ borderColor: "red" }}
                      textStyle={{ textDecorationLine: "none" }}
                      onPress={() => {
                        editSetIsNeutered(!editIsNeutered);
                      }}
                      style={styles.checkbox}
                      disabled={!editmode}
                    />
                    {editmode ? (
                      <>
                        <View style={styles.buttonView}>
                          <TouchableOpacity
                            onPress={() => setshowEditDog(false)}
                          >
                            <View style={styles.secondaryButton}>
                              <Text
                                style={{
                                  fontFamily: "Arial",
                                  fontSize: 15,
                                  color: "white",
                                  alignSelf: "center",
                                }}
                              >
                                <Ionicons
                                  name="close"
                                  size={25}
                                  color="white"
                                />
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={editDog}>
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
                                  name="save-outline"
                                  size={25}
                                  color="white"
                                />
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.buttonView}>
                          <TouchableOpacity
                            onPress={() => setshowEditDog(false)}
                          >
                            <View style={styles.secondaryButton}>
                              <Text
                                style={{
                                  fontFamily: "Arial",
                                  fontSize: 15,
                                  color: "white",
                                  alignSelf: "center",
                                }}
                              >
                                <Ionicons
                                  name="close"
                                  size={25}
                                  color="white"
                                />
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setEditmode(true)}>
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
                                  name="pencil-outline"
                                  size={25}
                                  color="white"
                                />
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default DogItem;

const styles = StyleSheet.create({
  container: {
    height: 200,
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
    height: 200,
    marginRight: 40,
    marginTop: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    padding: 20,
  },
  form: {
    padding: 10,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: 325,
    borderRadius: 25,
  },
  checkbox: {
    alignSelf: "center",
    padding: 5,
    margin: 5,
  },
  text: {
    color: "black",
    alignSelf: "center",
    fontSize: 12,
    fontWeight: "500",
  },
  input: {
    width: 300,
    height: 9,
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
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 12,
    borderRadius: 6,
    height: 75,
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
  pickerView: {
    flexDirection: "column",
    fontSize: 12,
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30,
  },
});
