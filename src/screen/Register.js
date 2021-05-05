import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import CustomTextInput from '../components/common/CustomTextInput';

const Register = ({navigation}) => {
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
        <Text style={styles.password}>Create Password</Text>
        <CustomTextInput />
        <Text style={styles.password}>Confirm your Password</Text>
        <CustomTextInput />
        <View style={styles.container1}>
          <CustomButton title="Create an Account" />
          <View style={styles.signUp}>
            <Text>Already have an account? </Text>
            <Text
              style={styles.signupColor}
              onPress={() => navigation.navigate('Login')}>
              Log in here
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

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
    marginTop: 20,
    fontWeight: 'bold',
  },
  forgotPassword: {
    left: 20,
    marginBottom: 15,
    marginTop: 0,
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  signUp: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
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
