import axios from "axios";
import { Button, Icon, Input } from "../components";
import { argonTheme, Images } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { Block, Checkbox, Text } from "galio-framework";
import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { userLoggedIn } from "../redux/actions";
import store from "../redux/store";

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
  }

  handleCreateAccount = (navigation) => {
    // Try POSTing to the server to create an account
    axios.post('http://192.168.0.18:5000/user', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(() => {
        // If successful, login with the ID returned
          axios.post('http://192.168.0.18:5000/login', {
            email: this.state.email,
            password: this.state.password
          })
          // If successful, set current user and navigate to the main app screen
          .then(res => {
            store.dispatch(userLoggedIn(
              res.data.id,
              res.data.name,
              res.data.email,
              res.data.inventory_id,
              res.data.shopping_id,
              res.data.settings_id
            ));
            navigation.navigate("App");
          })
          // TODO make this an error message in-app
          .catch(err => {
            console.log("Login failed!");
            console.log(err);
          });
      })
      // TODO make this an error message in-app
      .catch(err => {
        console.log("Account creation failed!");
        console.log(err);
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
          <Block style={styles.registerContainer}>
            <Block height={50} middle style={styles.header}>
              <Text size={12} color={argonTheme.COLORS.TEXT_COLOR}>
                Welcome to Plate Up! Please create an account.
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
                      placeholder="Name"
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={(name) => this.setState({name})}
                    />
                  </Block>
                  <Block width={width * 0.8} style={{ marginBottom: 5 }}>
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
                      onChangeText={(password) => this.setState({password})}
                    />
                    <Block row style={styles.passwordCheck}>
                      <Text size={12} color={argonTheme.COLORS.MUTED}>
                        password strength:
                      </Text>
                      <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                        {" "}
                        strong
                      </Text>
                    </Block>
                  </Block>
                  <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the "
                      />
                      <Text color={argonTheme.COLORS.PRIMARY} style={{ fontWeight: argonTheme.COLORS.LIGHT_BOLD }} size={14}>
                        Privacy Policy
                      </Text>
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={() => this.handleCreateAccount(this.props.navigation)}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        CREATE ACCOUNT
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
    marginTop: 30,
    width: width * 0.5,
  },
  header: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: argonTheme.COLORS.TEXT_COLOR,
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
    paddingBottom: 13,
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.52,
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

export default Register;
