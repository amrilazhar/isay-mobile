import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStackScreen from './src/RootStack';

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;
