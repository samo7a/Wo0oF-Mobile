import React , {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import styles from '../../../styles/GlobalStyles';



const ChatList = ({navigation}) => {
    const [chatItem, setChatItem] = useState([
        {id: 0, name : 'Ahmed', avatar: 'https://placeimg.com/140/140/any',},
        {id: 1, name : 'Anna', avatar: 'https://placeimg.com/140/140/any',},
        {id: 2, name : 'Christian', avatar: 'https://placeimg.com/140/140/any',},
        {id: 3, name : 'Steven', avatar: 'https://placeimg.com/140/140/any',},
        {id: 4, name : 'Mathew', avatar: 'https://placeimg.com/140/140/any',},
        {id: 5, name : 'Aiden', avatar: 'https://placeimg.com/140/140/any',},
        {id: 6, name : 'David', avatar: 'https://placeimg.com/140/140/any',},
    ])
    const Item = ({ name, avatar}) => (
        <View style={styles.chatItem}>
            <Image source={{uri: avatar}} />
          <Text style={styles.title}>{name}</Text>
        </View>
      );
    return (
        <SafeAreaView>
            <FlatList 
            data = {chatItem}
            renderItem = {({item}) => (
                <TouchableOpacity onPress={() => {navigation.navigate('ChatScene', item)}}>
                    <Item name={item.name}  avatar={item.avatar}/>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}
export default ChatList;