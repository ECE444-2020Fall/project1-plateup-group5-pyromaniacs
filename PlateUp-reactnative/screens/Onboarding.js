import React from 'react';
import {
  Image, StyleSheet, StatusBar
} from 'react-native';
import {
  Block, Button, Text, theme
} from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import argonTheme from '../constants/Theme';
import Images from '../constants/Images';
import { height, width } from '../constants/utils';
import { store, RESET_STORE } from '../redux/store';

class Onboarding extends React.Component {
  componentDidMount() {
    const { navigation } = this.props;

    // This is done here because possible unhandled exceptions occur when
    // popping up the navigation stack after logging out. This is because
    // when the state is reset, objects that pages access become undefined
    // Resetting the state after those pages have been removed from the
    // navigation stack avoids this issue.
    this.focusListener = navigation.addListener('focus', () => {
      store.dispatch({ type: RESET_STORE });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

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
            color={argonTheme.COLORS.BUTTON_COLOR}
            onPress={() => navigation.navigate('Registration')}
            textStyle={{ color: argonTheme.COLORS.BLACK }}
          >
            <Text bold size={16}>Get Started</Text>
          </Button>
          <Text style={styles.text} color={argonTheme.COLORS.TEXT_COLOR}>
            Already have an account?
            {' '}
            <Text
              bold
              color={argonTheme.COLORS.BLUE}
              onPress={() => navigation.navigate('Login')}
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
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: height * 0.075,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginBottom: height * 0.0185,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: height * 0.06,
  },
  logoImage: {
    width: width * 0.725,
    height: width * 0.725 * (201 / 279),
  },
  logoContainer: {
    position: 'absolute',
    width: '100%',
    top: height * 0.2648,
    left: 0,
  },
  nameImage: {
    marginTop: height * 0.04,
    width: width * 0.725,
    height: width * 0.725 * (43 / 272),
  },
  text: {
    fontSize: 14,
    lineHeight: 19,
  },
});

export default Onboarding;
