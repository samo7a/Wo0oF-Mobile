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
import styles from '../../styles/GlobalStyles';
import axios from '../utilities/axios';
const storage = require('../utilities/TokenStorage');

const PasswordResetScene = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    


    const modalHandler = () => {
        setVisible(!visible);
    }

    const resetPassword = () => {
        //sent data to the backend
        modalHandler();
        const json = {
            Email: email
           }
           axios.post('/api/resetpassword', json)
          .then(function (response) {
            console.warn(response);
            if (response != null) {
                let userId = response.id;
                let userObject = {
                    id : userId,
                }
            }
          })
          .catch(function (error) {
            console.warn(error);
          });
        history.push('/reset');
    }
    const confirmPassord = () => {
        modalHandler();
    }

    return (
        <SafeAreaView style={{flex : 1}}>
                <LinearGradient colors={['#8D99AE','#EDF2F4']} style={{height:1300, flex : 1}}>
                    <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
                        <View style={styles.container}>
                            <View style={styles.form}>
                                <Text style={{ fontFamily: 'Arial', fontSize: 25, color: 'black', alignSelf: 'center' , textAlign:'center', margin: 50}}>
                                    Reset Your Password
                                </Text>
                                <TextInput  style={styles.inputText2} 
                                            placeholder = "Email" 
                                            onChangeText = {(e) => setEmail(e)} 
                                            value ={email}
                                            backgroundColor='white'
                                            keyboardType = 'email-address'
                                />
                                <TouchableOpacity onPress={resetPassword}>
                                    <View style={styles.button}>
                                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center',}}>
                                        Reset Password
                                    <Icon name="chevron-up" size={15} color="white" />
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {history.push('/login')}} >
                                    <View style={styles.button}>
                                    <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center'}}>
                                        Cancel
                                    <Icon name="remove" size={15} color="white" />
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>




                            <Modal visible={visible} animationType='slide' style={{flex : 1}}>
                                <LinearGradient colors={['#8D99AE','#EDF2F4']} style={{height:'100%', flex : 1}}>
                                    <KeyboardAvoidingView behavior='height' style={{flex : 1,}} >
                                        <TouchableWithoutFeedback  onPress={Keyboard.dismiss} style={{flex : 1,}}>
                                            <View style={styles.modal2}>
                                                <Text style={{ fontFamily: 'Arial', fontSize: 20, color: 'black', alignSelf: 'center' , textAlign:'center', margin: 35}}>
                                                    Enter Your Confirmation Code To Reset Your Password
                                                </Text>
                                                <Text style={styles.text}>Confirmation Code</Text>
                                                <TextInput  style={styles.inputText} 
                                                            placeholder = "Confirmation Code" 
                                                            onChangeText = {(e) => setConfirmationCode(e)} 
                                                            value ={confirmationCode}
                                                            backgroundColor='white'
                                                            keyboardType = 'number-pad'
                                                />
                                                <Text style={styles.text}>Password</Text>
                                                <TextInput  style={styles.inputText} 
                                                            placeholder = "New Password" 
                                                            onChangeText = {(e) => setPassword(e)} 
                                                            value ={password}
                                                            backgroundColor='white'
                                                            secureTextEntry={true} 
                                                            textContentType='password'
                                                            keyboardType = 'default'
                                                />
                                                <Text style={styles.text}>Reenter the password</Text>
                                                <TextInput  style={styles.inputText} 
                                                            placeholder = "Confrim New Password" 
                                                            onChangeText = {(e) => setConfirmPassword(e)} 
                                                            value ={confirmPassword}
                                                            backgroundColor='white'
                                                            secureTextEntry={true} 
                                                            textContentType='password'
                                                            keyboardType = 'default'
                                                />
                                                <TouchableOpacity onPress={confirmPassord}>
                                                    <View style={styles.button}>
                                                        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', alignSelf: 'center' }}>
                                                            Confirm Password
                                                            <Icon name="chevron-up" size={15} color="white" />
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={modalHandler} >
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

export default PasswordResetScene;