import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {color} from '../../styles/color';

const CustomTextInput = props => {
  return (
    <View style={styles.container}>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={styles.input}
        placeholderTextColor={color.grey2}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.grey2,
    marginBottom: 15,
    width: '90%',
    color: color.black,
    paddingLeft: 15,
  },
});
