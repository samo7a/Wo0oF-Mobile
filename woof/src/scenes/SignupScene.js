import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableWithoutFeedback ,Keyboard, SafeAreaView, Alert} from 'react-native';
import { useHistory} from "react-router-native";
import { Form, FormItem} from 'react-native-form-component';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

import logo from '../images/logo.png';


const SignupScene = () => {

    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signupHandler = () => {
        Alert.alert("Alert Title", `first name : ${firstName}, last name : ${lastName}, email : ${email}`);
    }
    
    return (
        <SafeAreaView>
            <LinearGradient colors={['#8D99AE','#EDF2F4']} style={styles.container}>
                <TouchableWithoutFeedback  onPress={Keyboard.dismiss} style={{flex:1}}>
                    <View >
                        <Image style={styles.logo} source={logo} />
                        <Form style={styles.form} onButtonPress = {() => {}} buttonStyle={styles.submit}>
                            <FormItem
                                style = {styles.input}
                                label="First Name"
                                textInputStyle = {styles.inputText}
                                placeholder = "First Name"
                                isRequired
                                textContentType = 'givenName'
                                value ={firstName}
                                onChangeText = {(e) => setFirstName(e)}
                            />
                            <FormItem
                                style = {styles.input}
                                label="Last Name"
                                textInputStyle = {styles.inputText}
                                placeholder = "Last Name"
                                isRequired
                                textContentType = 'familyName'
                                value ={lastName}
                                onChangeText = {(e) => setLastName(e)}
                            />
                            <FormItem
                                style = {styles.input}
                                label="Email"
                                textInputStyle = {styles.inputText}
                                placeholder = " Email"
                                isRequired
                                textContentType = 'emailAddress'
                                keyboardType = 'email-address'
                                value ={email}
                                onChangeText = {(e) => setEmail(e)}
                            />  
                            <FormItem
                                style = {styles.input}
                                label="Password"
                                textInputStyle = {styles.inputText}
                                placeholder = "Password"
                                isRequired
                                textContentType = 'password'
                                secureTextEntry
                                value ={password}
                                onChangeText = {(e) => setPassword(e)}
                                
                            />  
                            <Button title="Sign up" buttonStyle={styles.button} color = '#EF233C' onPress={signupHandler}/>
                            <Text style={styles.text}>Already have an account?</Text>
                            <Text style={styles.link} onPress={ () => history.push("/login")} > Login </Text>
                        </Form>
                    </View>    
                 </TouchableWithoutFeedback>
            </LinearGradient>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        padding : 20,
        height : 1300,
    },
    logo : {
        marginTop : 10,
        alignSelf : 'center',
        width : 75,
        height : 75
    },
    submit : {
        width : 0, 
        height : 0,
        marginTop : 100,
    }, 
    form : {
        padding : 1,
        backgroundColor : 'red',
        height : 900,
        flex : 1,
        alignContent : 'space-around',
        
    },
    button : {
        width : 300,
        margin : 10,
    },
    
    link : {
        color : 'blue',
        alignSelf : 'center',
        fontSize : 18,
        fontWeight : '400',
        margin : 10,
        textDecorationLine: 'underline',
    },
    text : {
        color : 'black',
        alignSelf : 'center',
        fontSize : 18,
        fontWeight : '500',
        margin : 10
    },
    input: {
        width: 350,
        height : 15,
        margin : 10,
        borderRadius : 14,
      },
    
    inputText : {
        fontSize : 18,
        fontWeight : '500',
    },
});

export default SignupScene; 