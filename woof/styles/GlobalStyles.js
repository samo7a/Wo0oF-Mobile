import {StyleSheet} from 'react-native';


const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignContent: 'space-between',
        padding : 5,
    },
    logo : {
        alignSelf : 'center',
        width : 60,
        height : 60,
    },

    form : {
        padding : 5,
        height : '100%',
        flexDirection : 'column',
        alignItems : 'center',    
    },
    
    text : {
        color : 'black',
        alignSelf : 'center',
        fontSize : 15,
        fontWeight : '500',
    },
    input: {
        width: 300,
        height : 10,
        margin : 1,
        borderRadius : 10,
        alignSelf : 'center',
        justifyContent : 'flex-start'
      },
    
    inputText : {
        borderWidth: 1,
        borderColor: '#2B2D42',
        borderStyle : 'solid',
        padding : 10,
        fontSize: 18,
        borderRadius : 6,
        height: 40,
        width: '75%',
        margin: 10,
        fontWeight : '600',
        alignSelf : 'center',
    },
    inputText2 : {
        borderWidth: 1,
        borderColor: '#2B2D42',
        borderStyle : 'solid',
        padding : 10,
        fontSize: 18,
        borderRadius : 6,
        height: 40,
        width: '90%',
        margin: 10,
        fontWeight : '600',
        alignSelf : 'center',
    },
    inputbio : {
        borderWidth: 1,
        borderColor: '#2B2D42',
        borderStyle : 'solid',
        padding : 10,
        fontSize: 18,
        borderRadius : 6,
        height: 90,
        width: '75%',
        margin: 10,
        fontWeight : '600',
        alignSelf : 'center',
        //textAlignVertical : 'top'
    },
    checkbox : {
        alignSelf : 'center',
        padding : 10,
        margin : 15,
    },

    secondaryButton : {
        borderRadius : 8,
        alignSelf: 'center',
        backgroundColor : "#2B2D42",
        width : 200,
        height : 25,
        margin : 15,
    },
    primaryButton : {
        borderRadius : 8,
        alignSelf: 'center',
        backgroundColor : "#EF233C",
        width : 200,
        height : 25,
        margin : 15,
    },
    button : {
        borderRadius : 8,
        alignSelf: 'center',
        backgroundColor : "#EF233C",
        width : 200,
        height : 25,
        margin : 10,
    },
    link : {
        color : 'blue',
        alignSelf : 'center',
        fontSize : 15,
        fontWeight : '400',
        marginTop : 10,
        textDecorationLine: 'underline',
    },
    modal : {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding : 10,
        backgroundColor: '#000000aa',
    },
    modal2 : {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding : 10,
    },

    innerModal : {
        margin: 50,
        padding: 25,
        borderRadius : 10,
        backgroundColor: '#EDF2F4',
        height : 300,
    },
    photo : {
        height: 150,
        width : 150,
        borderRadius : 75,
        alignSelf : 'center',
        justifyContent : 'space-evenly',

        
    }
});
export default GlobalStyles;

