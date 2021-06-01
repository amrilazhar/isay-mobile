import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text, Image} from 'react-native';
import {color} from '../styles/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Person from '../components/common/Person';
import socketIOClient from 'socket.io-client';


const Messages = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back-ios" size={25} color={color.white} />
        <View style={styles.container1}>
          <Ionicons style={styles.ionicons} name="search" size={25} />
          <TextInput
            style={styles.input}
            placeholderTextColor={color.grey1}
            placeholder={'Search annonymous'}
          />
        </View>
        <Entypo name="dots-three-horizontal" size={25} color={color.white} />
      </View>

      <Person navigation={navigation} />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.blue2,
    height: 65,
    padding: 10,
  },
  container1: {
    borderWidth: 1,
    borderColor: color.grey2,
    borderRadius: 5,
    backgroundColor: color.white,
    alignItems: 'center',
    flexDirection: 'row',
  },

  ionicons: {
    color: color.grey1,
  },
  input: {
    color: 'white',
    color: color.black,
    paddingLeft: 10,
    width: '72%',
  },
});
