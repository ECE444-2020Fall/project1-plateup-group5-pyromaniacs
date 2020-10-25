import { LinearGradient } from 'expo-linear-gradient';
import { Block, Checkbox, Text } from 'galio-framework';
import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { toast } from '../constants/utils';
import { argonTheme, Images } from '../constants';
import { Button, Icon, Input } from '../components';
import { register, REGISTER_IPR, IDLE } from '../redux/features/user_settings';

const { width, height } = Dimensions.get('screen');

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userSettings.status === REGISTER_IPR && this.props.userSettings.status === IDLE) {
      if (this.props.userSettings.error) {
        toast(this.props.userSettings.error);
      } else {
        this.props.navigation.navigate('Login');
      }
    }
  }

  handleCreateAccount = () => {
    // Don't try to create an account if some information is missing
    if (this.state.name.length === 0 || this.state.email.length === 0 || this.state.password.length === 0) {
      toast('Please fill in all fields.');
      return;
    }

    this.props.register({ ...this.state });
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
                    <Text color={argonTheme.COLORS.PRIMARY} style={{ fontWeight: argonTheme.COLORS.LIGHT_BOLD }} size={14}>
                      Privacy Policy
                    </Text>
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={this.handleCreateAccount}
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
    position: 'absolute',
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
    overflow: 'hidden',
  },
});

const mapStateToProps = (state) => ({
  userSettings: state.userSettings
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
