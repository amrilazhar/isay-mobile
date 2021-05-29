import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CustomPersonalButton from '../components/common/CustomPersonalButton';
import {color} from '../styles/color';

const Profile = () => {
  return (
    <View style={{flex: 1, padding: 12}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.bio}>Bio</Text>
        <Feather name="edit" size={25} color={color.black} onPress={() => {}} />
      </View>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        consectetur suspendisse et, libero id magna. Gravida eu auctor aliquet
        posuere accumsan sit et. Orci sodales turpis augue sit eu metus.
      </Text>
      <View style={styles.container1}>
        <Text style={styles.bio}>Interest Topic</Text>
        <Feather name="edit" size={25} color={color.black} onPress={() => {}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <CustomPersonalButton title="Personal" />
        <CustomPersonalButton title="Politics" />
        <CustomPersonalButton title="Sports" />
        <CustomPersonalButton title="Design" />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <CustomPersonalButton title="Tech" />
        <CustomPersonalButton title="Culture" />
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
});
