import React, {useState} from 'react';
import { StyleSheet,
        Text, 
        View, 
        Image, 
        TouchableWithoutFeedback, 
        Keyboard,
        SafeAreaView,  
        Modal,  
        TouchableOpacity, 
        TextInput,
        KeyboardAvoidingView,
    } from 'react-native';
import { useHistory} from "react-router-native";
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../images/logo.png';
import styles from '../../styles/GlobalStyles';
import axios from '../utilities/axios';
const storage = require('../utilities/TokenStorage');

const LoginScene = () => {
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOwner, setIsOwner] = useState(false);

    const loginHandler = () => {
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
        }
      })
      .catch(function (error) {
        console.warn(error);
      });
      if (isOwner){
        history.push('/ownerHome');
      } else {
          history.push('adaptorHome');
      }
      
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
                                    <View style={styles.primaryButton}>
                                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                        Login
                                    <Icon name="chevron-right" size={15} color="white" />
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.text}>New User?</Text>
                                <TouchableOpacity onPress={ () => history.push("/signup")}>
                                    <View style={styles.secondaryButton}>
                                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                        Signup
                                    <Icon name="chevron-up" size={15} color="white" />
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.link} onPress={() => history.push('/reset')} > Forgot your Password? </Text>
                            </View>
                        </KeyboardAvoidingView>
                    </View>    
                 </TouchableWithoutFeedback>
            </LinearGradient>
        </SafeAreaView>
    ); 
}

export default LoginScene; 
