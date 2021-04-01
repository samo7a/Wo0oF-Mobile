import React , {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';



const ChatList = ({navigation}) => {
    const [chatItem, setChatItem] = useState([
        {id: 0, name : 'Ahmed'},
        {id: 1, name : 'Anna'},
        {id: 2, name : 'Christian'},
        {id: 3, name : 'Steven'},
        {id: 4, name : 'Mathew'},
        {id: 5, name : 'Aiden'},
        {id: 6, name : 'David'},
    ])
    return (
        <SafeAreaView>
            <FlatList 
            data = {chatItem}
            renderItem = {({item}) => (
                <TouchableOpacity onPress={() => {navigation.navigate('ChatScene', item)}}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )}
            />
        </SafeAreaView>
    )
}
export default ChatList;