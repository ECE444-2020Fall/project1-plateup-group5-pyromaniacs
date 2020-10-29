import { LinearGradient } from 'expo-linear-gradient';
import { Block, Text } from 'galio-framework';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { toast } from '../constants/utils';
import { argonTheme, Images } from '../constants';
import { Button, Icon, Input } from '../components';
import { login, LOGIN_IPR, IDLE } from '../redux/features/user_settings';

const { width, height } = Dimensions.get('screen');

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    keyboardIsOpen: false,
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => this.setState({ keyboardIsOpen: true })
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => this.setState({ keyboardIsOpen: false })
    );
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userSettings.status === LOGIN_IPR && this.props.userSettings.status === IDLE) {
      if (this.props.userSettings.error) {
        toast(this.props.userSettings.error);
      } else {
        this.props.navigation.navigate('App');
      }
    }
  }

  handleLogin = () => {
    // Don't try to log in if some information is missing
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      toast('Please fill in all fields.');
      return;
    }
    this.props.login({ ...this.state });
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
                    iconContent={(
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="ic_mail_24px"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    )}
                    onChangeText={(email) => this.setState({ email })}
                  />
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    password
                    borderless
                    placeholder="Password"
                    iconContent={(
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    )}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </Block>
                { this.props.userSettings.status == LOGIN_IPR
                  ?
                  <Block style={styles.loading}>
                    <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                  </Block>
                  :
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
                }
              </KeyboardAvoidingView>
            </Block>
          </Block>
        </Block>
        { !this.state.keyboardIsOpen &&
          <Block style={styles.imageContainer}>
            <Image source={Images.PlateUpName} style={styles.nameImage} />
          </Block>
        }
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
    borderColor: '#8898AA',
  },
  inputIcons: {
    marginRight: 12,
  },
  nameImage: {
    resizeMode: "contain",
    aspectRatio: 2.2,
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
    overflow: 'hidden',
  },
  loading: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1
  },
  imageContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 0.1,
    paddingBottom: 15
  }
});

const mapStateToProps = (state) => ({
  userSettings: state.userSettings
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
