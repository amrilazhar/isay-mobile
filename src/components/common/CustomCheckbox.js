import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, ActivityIndicatorBase} from 'react-native';
import {color} from '../../styles/color';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CustomCheckbox = props => {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={18}
        fillColor="#61DB99"
        unfillColor="#FFFFFF"
        iconStyle={{borderColor: color.black, borderRadius: 2}}
        textStyle={{
          fontFamily: 'JosefinSans-Regular',
          textDecorationLine: 'none',
          color: color.black,
          marginLeft: 1,
        }}
        text={props.title}
        onPress={props.onPress}

        // onPress={props.onPress}
      />
    </View>
  );
};

export default CustomCheckbox;
/**
 * cek kalau isi dari activitySelected udah ada isinya, lakukan logic pertama
 *
 * otherwise, lakukan logic kedua(else)
 */

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
});
