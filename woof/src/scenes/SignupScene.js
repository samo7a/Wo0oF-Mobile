import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, Image, KeyboardAvoidingView, TouchableWithoutFeedback ,Keyboard, Platform, SafeAreaView, RefreshControl} from 'react-native';
import { useHistory} from "react-router-native";
import { Form, FormItem, Label } from 'react-native-form-component';
import LinearGradient from 'react-native-linear-gradient';
import KeyboardSpacer from 'react-native-keyboard-spacer';


import logo from '../images/logo.png';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignupScene = () => {
    const scrollRef = useRef();
  
  	const handleClick = number => {
    	scrollRef.current.ScrollTo({
          y: (100 * number),
          animated: true,
        });
    }
  
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signupHandler = () => console.warn(email);
    
    return (
        <SafeAreaView >
        <LinearGradient colors={['#8D99AE','#EDF2F4']} style={styles.container}>
            
           
                
                    <TouchableWithoutFeedback  onPress={Keyboard.dismiss} style={{flex:1}}>
                        <View style={{flex:1}}>
                        
                            <View style={{flex:1}}>
                                <Image style={styles.logo} source={logo} />
                                
                                <Form style={styles.form} onButtonPress = {() => {}} buttonStyle={styles.submit}>
                                <KeyboardAvoidingView behavior = 'padding'>
                                    <FormItem
                                        style = {styles.input}
                                        label="First Name"
                                        placeholder = "First Name"
                                        isRequired
                                        value ={firstName}
                                        onChangeText = {(e) => setFirstName(e)}
                                    />
                                    
                                    <FormItem
                                        label="Last Name"
                                        isRequired
                                        value ={lastName}
                                        onChangeText = {(e) => setLastName(e)}
                                    />
                                    
                                    <FormItem
                                        label="Email"
                                        isRequired
                                        value ={email}
                                        onChangeText = {(e) => setEmail(e)}
                                    />
                                     
                                    <FormItem
                                        label="Password"
                                        isRequired
                                        value ={password}
                                        onChangeText = {(e) => setPassword(e)}
                                        
                                    /> 
                                     
                                    <Button title="Sign up" style={styles.button} onButtonPress={signupHandler}/>
                                    
                                <Text style={styles.text}>Already have an account?</Text>
                                
                                <Button style={styles.link} title="Login" onPress={ () => history.push("/login")} />
                                </KeyboardAvoidingView>
                                </Form>
                                
                            </View>
                            
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
        marginTop : 25,
        alignSelf : 'center',
        width : 75,
        height : 75
    },
    button : {
      

    },
    form : {
        padding : 1,
        backgroundColor : 'red',
        height : 900,
        flex : 1,
        
    },
    link : {
        marginBottom : 100,
        color : 'blue',
    },
    text : {
        alignSelf : 'center',
    },
    input: {
        width: 350,
        height : 1,
        margin: 10,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
      },
      submit : {
        width:0, height:0 
      }
    
});

export default SignupScene; 