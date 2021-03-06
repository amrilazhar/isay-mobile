import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {firebase} from '@react-native-firebase/messaging';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Splash = ({navigation, route}) => {
  useEffect(() => {
    let logout = false;
    if (route.params) {
      logout = true;
    }
    setTimeout(() => {
      cekToken(logout);
    }, 500);
  });

  const cekToken = async logout => {
    try {
      let token = await AsyncStorage.getItem('accessToken');
      let decodedToken = jwt_decode(token);
      if (logout) {        
        if (decodedToken.profile !== null) {
          await firebase.messaging().deleteToken();
          await firebase
            .messaging()
            .unsubscribeFromTopic(`chat-${decodedToken.profile}`.toString());
          await firebase
            .messaging()
            .unsubscribeFromTopic(`notif-${decodedToken.profile}`.toString());
        }
        await AsyncStorage.removeItem('accessToken');
        navigation.navigate('Login');
      } else {
        if (token) {
          try {
            const response = await axios({
              method: 'GET',
              url: `https://isay.gabatch11.my.id/user/status_profile/${decodedToken.id}`,
              headers: {
                Authorization: 'Bearer ' + token,
              },
            });
            navigation.navigate('MainTab');
          } catch (error) {
            console.log(error);
            navigation.navigate('Question');
          }
        } else {
          navigation.navigate('Login');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ImageBackground
      style={styles.splash}
      source={require('../assets/SplashBackround.png')}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/SplashLogo.png')}
      />
      <Image style={styles.text} source={require('../assets/SplashText.png')} />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 300,
    height: '20%',
  },
  text: {
    width: 300,
    height: 16,
  },
});
