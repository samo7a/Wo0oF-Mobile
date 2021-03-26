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

import axios from '../utilities/axios';
const storage = require('../utilities/TokenStorage');

const LoginScene = () => {
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [visible, setVisible] = useState(false);
    

    const loginHandler = () => {
       setVisible(false);
       const json = {
        Email: email,
        Password: password, 
        isOwner : isOwner,
       }
       axios.post('/api/loginUser', json)
      .then(function (response) {
        console.warn(response);
        if (response != null) {
            let userId = response.id;
            let userObject = {
                id : userId,
            }
            storage.save(userObject);
            history.push('/home')
        }
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
    
    
    return (
        <SafeAreaView>
            <LinearGradient colors={['#8D99AE','#EDF2F4']} style={{height:'100%'}}>
                <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
                    <View style={styles.container}>
                        <Image style={styles.logo} source={logo} />
                        <KeyboardAvoidingView behavior='padding' style={{flex : 1,}} >
                            <View style={styles.form}>
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
                                    onPress={() => {setIsOwner(!isOwner)}}
                                    style={styles.checkbox}
                                />
                                <TouchableOpacity onPress={loginHandler}>
                                    <View style={styles.buttonLogin}>
                                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                        Login
                                    <Icon name="chevron-right" size={15} color="white" />
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => history.push("/signup")}>
                                    <View style={styles.buttonSignup}>
                                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                        Signup
                                    <Icon name="chevron-up" size={15} color="white" />
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.link} onPress={showModal} > Forgot your Password? </Text>
                            </View>
                        </KeyboardAvoidingView>
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
        alignContent: 'space-between',
        padding : 25,

       
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
        margin : 15,
    },

    buttonSignup : {
        borderRadius : 8,
        alignSelf: 'center',
        backgroundColor : "#2B2D42",
        width : 200,
        height : 25,
        margin : 15,
    },
    buttonLogin : {
        borderRadius : 8,
        alignSelf: 'center',
        backgroundColor : "#EF233C",
        width : 200,
        height : 25,
        margin : 15,
    },
    
    link : {
        color : 'blue',
        alignSelf : 'center',
        fontSize : 15,
        fontWeight : '400',
        marginTop : 25,
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

export default LoginScene; 
