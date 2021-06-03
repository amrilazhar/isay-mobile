import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAnotherHistoryPostAction,
  getAnotherProfileAction,
  getAnotherUserActivityAction,
  getStatusByUserInterestAction,
} from '../redux/action/Action';
import {color} from '../styles/color';
import TabUserProfile from './TabUserProfile';

const UserProfile = ({route, navigation}) => {
  const {userId} = route.params;
  const dispatch = useDispatch();
  const anotherProfile = useSelector(state => state.user.anotherProfile);
  const bio = anotherProfile?.bio;
  const anotherUserActivity = useSelector(state => state.user.anotherUserActivity);

  useEffect(() => {
    dispatch(getAnotherProfileAction(userId));
    dispatch(getAnotherHistoryPostAction(userId));
    dispatch(getAnotherUserActivityAction(userId));
  }, [userId]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch(getStatusByUserInterestAction());
            navigation.navigate('MainTab');
          }}>
          <Ionicons name="chevron-back" size={25} color={color.white} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={styles.background}
          source={require('../assets/Square1.png')}
        />
        <Image
          style={styles.avatar}
          source={{
            uri: `${anotherProfile.avatar}`,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.textName}>{anotherProfile.name}</Text>
        {/* <TouchableOpacity style={styles.message}>
          <Text style={{color: color.white}}>Message</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{flexDirection: 'row', marginLeft: 105}}>
        <Ionicons name="location" size={20} color={color.black} />
        <Text style={styles.location}>{anotherProfile?.location?.city}</Text>
      </View>
      <TabUserProfile />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: color.blue2,
    height: 55,
  },
  background: {
    height: 120,
  },
  avatar: {
    height: 75,
    width: 75,
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
    // marginBottom: 30,
  },
  message: {
    height: 33,
    backgroundColor: color.blue2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    margin: 5,
  },
});
