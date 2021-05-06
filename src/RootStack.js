import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../src/screen/Login';
import Register from '../src/screen/Register';
import Splash from '../src/screen/Splash';
import InputLocation from '../src/screen/InputLocation';
import Question from './screen/Question';
import FreeTimeQuestion from './screen/FreeTimeQuestion';
import AlwaysDoQuestion from './screen/AlwaysDoQuestion';
import ConfirmAvatar from './screen/ConfirmAvatar';
import FilterFeed from './screen/FilterFeed';
import MainTab from './screen/MainTab';
import StatusDetails from './screen/StatusDetails';
import Messages from './screen/Messages';
import Chat from './screen/Chat';

const Stack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <Stack.Navigator headerMode="none" initialRouteName="Splas">
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="InputLocation" component={InputLocation} />
    <Stack.Screen name="Question" component={Question} />
    <Stack.Screen name="FreeTimeQuestion" component={FreeTimeQuestion} />
    <Stack.Screen name="AlwaysDoQuestion" component={AlwaysDoQuestion} />
    <Stack.Screen name="ConfirmAvatar" component={ConfirmAvatar} />
    <Stack.Screen name="FilterFeed" component={FilterFeed} />
    <Stack.Screen name="StatusDetails" component={StatusDetails} />
    <Stack.Screen name="Messages" component={Messages} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

export default RootStackScreen;
