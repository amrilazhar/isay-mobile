import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getMyProfileAction} from '../redux/action/Action';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import TopTabNavigator from '../components/common/TopTabNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {color} from '../styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyProfile = props => {
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.user.myProfile);

  const logout = async () => {
    try {
      props.navigation.navigate('Splash', {logout: true});
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}>
          <MaterialIcons name="logout" size={28} color={color.white} />
        </TouchableOpacity>
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
      <TopTabNavigator />
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
  logout: {
    color: color.white,
    fontSize: 16,
    marginRight: 6,
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
