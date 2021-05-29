import React from 'react';
import {StyleSheet, TextInput, View, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {color} from '../../styles/color';

const Search = ({navigation}) => {
  // const goBack = () => {
  // navigation();
  // };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/Avatar.png')}
      />
      <View style={styles.container1}>
        <Ionicons style={styles.ionicons} name="search" size={25} />
        <TextInput
          style={styles.input}
          placeholderTextColor={color.grey1}
          placeholder={'Search annonymous'}
        />
      </View>
      <MaterialIcons
        onPress={() => navigation.navigate('FilterFeed')}
        name="filter-tilt-shift"
        size={30}
        color={color.white}
      />
    </View>
  );
};
export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: color.blue2,
    height: 70,
  },
  container1: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: color.grey2,
    borderRadius: 5,
    backgroundColor: color.white,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  input: {
    color: 'white',
    color: color.black,
    paddingLeft: 10,
    width: '72%',
  },
  ionicons: {
    color: color.grey1,
  },
  tinyLogo: {
    height: 40,
    width: 40,
  },
});
