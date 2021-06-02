import React, {useEffect, useState} from 'react';
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
import {getNotificationCount} from '../redux/action/Action';
import {useSelector, useDispatch} from 'react-redux';

//Bottom Tab
import Home from './Home';
import Account from './MyProfile';
import Notifications from './Notification';
import Messages from './Messages';
import Post from './Post';

const ENDPOINT = 'https://isay.gabatch11.my.id/';
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loadingCountNotif);
  const notifCount = useSelector(state => state.user.notifCount);
  const [notifState, setNotifState] = useState(0);
  const [chatState, setChatState] = useState(0);
  let counterChat = 0;
  let counterNotif = 0;

  const getInitialCountChat = () => {
    if (!loading) {
      return notifCount[0];
    } else return 0;
  };

  const getInitialCountNotif = () => {
    if (!loading) {
      return notifCount[1];
    } else return 0;
  };

  const tabMessageOptions = () => {
    let options = {
      tabBarLabel: 'Messages',
      tabBarIcon: ({color, size}) => (
        <Ionicons name="chatbubble-ellipses" color={color} size={size} />
      ),
    };
    if (chatState + getInitialCountChat() > 0) {
      options.tabBarBadge = chatState + getInitialCountChat();
      options.tabBarBadgeStyle = {backgroundColor: color.blue1};
    }
    return options;
  };

  const tabNotifOptions = () => {
    let options = {
      tabBarLabel: 'Notifications',
      tabBarIcon: ({color, size}) => (
        <MaterialCommunityIcons name="bell" color={color} size={size} />
      ),
    };
    if (notifState + getInitialCountNotif() > 0) {
      options.tabBarBadge = notifState + getInitialCountNotif();
      options.tabBarBadgeStyle = {backgroundColor: color.blue1};
    }
    return options;
  };

  useEffect(() => {
    if (loading) {
      dispatch(getNotificationCount());
    }
    const io = socketIOClient(ENDPOINT, {
      transports: ['websocket'],
      path: '/socket',
      upgrade: false,
    });
    // emit that user online

    AsyncStorage.getItem('accessToken').then(token => {
      let decodedToken = jwt_decode(token);
      io.emit('online:' + decodedToken.profile, true);

      io.removeAllListeners('chat:' + decodedToken.profile);
      io.on('chat:' + decodedToken.profile, data => {
        counterChat = counterChat + 1;
        setChatState(counterChat);
      });

      io.removeAllListeners('readedChat:' + decodedToken.profile);
      io.on('readedChat:' + decodedToken.profile, data => {
        counterChat = counterChat - 1;
        setChatState(counterChat);
      });

      io.removeAllListeners('notif:' + decodedToken.profile);
      io.on('notif:' + decodedToken.profile, data => {
        counterNotif = counterNotif + 1;
        setNotifState(counterNotif);
      });

      io.removeAllListeners('readedNotif:' + decodedToken.profile);
      io.on('readedNotif:' + decodedToken.profile, data => {
        counterNotif = counterNotif - 1;
        setNotifState(counterNotif);
      });
    });

    return () => {
      
      AsyncStorage.getItem('accessToken').then(token => {
        let decodedToken = jwt_decode(token);
        io.emit('online:' + decodedToken.profile, false);
        io.disconnect();
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
        options={tabMessageOptions()}
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
        options={tabNotifOptions()}
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
