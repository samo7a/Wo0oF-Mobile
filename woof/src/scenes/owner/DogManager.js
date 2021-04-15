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
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import RNPickerSelect from "react-native-picker-select";
import LinearGradient from "react-native-linear-gradient";
import { SwipeListView } from "react-native-swipe-list-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EditDog from "../../components/EditDog";

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
const DogManager = () => {
  const nameRef = useRef();
  const bioRef = useRef();
  const breedRef = useRef();

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [bio, setBio] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState(0);
  const [sex, setSex] = useState("");
  const [isPottyTrained, setIsPottyTrained] = useState(false);
  const [isNeutered, setIsNeutered] = useState(false);
  const [dogId, setDogId] = useState();
  const [showEditDog, setshowEditDog] = useState(false);
  const [showAddDog, setShowAddDog] = useState(false);
  const [listData, setListData] = useState(
    myDogs.map((dog, key) => ({
      key: `${key}`,
      name: dog.name,
      bio: dog.bio,
    }))
  );
  useEffect(() => {
    
  }, []);
  const cancel = () => {
    setShowAddDog(false);
  };
  const showAddDogModal = () => {
    setName("");
    setBio("");
    setBreed("");
    setSize("");
    setAge(0);
    setSex("");
    setIsPottyTrained(false);
    setIsNeutered(false);
    setShowAddDog(true);
  };
  const addDog = () => {};
  const editDog = () => {};


  

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const onLeftActionStatusChange = (rowKey) => {
    console.log("onLeftActionStatusChange", rowKey);
  };

  const onRightActionStatusChange = (rowKey) => {
    console.log("onRightActionStatusChange", rowKey);
  };

  const onRightAction = (rowKey) => {
    console.log("onRightAction", rowKey);
  };

  const onLeftAction = (rowKey) => {
    console.log("onLeftAction", rowKey);
  };

  const VisibleItem = (props) => {
    const { data, rowHeightAnimatedValue, removeRow, rightActionState } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, { height: rowHeightAnimatedValue }]}
      >
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={() => console.log("Element touched")}
          underlayColor={"#aaa"}
        >
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {data.item.name}
            </Text>
            <Text style={styles.details} numberOfLines={1}>
              {data.item.bio}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = (props) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={[styles.rowBack, { height: rowHeightAnimatedValue }]}
      >
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}
          >
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}
            >
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8D99AE", "#EDF2F4"]}
        style={{ height: "100%" }}
      >
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          disableRightSwipe
          onRowDidOpen={onRowDidOpen}
          leftActivationValue={100}
          rightActivationValue={-200}
          leftActionValue={0}
          rightActionValue={-500}
          onLeftAction={onLeftAction}
          onRightAction={onRightAction}
          onLeftActionStatusChange={onLeftActionStatusChange}
          onRightActionStatusChange={onRightActionStatusChange}
        />
        <View style={styles.addButton}>
          <TouchableOpacity onPress={showAddDogModal}>
            <Ionicons name="add-circle-outline" size={40} color="#D90429" />
          </TouchableOpacity>
        </View>

        <EditDog isVisible={showEditDog} />

        <Modal
          transparent={true}
          animationType="none"
          visible={showAddDog}
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
                        onChangeText={(e) => setBreed(e)}
                        value={breed}
                        backgroundColor="white"
                        keyboardType="default"
                      />
                      <View style={styles.pickerView}>
                        <Text>
                          {!size ? "What is the size of your dog?" : null}
                        </Text>
                        <RNPickerSelect
                          placeholder={{
                            label: "What is the size of your dog?",
                            value: null,
                          }}
                          onValueChange={(e) => setSize(e)}
                          items={[
                            { label: "Small", value: "Small" },
                            { label: "Medium", value: "Medium" },
                            { label: "Large", value: "Large" },
                          ]}
                          value={size}
                        />
                      </View>
                      <View style={styles.pickerView}>
                        <Text>
                          {!sex ? "What is the sex of your dog?" : null}
                        </Text>
                        <RNPickerSelect
                          placeholder={{
                            label: "What is the sex of your dog?",
                            value: null,
                          }}
                          onValueChange={(e) => setSex(e)}
                          items={[
                            { label: "Female", value: "Female" },
                            { label: "Male", value: "Male" },
                            { label: "Other", value: "Other" },
                          ]}
                          value={sex}
                        />
                        <Text>{sex ? `It is a ${sex} Dog!` : null}</Text>
                      </View>
                      <Text style={styles.text}>Age: {age} years old</Text>
                      <Slider
                        style={{ width: 300, height: 40 }}
                        minimumValue={0}
                        maximumValue={25}
                        step={0.25}
                        value={age}
                        minimumTrackTintColor="#2B2D42"
                        maximumTrackTintColor="#8D99AE"
                        thumbTintColor="#D90429"
                        onValueChange={(e) => setAge(e)}
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
                </TouchableWithoutFeedback>
              </ScrollView>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </Modal>
      </LinearGradient>
    </View>
  );
};









const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  details: {
    fontSize: 12,
    color: "#999",
  },
  addButton: {
    margin: 15,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    //borderRadius : 50,
    //backgroundColor: "#D90429",
    width: 40,
    height: 40,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    padding : 20,
  },
  form: {
    padding: 10,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: 325,
    borderRadius : 25
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

export default DogManager;
