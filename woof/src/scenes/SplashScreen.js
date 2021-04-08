import React, {useEffect} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen1 from 'react-native-splash-screen'

const logo = require('../images/logo.png');

const SplashScreen = () => {
  useEffect(() => {
    SplashScreen1.hide();
  }, [])
    return (
        <LinearGradient colors={['#8D99AE','#EDF2F4']} style={styles.container}>
            <View style={styles.view}>
                <Image source={logo} style={styles.logo}></Image>
            </View>
            <View style={styles.spinner}>
              <ActivityIndicator color="#EF233C" size="large"/>
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
     flex : 3,
     justifyContent: 'center',
     alignItems : 'center',
   },
   logo: {
     height: 100,
     width: 100,
   },
   spinner : {
    flex : 2,
    justifyContent: 'center',
    alignItems : "stretch",
   }
 });
 
 export default SplashScreen; 