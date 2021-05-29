import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import {color} from '../styles/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'https://isay.gabatch11.my.id';

const Chat = () => {
  const [response, setResponse] = useState('');
  console.log('response', response);

  // const socketRef = useRef();

  // useEffect(() => {
  //   socketRef.current = socketIOClient(ENDPOINT, {
  //     transports: ['websocket'],
  //     path: '/socket',
  //     upgrade: false,
  //     query: {roomID: room},
  //   });
  // }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back-ios" size={25} color={color.white} />
        <View style={styles.container1}>
          <Image
            style={styles.logo}
            source={require('../assets/Avatar1.png')}
          />
          <Text style={styles.name}>Raflesia Arnoldi</Text>
        </View>
        <Entypo name="dots-three-horizontal" size={25} color={color.white} />
      </View>
      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <View style={styles.postComment}>
          <TextInput
            style={styles.input}
            placeholderTextColor={color.grey1}
            placeholder={'Write a message'}
          />
          <MaterialCommunityIcons
            name="send-circle"
            size={40}
            color={color.blue2}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.blue2,
    height: 65,
    padding: 20,
  },
  container1: {
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },

  ionicons: {
    color: color.grey1,
  },
  input: {
    color: 'white',
    color: color.black,
    width: '85%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: color.grey2,
  },
  logo: {
    width: 45,
    height: 45,
  },
  name: {
    color: color.white,
    marginLeft: 20,
    fontSize: 18,
  },
  postComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: color.grey3,
  },
});
