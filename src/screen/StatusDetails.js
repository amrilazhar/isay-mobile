import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardStatusDetails from '../components/common/CardStatusDetails';

const StatusDetails = () => {
  return (
    <View style={styles.container}>
      <CardStatusDetails
        name={'Alfredo'}
        status={"we didnt start the fire,it's already burn from the beginning"}
      />
    </View>
  );
};

export default StatusDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
