import React from 'react';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import mockHTTP from './mock-http';
import store from './redux/store';

// Before rendering any navigation stack

import Screens from './navigation/Screens';
import { argonTheme } from './constants';

enableScreens();

export default () =>

  // Uncomment below line if you want to use stub data when running the application
  // mockHTTP();
  (
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
