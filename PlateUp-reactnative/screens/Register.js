import { LinearGradient } from 'expo-linear-gradient';
import { Block, Checkbox, Text } from 'galio-framework';
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
import { register, REGISTER_IPR, IDLE } from '../redux/features/user_settings';

const { width } = Dimensions.get('screen');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      keyboardIsOpen: false
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
    const { navigation, userSettings } = this.props;

    if (prevProps.userSettings.status === REGISTER_IPR && userSettings.status === IDLE) {
      if (userSettings.error) {
        toast(userSettings.error);
      } else {
        navigation.navigate('Login');
      }
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleCreateAccount = () => {
    const { name, email, password } = this.state;
    const { register: registerRequest } = this.props;

    // Don't try to create an account if some information is missing
    if (name.length === 0 || email.length === 0 || password.length === 0) {
      toast('Please fill in all fields.');
      return;
    }

    registerRequest({ ...this.state });
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
          style={{ flex: 1 }}
          behavior="padding"
          enabled
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block height={50} middle style={styles.header}>
                <Text size={12} color={argonTheme.COLORS.TEXT_COLOR}>
                  Welcome to Plate Up! Please create an account.
                </Text>
              </Block>
              <Block center>
                <Block
                  width={width * 0.8}
                  style={{ marginBottom: 5, marginTop: 5 }}
                >
                  <Input
                    borderless
                    placeholder="Name"
                    iconContent={(
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="hat-3"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    )}
                    onChangeText={(name) => this.setState({ name })}
                  />
                </Block>
                <Block width={width * 0.8} style={{ marginBottom: 5 }}>
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
                <Block width={width * 0.8} style={{ marginBottom: 10 }}>
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
                  <Block row style={styles.passwordCheck}>
                    <Text size={12} color={argonTheme.COLORS.MUTED}>
                      password strength:
                    </Text>
                    <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                      {' '}
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
                  <Text
                    color={argonTheme.COLORS.PRIMARY}
                    style={{ fontWeight: argonTheme.COLORS.LIGHT_BOLD }}
                    size={14}
                  >
                    Privacy Policy
                  </Text>
                </Block>
                <Block middle style={styles.footer}>
                  {userSettings.status === REGISTER_IPR
                    ? (
                      <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                    )
                    : (
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={this.handleCreateAccount}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Create Account
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
    width: width * 0.5,
  },
  footer: {
    height: 80,
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
    resizeMode: 'contain',
    width: width * 0.725
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 13,
  },
  registerContainer: {
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
    flex: 0.1,
    paddingBottom: 15
  }
});

const mapStateToProps = (state) => ({
  userSettings: state.userSettings
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
