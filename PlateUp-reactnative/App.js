import React from "react";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import mockHTTP from "./mock-http";
import store from "./redux/store";
import { Provider } from 'react-redux'

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { argonTheme } from "./constants";

export default () => {

  // Uncomment below line if you want to use stub data when running the application
  // mockHTTP();
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
