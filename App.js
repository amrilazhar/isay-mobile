import React from 'react';
import type {Node} from 'react';

// Navigation
import {NavigationContainer} from '@react-navigation/native';

// Screen
import RootStackScreen from './src/RootStack';

//Store
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
