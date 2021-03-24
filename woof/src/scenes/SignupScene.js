import React, {useState} from 'react';
import { StyleSheet,
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
        ActivityIndicator
    } from 'react-native';
import { useHistory} from "react-router-native";
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../images/logo.png';
import defaultProfilePic from '../images/default-profile-with-dog.png';

import * as ImagePicker from 'react-native-image-picker'; 

import axios from '../utilities/axios';
const storage = require('../utilities/TokenStorage');

const SignupScene = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [visible, setVisible] = useState(false);
    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    

    const signupHandler = () => {
       setVisible(false);
       const json = {
        Email: email,
        Password: password, 
        Location : address,
        FirstName : firstName,
        LastName : lastName,
        isOwner : isOwner,
        ProfilePicture : profilePic, 
        ShortBio : bio
       }
       axios.post('/user', json)
      .then(function (response) {
        console.warn(response);
      })
      .catch(function (error) {
        console.warn(error);
      });
    }
    const showModal = () => {
        setVisible(true);
    }
    const hideModal = () =>{
        setVisible(false);
    }
    const choosePhoto = () => {
        const options = {
          noData: true,
          mediaType: 'photo'
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            setProfilePic(response);
          }
        })
      }
      const removePhoto = () => {
          setProfilePic(defaultProfilePic);
      }
    
    return (
        
        <SafeAreaView style={{flex : 1}}>
            <LinearGradient colors={['#8D99AE','#EDF2F4']} style={{height:1300, flex : 1}}>
                <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
                    <View style={styles.container}>
                        <Image style={styles.logo} source={logo} />
                        <KeyboardAvoidingView behavior='height' style={{flex : 1,}} >
                            <View style={styles.form}>
                                <Text style={styles.text}>First Name</Text>
                                <TextInput  style={styles.inputText} 
                                            placeholder = "First Name" 
                                            onChangeText = {(e) => setFirstName(e)} 
                                            value ={firstName}
                                            backgroundColor='white'
                                            keyboardType = 'default'        
                                />

                                <Text style={styles.text}>Last Name</Text>
                                <TextInput  style={styles.inputText} 
                                            placeholder = "Last Name" 
                                            onChangeText = {(e) => setLastName(e)} 
                                            value ={lastName}
                                            backgroundColor='white'
                                            keyboardType = 'default'
                                />

                                <Text style={styles.text}>Email</Text>
                                <TextInput  style={styles.inputText} 
                                            placeholder = "Email" 
                                            onChangeText = {(e) => setEmail(e)} 
                                            value ={email} 
                                            backgroundColor='white'
                                            keyboardType = 'email-address'
                                />

                                <Text style={styles.text}>Password</Text>
                                <TextInput  style={styles.inputText} 
                                            placeholder = "Password" 
                                            onChangeText = {(e) => setPassword(e)} 
                                            value ={password}
                                            backgroundColor='white'
                                            secureTextEntry={true} 
                                            textContentType='password'
                                            keyboardType = 'default'
                                />
                            
                            
                                <BouncyCheckbox
                                    size={25}
                                    fillColor="red"
                                    unfillColor="#FFFFFF"
                                    text="Are you a dog owner?"
                                    iconStyle={{ borderColor: "red" }}
                                    textStyle={{  textDecorationLine : "none"}}
                                    onPress={() => {
                                        if (isOwner === false) setIsOwner(true)
                                        else setIsOwner(false);
                                    }}
                                    style={styles.checkbox}
                                />
                                <TouchableOpacity onPress={showModal}>
                                    <View style={styles.button}>
                                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                        Signup
                                    <Icon name="chevron-up" size={15} color="white" />
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.text}>Already have an account?</Text>
                                <Text style={styles.link} onPress={ () => history.push("/login")} > Login </Text>
                            </View>
                        </KeyboardAvoidingView>





                        <Modal visible={visible} animationType='slide'>
                            <LinearGradient colors={['#8D99AE','#EDF2F4']} style={{height:1300, flex : 1}}>
                            <KeyboardAvoidingView behavior='height' style={{flex : 1,}} >
                            <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
                                <View style={styles.modal}>
                                    <TouchableOpacity onPress={choosePhoto} style={{margin: 25}}>
                                        <View style={{position:'relative', justifyContent: 'center', alignItems: 'center'}}>
                                            <Image style={styles.photo} source= {profilePic}/>
                                            <Text style={{color: 'white', position:'absolute', alignSelf:'center', textAlign: 'center'}}>Upload Profile Picture</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={removePhoto} style={styles.button}>
                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: 'white', alignSelf:'center', textAlign: 'center', padding : 5}}>Remove Photo</Text>
                        
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.text}>Address</Text>
                                    <TextInput  style={styles.inputText} 
                                                placeholder = "Address" 
                                                onChangeText = {(e) => setAddress(e)} 
                                                value ={address}
                                                backgroundColor='white'
                                                keyboardType = 'default'
                                    />
                                    <Text style={styles.text}>Bio</Text>
                                    <TextInput  style={styles.inputbio} 
                                                placeholder = "Bio..." 
                                                onChangeText = {(e) => setBio(e)} 
                                                value ={bio}
                                                backgroundColor='white'
                                                keyboardType = 'default'
                                                multiline = {true}
                                    />
                                    <TouchableOpacity onPress={signupHandler}>
                                        <View style={styles.button}>
                                        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                            Signup
                                        <Icon name="chevron-up" size={15} color="white" />
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={hideModal} >
                                        <View style={styles.button}>
                                        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                            Cancel
                                        <Icon name="remove" size={15} color="white" />
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                </TouchableWithoutFeedback>
                                </KeyboardAvoidingView>
                            </LinearGradient>
                        </Modal>




                    </View>    
                 </TouchableWithoutFeedback>
            </LinearGradient>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignContent: 'stretch',
        padding : 10,
       
    },
    logo : {
        alignSelf : 'center',
        width : 60,
        height : 60
    },

    form : {
        padding : 10,
        height : 500,
        flexDirection : 'column',
        alignItems : 'center',
        // justifyContent : 'space-evenly'
        
    },
    
    text : {
        color : 'black',
        alignSelf : 'center',
        fontSize : 15,
        fontWeight : '500',
    },
    input: {
        width: 300,
        height : 10,
        margin : 1,
        borderRadius : 10,
        alignSelf : 'center',
        justifyContent : 'flex-start'
      },
    
    inputText : {
        borderWidth: 1,
        borderColor: '#2B2D42',
        borderStyle : 'solid',
        padding : 10,
        fontSize: 18,
        borderRadius : 6,
        height: 40,
        width: '75%',
        margin: 10,
        fontWeight : '600',
        alignSelf : 'center',
    },
    inputbio : {
        borderWidth: 1,
        borderColor: '#2B2D42',
        borderStyle : 'solid',
        padding : 10,
        fontSize: 18,
        borderRadius : 6,
        height: 90,
        width: '75%',
        margin: 10,
        fontWeight : '600',
        alignSelf : 'center',
        //textAlignVertical : 'top'
    },
    checkbox : {
        alignSelf : 'center',
        padding : 10,
    },

    button : {
        borderRadius : 8,
        alignSelf: 'center',
        backgroundColor : "#EF233C",
        width : 200,
        height : 25,
        margin : 10,
    },
    
    link : {
        color : 'blue',
        alignSelf : 'center',
        fontSize : 15,
        fontWeight : '400',
        margin :5,
        textDecorationLine: 'underline',
    },
    modal : {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'center',
        padding : 10,
    },
    photo : {
        height: 150,
        width : 150,
        borderRadius : 75,
        alignSelf : 'center',
        justifyContent : 'space-evenly',

        
    }
});

export default SignupScene; 
