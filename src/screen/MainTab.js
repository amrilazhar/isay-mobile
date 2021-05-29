import React from 'react';
import {Text, View} from 'react-native';
import NavigationContainer from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {color} from '../styles/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Bottom Tab
import Home from './Home';
import Account from './MyProfile';
import Notifications from './Notification';
import Messages from './Messages';
import Post from './Post';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
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
