import { argonTheme } from './constants';
import { Block, GalioProvider } from 'galio-framework';
import mockHTTP from './mock-http';
import Screens from './navigation/Screens';
import React from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';

// Before rendering any navigation stack
enableScreens();

export default () => {
  // Uncomment below line if you want to use stub data when running the application
  mockHTTP();
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
}