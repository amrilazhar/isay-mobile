import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import CustomPersonalButton from '../components/common/CustomPersonalButton';
import {getMyProfileAction} from '../redux/action/Action';
import {color} from '../styles/color';

const Profile = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.user.myProfile);
  const list = myProfile.interest;


  useEffect(() => {
    dispatch(getMyProfileAction());
  }, [myProfile]);

  const renderItem = ({item}) => {
    return <CustomPersonalButton title={item.interest} />;
  };

  return (
    <View style={{flex: 1, padding: 12}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.bio}>Bio</Text>
        <Feather name="edit" size={25} color={color.black} onPress={() => {}} />
      </View>
      <Text style={styles.bioContent}>{myProfile.bio}</Text>
      <View style={styles.container1}>
        <Text style={styles.bio}>Interest Topic</Text>
        <Feather name="edit" size={25} color={color.black} onPress={() => {}} />
      </View>
      <View>
        <FlatList
          horizontal
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  bio: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  bioContent: {
    textAlign: 'justify',
    marginHorizontal: 5,
    
  },
});
