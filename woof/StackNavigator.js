import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Homescene from './src/scenes/HomeScene';
import LoginScene from './src/scenes/LoginScene';
import SplashScene from './src/scenes/SplashScreen';
import SignupScene from './src/scenes/SignupScene';

const screens = {
    splash: {
        screen : SplashScene
    },
    home: {
        screen : Homescene
    },
    login: {
        screen : LoginScene
    },
    signup: {
        screen : SignupScene
    },
}
const StackNavigator = createStackNavigator(screens);
export default createAppContainer(StackNavigator);