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
        Button, 
        TouchableOpacity, 
        TextInput,
        KeyboardAvoidingView
    } from 'react-native';
import { useHistory} from "react-router-native";
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../images/logo.png';
import axios from 'axios';
const storage = require('../TokenStorage');

const SignupScene = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [visible, setVisible] = useState(false);
    const [enableShift, setEnableShift] = useState(false);

    const signupHandler = () => {
       Alert.alert("Alert Title", `first name : ${firstName}, last name : ${lastName}, email : ${email}, password: F**k oIo, isOwner: ${isOwner}`);
       setVisible(false);
    }
    const showModal = () => {
        setVisible(true);
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
                            <View style={styles.modal}>
                            <Text style={styles.text}>Last Name</Text>
                            <TextInput  style={styles.inputText} 
                                        placeholder = "Last Name" 
                                        onChangeText = {(e) => setLastName(e)} 
                                        value ={lastName}
                                        backgroundColor='white'
                                        keyboardType = 'default'
                            />
                            <TouchableOpacity onPress={signupHandler}>
                                <View style={styles.button}>
                                <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                    Signup
                                <Icon name="chevron-up" size={15} color="white" />
                                </Text>
                                </View>
                            </TouchableOpacity>
                            </View>
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

    },
});

export default SignupScene; 
