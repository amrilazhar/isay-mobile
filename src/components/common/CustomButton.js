import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {color} from '../../styles/color';

const CustomButton = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPressButton}>
    <Text style={styles.title}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height: 50,
    backgroundColor: color.blue2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    color: color.white,
  },
});

export default CustomButton;
