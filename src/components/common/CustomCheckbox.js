import React, {useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {color} from '../../styles/color';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CustomCheckbox = props => {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={18}
        fillColor="#61DB99"
        unfillColor="#FFFFFF"
        text={props.title}
        iconStyle={{borderColor: color.black, borderRadius: 2}}
        textStyle={{
          fontFamily: 'JosefinSans-Regular',
          textDecorationLine: 'none',
          color: color.black,
          marginLeft: 1,
        }}
        onPress={() => {}}
      />
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
});
