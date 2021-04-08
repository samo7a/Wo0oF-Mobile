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
    const [token, setToken] = useState(null);
    useEffect(() => {
        async function getToken() {
            await storage.load().then(data => setToken(data)).catch(e => console.log.error);
            if (token !== null){
                let obj = jwt_decode(token, {complete:true});
                console.log(obj);
                if (obj.isOwner){
                    history.push('/ownerHome')
                }
                else {
                    history.push('/adaptorHome');
                }
            } else {
                setIsVisible(false);
            }
        }
        getToken();
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