import React from 'react';
import {StyleSheet, Text, View } from 'react-native';


const LoginScene = () => {
    return (
        <View >
            <Text style={styles.container} >
                Login Page
            </Text>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        padding : 50,
        margin : 10,
        flex: 1,
        backgroundColor: 'black',
        color : 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default LoginScene; 