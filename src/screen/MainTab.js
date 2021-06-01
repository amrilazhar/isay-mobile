import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import NavigationContainer from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {color} from '../styles/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import socketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

//Bottom Tab
import Home from './Home';
import Account from './MyProfile';
import Notifications from './Notification';
import Messages from './Messages';
import Post from './Post';

const ENDPOINT = 'https://isay.gabatch11.my.id/';
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  useEffect(() => {
    const io = socketIOClient(ENDPOINT, {
      transports: ['websocket'],
      path: '/socket',
      upgrade: false,
    });
    // emit that user online

    AsyncStorage.getItem('accessToken').then(token => {
      let decodedToken = jwt_decode(token);
      io.emit('online:' + decodedToken.profile, true);
    });

    return () => {
      AsyncStorage.getItem('accessToken').then(token => {
        let decodedToken = jwt_decode(token);
        io.emit('online:' + decodedToken.profile, false);
      });
    };
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        initialRouteName: 'Home',
        activeTintColor: color.blue2,
        keyboardHidesTabBar: true,
        style: {position: 'absolute', height: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="pluscircle" color={'#8A62FB'} size={45} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Acount"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MyTabs;
