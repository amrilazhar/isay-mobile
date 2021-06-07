import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/common/CustomButton';
import CustomTextInput from '../components/common/CustomTextInput';

const Register = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleRegister = async () => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: 'https://isay.gabatch11.my.id/user/signup',
        data: {
          email,
          password,
          confirmPassword,
        },
      });

      AsyncStorage.setItem('accessToken', data.data.token);

      setEmail('');
      setPassword('');
      setConfirmPassword('');

      alert('Check Your Email to Verify');
      navigation.navigate('Login');
    } catch (error) {
      console.log('err', error);
      alert('email or password not valid', error);
    }
  };

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
        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.password}>Create Password</Text>
        <CustomTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.password}>Confirm your Password</Text>
        <CustomTextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <View style={styles.container1}>
          <CustomButton
            title="Create an Account"
            onPressButton={() => handleRegister()}
          />
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
