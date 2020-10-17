import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from '../components';

const { width, height } = Dimensions.get("screen");

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image style={styles.logo} source={Images.PlateUpNameSecondary} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <DrawerCustomItem
              title="Home"
              key={0}
              navigation={navigation}
              navigationScreenName={"Home"}
              focused={state.index === 0 ? true : false}
            />
            <DrawerCustomItem
              title="Account"
              key={1}
              navigation={navigation}
              focused={state.index === 1 ? true : false}
            />
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>
              <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>DOCUMENTATION</Text>
            </Block>
            <DrawerCustomItem title="Getting Started" navigation={navigation} />
            <DrawerCustomItem title="Logout" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  },
  logo: {
    width: width * 0.5,
    height: height * 0.0366,
  },
});

export default CustomDrawerContent;
