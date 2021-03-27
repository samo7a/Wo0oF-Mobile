import React, {useState, useEffect} from 'react';
import { StyleSheet, View} from 'react-native';

import SplashScene from './SplashScreen';
import LoginScene from './LoginScene';


const WelcomeScene = () => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        setTimeout(() =>{
            setIsVisible(false);
        }, 2000); 
    }, []);
    return (
        <View>
            {isVisible ? <SplashScene /> : <LoginScene />} 
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

  export default WelcomeScene;