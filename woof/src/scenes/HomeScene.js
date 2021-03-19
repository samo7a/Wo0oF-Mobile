import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { useHistory } from "react-router-native";


const HomeScene = () => {
    let history = useHistory();
    return (
        <View >
            <Text style={styles.container} >
                Home Page
            </Text>
            <Button title="Login" onPress={ () => history.push("/login")} /> 
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
export default HomeScene;