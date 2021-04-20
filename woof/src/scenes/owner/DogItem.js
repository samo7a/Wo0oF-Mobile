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
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import RNPickerSelect from "react-native-picker-select";
import LinearGradient from "react-native-linear-gradient";
import Axios from "../../utilities/axios";
import defaultProfilePic from "../../images/dogAvatar.jpg";
import * as ImagePicker from "react-native-image-picker";
import { Picker } from "native-base";

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
  const [editIsNeutered, editSetIsNeutered] = useState(props.data.isNeutered);

  const [oldeditName, oldeditSetName] = useState(props.data.name);
  const [oldeditBio, oldeditSetBio] = useState(props.data.bio);
  const [oldeditBreed, oldeditSetBreed] = useState(props.data.breed);
  const [oldeditSize, oldeditSetSize] = useState(props.data.size);
  const [oldeditAge, oldeditSetAge] = useState(props.data.age);
  const [oldeditSex, oldeditSetSex] = useState(props.data.sex);
  const [oldeditIsPottyTrained, oldeditSetIsPottyTrained] = useState(
    props.data.isPottyTrained
  );
  const [oldeditIsNeutered, oldeditSetIsNeutered] = useState(props.data.isNeutered);
  const [dogId, setDogId] = useState(props.data.key);
  const [userId, setUserId] = useState(props.userId);

  //const [editDogId, editSDogId] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  const showModal = () => {
    setshowEditDog(true);
  };
  const hideModal = () => {
    setshowEditDog(false);
  };
  const cancel = () => {
    setEditmode(false);
    hideModal();
  };
  const goback = () => {
    editSetBio(oldeditBio);
    editSetBreed(oldeditBreed);
    editSetName(oldeditName);
    editSetSize(oldeditSize);
    editSetSex(oldeditSex);
    editSetAge(oldeditAge);
    editSetIsNeutered(oldeditIsNeutered);
    editSetIsPottyTrained(oldeditIsPottyTrained);
    setEditmode(false);
  };
  const edit = () => {
    oldeditSetBio(editBio);
    oldeditSetBreed(editBreed);
    oldeditSetName(editName);
    oldeditSetSize(editSize);
    oldeditSetSex(editSex);
    oldeditSetAge(editAge);
    oldeditSetIsNeutered(editIsNeutered);
    oldeditSetIsPottyTrained(editIsPottyTrained);
    setEditmode(true);
  };
  const save = async () => {
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
      hideModal()
    } catch (e) {
      setEditmode(false);
      hideModal();
      console.log(e);
    }
  };
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
    //TODO: send the photo to the server
  };
  const removePhoto = () => {
    setProfilePic(defaultProfilePic);
    //TODO: send the profile pic to the server.
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
    <SafeAreaView>
      
      <View
        style={{
          height: 200,
          width: SCREEN_WIDTH * 0.8,
          backgroundColor: "red",
          justifyContent: "center",
          marginRight: 15,
          marginTop: 15,
          marginBottom: 15,
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
              <Text>isNeutered: {props.data.isNeutered ? "Yes" : "No"}.</Text>
              <Text>
                isPottyTrained: {props.data.isPottyTrained ? "Yes" : "No"}.
              </Text>
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
                    <TouchableOpacity
                      onPress={choosePhoto}
                      style={{ margin: 25 }}
                    >
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
                    <TouchableOpacity
                      onPress={removePhoto}
                      style={styles.button}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
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
                    <Text style={styles.text}>Name</Text>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Name"
                      placeHolderTextColor="black"
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
                      placeHolderTextColor="red"
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
                      <Text>{"What is the size of your dog?"}</Text>
                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: 200 }}
                        selectedValue={editSize}
                        onValueChange={(e) => editSetSize(e)}
                        enabled={editmode}
                      >
                        <Picker.Item label="Small" value="Small" />
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="Large" value="Large" />
                      </Picker>
                    </View>
                    <View style={styles.pickerView}>
                      <Text>{"What is the sex of your dog?"}</Text>

                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: 200 }}
                        selectedValue={editSex}
                        onValueChange={(e) => editSetSex(e)}
                        enabled={editmode}
                      >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                        <Picker.Item label="Other" value="Other" />
                      </Picker>
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
                          <TouchableOpacity onPress={goback}>
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
                                  name="chevron-back-outline"
                                  size={25}
                                  color="white"
                                />
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={save}>
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
                                <Ionicons
                                  name="close"
                                  size={25}
                                  color="white"
                                />
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={edit}>
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
    </SafeAreaView>
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
    //flexDirection: "column",
    fontSize: 12,
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30,
  },
  photo: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
});
