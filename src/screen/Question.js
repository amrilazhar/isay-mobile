import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import CustomButton from '../components/common/CustomButton';
import {color} from '../styles/color';

const Question = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View View style={styles.container}>
        <Text style={styles.welcome}>Pour your thoughts without fear</Text>
        <View style={styles.container1}>
          <Text style={styles.text1}>
            Let’s express yourself more through Avatar!
          </Text>
          <Text style={styles.text1}>
            Don’t worry, people will only identified you through an Avatar.
          </Text>
          <View style={{alignItems: 'center', marginVertical: 50}}>
            <Image
              style={styles.avatar}
              source={require('../assets/avatarGroup.png')}
            />
          </View>
          <Text style={styles.text1}>
            You will answer a few questions that to get your Avatar. your answer
            will define the avatar you will get.
          </Text>
          <Text style={styles.textbottom}>
            Are you ready to get your Avatar?
          </Text>
        </View>
        <View style={styles.button}>
          <CustomButton
            title="Yes, get my Avatar"
            onPressButton={() => navigation.navigate('InputLocation')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Question;

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
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
  },
  textbottom: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 70,
    marginBottom: 20,
  },
  text1: {
    fontSize: 15,
    textAlign: 'center',
    color: color.black,
    marginVertical: 5,
  },

  avatar: {
    width: 230,
    height: 90,
  },
  button: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'flex-end',
  },
});
