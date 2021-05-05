import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {color} from '../../styles/color';

const CustomPersonalButton = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPressButton}>
    <Text style={styles.title}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 33,
    backgroundColor: color.blue1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  title: {
    fontSize: 14,
    color: color.white,
  },
});

export default CustomPersonalButton;
