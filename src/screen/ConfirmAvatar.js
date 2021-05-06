import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import SearchLocation from '../components/common/SearchLocation';
import CustomButton from '../components/common/CustomButton';
import {color} from '../styles/color';

const ConfirmAvatar = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Cool! We identified you as...</Text>
        <View style={styles.container1}>
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Image
              style={styles.avatar}
              source={require('../assets/Avatar.png')}
            />
          </View>
          <Text style={styles.text1}>Anpanman</Text>
          <Text style={styles.text2}>You are interested in</Text>
          <Text style={styles.text3}>You can change this later</Text>
        </View>
        <View style={styles.avatarContainer}>
          <View>
            <Image
              style={styles.avatar1}
              source={require('../assets/Sport.png')}
            />
            <Text style={styles.textAvatar}>Sport</Text>
          </View>
          <View>
            <Image
              style={styles.avatar1}
              source={require('../assets/Sport.png')}
            />
            <Text style={styles.textAvatar}>Sport</Text>
          </View>
          <View>
            <Image
              style={styles.avatar1}
              source={require('../assets/Sport.png')}
            />
            <Text style={styles.textAvatar}>Sport</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.textAvatar}>Fun fact</Text>
          <Text style={styles.text4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id nisl,
            tempor dui consequat sit egestas. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Id nisl, tempor dui consequat sit
            egestas.{' '}
          </Text>
        </View>
        <View style={styles.button}>
          <CustomButton
            title="Start"
            onPressButton={() => navigation.navigate('MainTab')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container1: {
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
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
    fontSize: 22,
    textAlign: 'center',
    color: color.black,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  textAvatar: {
    textAlign: 'center',
    color: color.black,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 20,
    textAlign: 'center',
    color: color.black,
    marginTop: 25,
  },
  text3: {
    fontSize: 15,
    textAlign: 'center',
    color: color.black,
    marginTop: 12,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatar1: {
    marginTop: 25,
    marginHorizontal: 5,
    width: 80,
    height: 80,
  },
  text4: {
    fontSize: 15,
    textAlign: 'justify',
    color: color.black,
    marginTop: 12,
    width: 300,
  },
  content: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: color.grey1,
  },
  button: {
    flex: 1,
    marginBottom: 50,
    justifyContent: 'flex-end',
  },
});
