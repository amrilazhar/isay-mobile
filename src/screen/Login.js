import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/common/CustomButton';
import CustomTextInput from '../components/common/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {getStatusByUserInterestAction} from '../redux/action/Action';
import {firebase} from '@react-native-firebase/messaging';
import jwt_decode from 'jwt-decode';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('riwan75@gmail.com');
  // const [email, setEmail] = useState('lisanewell76@gmail.com');
  // const [email, setEmail] = useState('amrilazhar@gmail.com');
  const [password, setPassword] = useState('Aneh1234!!');
  // const [email, setEmail] = useState('user2@glintsmail.com');

  const handleLogin = async () => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: 'https://isay.gabatch11.my.id/user/login',
        data: {
          email,
          password,
        },
        headers: {
          'content-type': 'application/json',
        },
      });

      AsyncStorage.setItem('accessToken', data.data.token);
      let decodedToken = jwt_decode(data.data.token);
      if (decodedToken.profile !== null) {
        await firebase
          .messaging()
          .subscribeToTopic(`chat-${decodedToken.profile}`.toString());
        await firebase
          .messaging()
          .subscribeToTopic(`notif-${decodedToken.profile}`.toString());
      }
      try {
        const response = await axios({
          method: 'GET',
          url: `https://isay.gabatch11.my.id/user/status_profile/${data.data.id}`,
          headers: {
            Authorization: 'Bearer ' + data.data.token,
          },
        });
        dispatch(getStatusByUserInterestAction());
        navigation.navigate('MainTab');
      } catch (error) {
        navigation.navigate('Question');
      }
    } catch (error) {
      if (error.response !== undefined) {
        if (error.response.status === 422) {
          alert('Your email or password is wrong');
        } else if (error.response.status === 401) {
          alert('Please verify your email first');
        }
      } else {
        console.log(error);
        alert('Network Error, Please Check Your Connection');
      }
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
        <Text style={styles.password}>Password</Text>
        <CustomTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <View style={styles.container1}>
          <CustomButton title="Login" onPressButton={() => handleLogin()} />
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

//
