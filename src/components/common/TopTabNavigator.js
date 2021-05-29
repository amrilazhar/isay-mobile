import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {color} from '../../styles/color';
import Profile from '../../screen/Profile';
import PostHistory from '../../screen/PostHistory';
import Activities from '../../screen/Activities';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor: color.blue2,
        labelStyle: {fontSize: 13, fontWeight: 'bold'},
        style: {backgroundColor: color.grey3},
      }}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarLabel: 'Profile'}}
      />
      <Tab.Screen
        name="Post"
        component={PostHistory}
        options={{tabBarLabel: 'Post'}}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{tabBarLabel: 'Activities'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;

const styles = StyleSheet.create({});
