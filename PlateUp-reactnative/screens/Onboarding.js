import React from "react";
import { Image, StyleSheet, StatusBar, Dimensions } from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <LinearGradient
        style={styles.container}
        colors={[
          argonTheme.COLORS.GRADIENT_START,
          argonTheme.COLORS.GRADIENT_END,
        ]}
      >
        <StatusBar hidden />
        <Block center style={styles.logoContainer}>
          <Image source={Images.PlateUpLogo} style={styles.logoImage} />
          <Image source={Images.PlateUpName} style={styles.nameImage} />
        </Block>
        <Block center style={styles.inputContainer}>
          <Button
            style={styles.button}
            color={argonTheme.COLORS.SECONDARY}
            onPress={() => navigation.navigate("Registration")}
            textStyle={{ color: argonTheme.COLORS.BLACK }}
          >
            Get Started
          </Button>
          <Text style={styles.text} color={argonTheme.COLORS.TEXT_COLOR}>
            Already have an account?{" "}
            <Text
              style={styles.bold}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </Block>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    color: argonTheme.COLORS.BLUE,
    fontWeight: argonTheme.COLORS.LIGHT_BOLD,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginBottom: height * 0.0185,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: height * 0.06,
  },
  logoImage: {
    width: width * 0.725,
    height: width * 0.725 * (201 / 279),
  },
  logoContainer: {
    position: "absolute",
    width: "100%",
    top: height * 0.2648,
    left: 0,
  },
  nameImage: {
    marginTop: height * 0.0677,
    width: width * 0.725,
    height: width * 0.725 * (43 / 272),
  },
  text: {
    fontSize: 14,
    lineHeight: 19,
  },
});

export default Onboarding;
