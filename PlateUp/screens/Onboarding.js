import React from "react";
import { Image, StyleSheet, StatusBar, Dimensions, Text } from "react-native";
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
        <Block style={styles.logoContainer}>
          <Image source={Images.PlateUpLogo} style={styles.logoImage} />
          <Image source={Images.PlateUpName} style={styles.nameImage} />
        </Block>
        <Block style={styles.inputContainer}>
          <Button
            style={styles.button}
            color={argonTheme.COLORS.SECONDARY}
            onPress={() => navigation.navigate("Register")}
            textStyle={{ color: argonTheme.COLORS.BLACK }}
          >
            Get Started
          </Button>
          <Text style={styles.text}>
            <Text
              style={[styles.text, styles.bold]}
              onPress={() => navigation.navigate("App")}
            >
              Login instead{" "}
            </Text>
            if you have an account
          </Text>
        </Block>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    color: "#225AA6",
    fontWeight: "bold",
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
    alignItems: "center",
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: height * 0.06,
  },
  logoImage: {
    width: width * 0.725,
    height: width * 0.725 * (201 / 279),
  },
  logoContainer: {
    alignItems: "center",
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
