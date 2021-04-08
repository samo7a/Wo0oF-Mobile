import React, {useState, useEffect} from 'react';
import { StyleSheet, View} from 'react-native';

import SplashScene from './SplashScreen';
import LoginScene from './LoginScene';
import HomeAdaptor from './adaptor/HomeSceneAdaptor';
import HomeOwner from './owner/HomeSceneOwner';
import storage from '../utilities/TokenStorage';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';


const WelcomeScene = () => {
    const history = useHistory();
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {
        setTimeout(()=> {
            setIsVisible(false);
        }, 2795);
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