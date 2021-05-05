import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {color} from '../../styles/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchLocation = props => {
  return (
    <View style={styles.container}>
      <Ionicons style={styles.ionicons} name="location" size={25} />
      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        {...props}
        placeholder={"Types a city's name"}
      />
    </View>
  );
};
export default SearchLocation;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    borderWidth: 1,
    borderColor: color.grey2,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: color.white,
    marginVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    color: 'white',
    color: color.black,
    paddingLeft: 10,
  },
  ionicons: {
    color: color.grey2,
  },
});
