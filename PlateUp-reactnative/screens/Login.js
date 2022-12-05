import { LinearGradient } from 'expo-linear-gradient';
import { Block, Text } from 'galio-framework';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { toast, height, width } from '../constants/utils';
import { argonTheme, Images } from '../constants';
import { Button, Icon, Input } from '../components';
import { login, LOGIN_IPR, IDLE } from '../redux/features/user_settings';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      keyboardIsOpen: false,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => this.setState({ keyboardIsOpen: true })
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => this.setState({ keyboardIsOpen: false })
    );
  }

  componentDidUpdate(prevProps) {
    const { userSettings, navigation } = this.props;

    if (prevProps.userSettings.status === LOGIN_IPR && userSettings.status === IDLE) {
      if (userSettings.error) {
        toast(userSettings.error);
      } else {
        navigation.navigate('App');
      }
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleLogin = () => {
    const { email, password } = this.state;
    const { login: loginRequest } = this.props;

    // Don't try to log in if some information is missing
    if (email.length === 0 || password.length === 0) {
      toast('Please fill in all fields.');
      return;
    }

    loginRequest({ email, password });
  }

  render() {
    const { userSettings } = this.props;
    const { keyboardIsOpen } = this.state;

    return (
      <LinearGradient
        style={styles.container}
        colors={[
          argonTheme.COLORS.GRADIENT_START,
          argonTheme.COLORS.GRADIENT_END,
        ]}
      >
        <StatusBar hidden />
        <KeyboardAvoidingView
          style={{ height }}
          behavior="padding"
          enabled
        >
          <Block flex middle>
            <Block style={styles.loginContainer}>
              <Block height={50} middle style={styles.header}>
                <Text size={12} color={argonTheme.COLORS.TEXT_COLOR}>
                  Welcome back to Plate Up! Please log in.
                </Text>
              </Block>
              <Block middle>
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
                <Block middle style={styles.footer}>
                  {userSettings.status === LOGIN_IPR
                    ? (
                      <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                    )
                    : (
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={this.handleLogin}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Login
                        </Text>
                      </Button>
                    )}
                </Block>
              </Block>
            </Block>
          </Block>
        </KeyboardAvoidingView>
        {
          !keyboardIsOpen
          && (
            <Block style={styles.imageContainer}>
              <Image source={Images.PlateUpName} style={styles.nameImage} />
            </Block>
          )
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
    width: width * 0.5
  },
  footer: {
    height: 80,
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
    resizeMode: 'contain',
    width: width * 0.725
  },
  loginContainer: {
    width: width * 0.9,
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
  imageContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  }
});

const mapStateToProps = (state) => ({
  userSettings: state.userSettings
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
