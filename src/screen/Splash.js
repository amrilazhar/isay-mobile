import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      cekToken();
    }, 2000);
  }, []);

  const cekToken = async () => {
    navigation.navigate('Login');
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
