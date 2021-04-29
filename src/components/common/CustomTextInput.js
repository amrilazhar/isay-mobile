import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {color} from '../../styles/color';

export default function CustomTextInput(props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.grey2,
    color: 'white',
    marginBottom: 15,
    width: '90%',
    color: color.black,
    paddingLeft: 15,
  },
});
