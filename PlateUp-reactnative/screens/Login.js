import axios from "axios";
import { Button, Icon, Input } from "../components";
import { argonTheme, Images } from "../constants";
import env from "../env";
import { LinearGradient } from "expo-linear-gradient";
import { Block, Text } from "galio-framework";
import React from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet
} from "react-native";
import { userLoggedIn } from "../redux/actions";
import store from "../redux/store";
import * as util from "../util";

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  }

  handleLogin = () => {
    // Don't try to log in if some information is missing
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      util.toast("Please fill in all fields.");
      return;
    }

    // Try POSTing to the server to login
    axios.post(`${env.SERVER_URL}/login`, {
      email: this.state.email,
      password: this.state.password
    })
    .then(res => {
      // Set current user and navigate to the main app screen
      store.dispatch(userLoggedIn(
        res.data.id,
        res.data.name,
        res.data.email,
        res.data.inventory_id,
        res.data.shopping_id,
        res.data.settings_id
      ));
      this.props.navigation.navigate("App");
    })
    .catch(err => {
      if (err.response.status === 403) {
        util.toast("Login failed! Please confirm that the email and password are correct.");
      }
      else if (err.response.status === 500) {
        util.toast("Internal server error.")
      }
      else {
        util.toast("Unknown error occurred.")
      }
    });
  }

  render() {
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
                    style={{ marginBottom: 5, marginTop: 5 }}
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
                      onChangeText={(email) => this.setState({email})}
                    />
                  </Block>
                  <Block width={width * 0.8}>
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
                      onChangeText={(password) => this.setState({password})}
                    />
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={this.handleLogin}
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
    marginTop: 30
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
