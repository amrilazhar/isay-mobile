import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import SearchLocation from '../components/common/SearchLocation';
import CustomButton from '../components/common/CustomButton';
import {color} from '../styles/color';

const InputLocation = () => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View View style={styles.container}>
        <Text style={styles.welcome}>Welcome to i-Say</Text>
        <View style={styles.container1}>
          <Image style={styles.logo} source={require('../assets/Logo.png')} />
          <Text style={styles.text1}>
            Everyone deserves to be heard, now it’s your time
          </Text>
          <Text style={styles.text2}> Where is the city you live in? </Text>
          <Text style={styles.text1}> Let them find your great thoughts</Text>
        </View>
        <SearchLocation />
        <View style={styles.button}>
          <CustomButton title="Next" />
        </View>
      </View>
    </ScrollView>
  );
};

export default InputLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container1: {
    alignItems: 'center',
  },

  welcome: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 20,
  },
  text1: {
    fontSize: 21,
    textAlign: 'center',
    color: color.grey4,
  },
  text2: {
    marginTop: 70,
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: color.black,
  },
  logo: {
    width: 90,
    height: 90,
    marginVertical: 30,
  },
  button: {
    flex: 1,
    marginBottom: 30,
    justifyContent: 'flex-end',
  },
});
