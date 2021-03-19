import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';
import { useHistory } from "react-router-native";


const LoginScene = () => {
    let history = useHistory();
    return (
        <View >
            <Text  style={styles.container}>
                Login Page
            </Text>
            <Button title="Home" onPress={ () => history.push("/home")} /> 
            <Button title="Signup" onPress={ () => history.push("/signup")} /> 
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        padding : 20,
        margin : 20,
        flex: 1,
        backgroundColor: 'black',
        color : 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default LoginScene; 