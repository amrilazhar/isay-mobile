import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getMyProfileAction} from '../redux/action/Action';
import {StyleSheet, Text, View, Image} from 'react-native';
import TopTabNavigator from '../components/common/TopTabNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../styles/color';

const MyProfile = () => {
const dispatch = useDispatch();
const myProfile = useSelector(state => state.user.myProfile);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Ionicons name="settings" size={25} color={color.white} />
      </View>
      <View>
        <Image
          style={styles.background}
          source={require('../assets/Square.png')}
        />
        <Image
          style={styles.avatar}
          source={{
            uri: `${myProfile.avatar}`,
          }}
        />
      </View>
      <Text style={styles.textName}>{myProfile?.name}</Text>
      <View style={{flexDirection: 'row', marginLeft: 105}}>
        <Ionicons name="location" size={20} color={color.black} />
        <Text style={styles.location}>{myProfile?.location?.province}</Text>
      </View>
      <TopTabNavigator/>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: color.blue1,
    height: 55,
  },
  background: {
    height: 120,
  },
  avatar: {
    height: 80,
    width: 80,
    marginLeft: 20,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: color.white,
    top: 90,
    position: 'absolute',
  },
  textName: {
    marginLeft: 110,
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 17,
  },
  location: {
    marginLeft: 7,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
