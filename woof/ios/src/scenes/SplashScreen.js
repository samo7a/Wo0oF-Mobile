import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const logo = require('../images/logo.png');
const SplashScreen = () => {
    return (
        <LinearGradient colors={['#8D99AE','#EDF2F4']} style={styles.container}>
            <View style={styles.view}>
                <Image source={logo} style={styles.logo}></Image>
            </View>
        </LinearGradient>
    );
}
 
 const styles = StyleSheet.create({
   container: {
     height: '100%',
     width: '100%',
   },
   view: {
     flex : 1,
     justifyContent: 'center',
     alignItems : 'center',
   },
   logo: {
     height: 100,
     width: 100,
   },
 });
 
 export default SplashScreen; 