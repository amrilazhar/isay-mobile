import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Keyboard,
} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import CustomTextInput from '../components/common/CustomTextInput';

const Login = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={{alignItems: 'center', marginVertical: 70}}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/isaylogo.png')}
          />
        </View>
        <Text style={styles.email}>E-mail</Text>
        <CustomTextInput />
        <Text style={styles.password}>Password</Text>
        <CustomTextInput />
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <View style={styles.container1}>
          <CustomButton title="Login" />
          <View style={styles.signUp}>
            <Text>Haven't an account yet? </Text>
            <Text
              style={styles.signupColor}
              onPress={() => navigation.navigate('Register')}>
              Sign up here
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  email: {
    left: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  password: {
    left: 20,
    marginBottom: 15,
    marginTop: 30,
    fontWeight: 'bold',
  },
  forgotPassword: {
    left: 20,
    marginBottom: 15,
    marginTop: 0,
  },
  container1: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  signUp: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 25,
  },
  signupColor: {
    color: '#4781F8',
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 170,
    height: 70,
  },
});
