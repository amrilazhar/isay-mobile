import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View} from 'react-native';
import CardStatusDetails from '../components/common/CardStatusDetails';
import {getStatusDetailsAction} from '../redux/action/Action';
import {useDispatch, useSelector} from 'react-redux';

const StatusDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {statusId} = route.params;

  // const comments = useSelector(state => state.user.allComments);

  useEffect(() => {
    dispatch(getStatusDetailsAction(statusId));
  }, []);

  return (
    <View style={styles.container}>
      <CardStatusDetails statusId={statusId} navigation={navigation} />
    </View>
  );
};

export default StatusDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
