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
        ActivityIndicator
    } from 'react-native';
import { useHistory} from "react-router-native";
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../images/logo.png';
import styles from '../../styles/GlobalStyles';
import Axios , {setClientToken}from '../utilities/axios';
import jwt_decode from 'jwt-decode';



const storage = require('../utilities/TokenStorage');


const LoginScene = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOwner, setIsOwner] = useState(false);

    const loginHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const json = {
            Email: email,
            Password: password,
        };
        
        const onSuccess = ({data}) => {
            // Set JSON Web Token on success
            var res = response.data;
            setClientToken(data);
            storage.save(json);
            if (isOwner){
                history.push('/ownerHome');
              } else {
                  history.push('/adaptorHome');
              }
            console.log(data.msg);
          };
      
          const onFailure = error => {
            console.log(error);
          };
        Axios.post('/login', json)
        .then(function (response) {
            var res = response.data.accessToken;
            
            var ud = jwt_decode(res,{complete:true});
            console.log(ud.userId);
            //console.log(response.data.accessToken);
            if (res.error) {
              console.log(res);
              history.push('/login');
              // window.location.href = "/";
            } else {
                storage.save(response);
                console.log(storage.load());
                console.log(response.accessToken);
              //storage.storeToken(res);
              if (isOwner){
                history.push('/ownerHome');
              } else {
                  history.push('/adaptorHome');
              }
              //window.location.href = "/home";
            }
          })
        .catch(onFailure);
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
