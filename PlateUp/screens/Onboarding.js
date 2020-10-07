import React from "react";
import { Image, StyleSheet, StatusBar, Dimensions } from "react-native";
import { Block, Button, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <LinearGradient style={styles.container} colors={["#EB5757", "#F2994A"]}>
        <StatusBar hidden />
        <Block center style={styles.logoContainer}>
          <Image source={Images.PlateUpLogo} style={styles.logoImage} />
          <Image source={Images.PlateUpName} style={styles.nameImage} />
        </Block>
        <Block style={styles.padded}>
          <Block center>
            <Button
              style={styles.button}
              color={argonTheme.COLORS.SECONDARY}
              onPress={() => navigation.navigate("App")}
              textStyle={{ color: argonTheme.COLORS.BLACK }}
            >
              Get Started
            </Button>
          </Block>
        </Block>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logoImage: {
    width: width * 0.725,
    height: width * 0.725 * (201 / 279),
  },
  logoContainer: {
    position: "absolute",
    width: "100%",
    top: height * 0.3,
    left: 0,
  },
  nameImage: {
    marginTop: height * 0.0677,
    width: width * 0.725,
    height: width * 0.725 * (43 / 272),
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
  },
});

export default Onboarding;
