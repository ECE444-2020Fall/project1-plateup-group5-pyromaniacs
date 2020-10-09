import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Block, Text } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

import { Button, Icon, Input } from "../components";
import { argonTheme, Images } from "../constants";

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {
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
        <Block flex middle>
          <Block style={styles.loginContainer}>
            <Block height={50} middle style={styles.header}>
              <Text size={12} color={argonTheme.COLORS.TEXT_COLOR}>
                Welcome back to Plate Up! Please log in.
              </Text>
            </Block>
            <Block flex>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block
                    width={width * 0.8}
                    style={{ marginBottom: 10, marginTop: 10 }}
                  >
                    <Input
                      borderless
                      placeholder="Email"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                    <Input
                      password
                      borderless
                      placeholder="Password"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block middle style={{ marginTop: 10 }}>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={() => navigation.navigate("App")}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Login
                      </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
          <Image source={Images.PlateUpName} style={styles.nameImage} />
        </Block>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createButton: {
    width: width * 0.5,
  },
  header: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  inputIcons: {
    marginRight: 12,
  },
  nameImage: {
    position: "absolute",
    bottom: height * 0.0677,
    width: width * 0.725,
    height: width * 0.725 * (43 / 272),
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  loginContainer: {
    width: width * 0.9,
    height: height * 0.35,
    backgroundColor: argonTheme.COLORS.GREY,
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
});

export default Login;
