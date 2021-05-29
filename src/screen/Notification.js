import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../styles/color';
import NotificationCard from '../components/common/NotificationCard';

const Notification = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back-ios" size={25} color={color.white} />
        <Text style={styles.textHeader}>Notification</Text>
      </View>
      <NotificationCard />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: color.blue2,
    height: 55,
  },
  textHeader: {
    color: color.white,
    fontSize: 18,
    marginLeft: 110,
  },
});
