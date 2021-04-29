import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../src/screen/Login';
import Register from '../src/screen/Register';
import Splash from '../src/screen/Splash';

const Stack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <Stack.Navigator headerMode="none" initialRouteName="Splash">
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

export default RootStackScreen;
