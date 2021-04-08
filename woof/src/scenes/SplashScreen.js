import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, ActivityIndicator, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen1 from 'react-native-splash-screen'

const logo = require('../images/logo.png');

const SplashScreen = () => {
  const [logoAnime] = useState(new Animated.Value(0));
  const [spinner] = useState (new Animated.Value(0));

  useEffect(() => {
    SplashScreen1.hide();
    Animated.parallel([
      Animated.spring(logoAnime, {
        toValue : 1,
        tension : 10,
        friction : 2,
        duration : 1000,
        useNativeDriver: false
      }).start(),
      Animated.timing(spinner, {
        toValue : 1,
        duration : 12000,
        useNativeDriver : false,
      })
    ]).start()
  }, []);
    return (
        <LinearGradient colors={['#8D99AE','#EDF2F4']} style={styles.container}>
          <View style={styles.container2}>
            <Animated.View style={{
              opacity : logoAnime,
              top : logoAnime.interpolate({
                inputRange : [0, 1],
                outputRange : [80, 0]
              })
            }}
            >
              <Image source={logo} style={styles.logo}></Image>
            </Animated.View>
            
            <View style={styles.spinner}>
              <ActivityIndicator color="#EF233C" size="large"/>
            </View>
            </View>
        </LinearGradient> 
    );
}
 
 const styles = StyleSheet.create({
   container: {
     height: '100%',
     width: '100%',
   },
   container2: {
     flex : 1,
     justifyContent: 'center',
     alignItems : 'center',
   },
   logo: {
     height: 100,
     width: 100,
   },
   spinner : {
    margin : 100,
    justifyContent: 'center',
    alignItems : "stretch",
   }
 });
 
 export default SplashScreen; 