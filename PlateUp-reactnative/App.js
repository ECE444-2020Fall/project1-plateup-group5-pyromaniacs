import { Block, GalioProvider } from 'galio-framework';
import React from 'react';
import { Provider } from 'react-redux';
// Nothing wrong with this import, works as expected
// eslint-disable-next-line import/no-unresolved
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import store from './redux/store';
import Screens from './navigation/Screens';
import mockHTTP from './mock-http';
import { argonTheme } from './constants';

// Before rendering any navigation stack
enableScreens();

export default () => {
  // Set value to true if you want to use mock data
  const mockData = false;

  if (mockData) {
    mockHTTP();
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <GalioProvider theme={argonTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    </Provider>
  );
};
