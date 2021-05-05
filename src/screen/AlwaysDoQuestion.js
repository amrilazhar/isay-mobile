import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {color} from '../styles/color';
import CustomButton from '../components/common/CustomButton';
import CustomCheckbox from '../components/common/CustomCheckbox';

const AlwaysDoQuestion = () => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View View style={styles.container}>
        <Text style={styles.welcome}>
          Which activity do you always do in a week?
        </Text>
        <View style={styles.container1}>
          <Text style={styles.text1}>
            *Min. choose 3 activities. You can choose as much as you want
          </Text>
        </View>
        <CustomCheckbox title="Watching Movies" />
        <CustomCheckbox title="Sleep" />
        <CustomCheckbox title="Study" />
        <CustomCheckbox title="Talking with friends or family" />
        <CustomCheckbox title="Shopping" />
        <CustomCheckbox title="Cook" />
        <CustomCheckbox title="Go to the mall" />
        <CustomCheckbox title="Make music" />
        <CustomCheckbox title="Play music instruments" />
        <CustomCheckbox title="Do sports" />
        <CustomCheckbox title="Do body care/ skin care" />
        <CustomCheckbox title="Make new friends true social media" />
        <CustomCheckbox title="No free time, always work" />
        <CustomCheckbox title="Make a to do lost for tomorrow" />
        <View style={styles.button}>
          <CustomButton title="Next" />
        </View>
      </View>
    </ScrollView>
  );
};

export default AlwaysDoQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container1: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  text1: {
    fontSize: 13,
    width: '70%',
    textAlign: 'center',
    color: color.black,
    marginVertical: 5,
  },
  button: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'flex-end',
  },
});
