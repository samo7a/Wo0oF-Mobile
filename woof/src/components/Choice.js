import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Choice = ({type}) => {
	
  return (
    <View style={[styles.container, {borderColor: type === 'like' ? 'green' : 'red'}]}>
      <Text style={[styles.text, {color: type === 'like' ? 'green' : 'red'}]}>{type}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
	container : {
		borderWidth : 5,
		paddingHorizontal : 15,
		borderRadius : 15,
		backgroundColor : 'rgba(0,0,0,0.2)',
		
	},
	text : {
		fontSize : 30,
		fontWeight : 'bold',
		textTransform : 'uppercase',
		letterSpacing : 4,
	}
})
export default Choice;
