import { Block, Text, theme } from 'galio-framework';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { DrawerItem as DrawerCustomItem, Icon } from '../components';
import Images from '../constants/Images';
import argonTheme from '../constants/Theme';
import { toast } from '../constants/toast';
import { logout, LOGOUT_IPR, IDLE } from '../redux/features/user_settings';

const { width, height } = Dimensions.get('screen');

class CustomDrawerContent extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userSettings.status === LOGOUT_IPR && this.props.userSettings.status === IDLE) {
      if (this.props.userSettings.error) {
        toast(this.props.userSettings.error);
      } else {
        toast('Logged out successfully!');
        this.props.navigation.dispatch(StackActions.popToTop());
      }
    }
  }

  render() {
    const {
      drawerPosition, navigation, profile, focused, state, ...rest
    } = this.props;

    return (
      <Block
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <Block flex={0.06} style={styles.header}>
          <Image style={styles.logo} source={Images.PlateUpNameSecondary} />
        </Block>
        <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <DrawerCustomItem
              title="Home"
              key={0}
              navigation={navigation}
              navigationScreenName="Home"
              focused={state.index === 0}
            />
            <DrawerCustomItem
              title="Inventory"
              key={1}
              focused={state.index === 1}
            />
            <DrawerCustomItem
              title="Meal Planning"
              key={2}
              focused={state.index === 2}
            />
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block style={{ borderColor: 'rgba(0,0,0,0.2)', width: '100%', borderWidth: StyleSheet.hairlineWidth }} />
            </Block>
            <TouchableOpacity
              style={{ height: 60 }}
              onPress={() => this.props.logout()}
            >
              <Block flex row style={styles.defaultStyle}>
                <Block middle flex={0.1} style={{ marginRight: 5 }}>
                  <Icon
                    name="exit-to-app"
                    family="MaterialIcons"
                    size={17}
                    color={focused ? 'white' : argonTheme.COLORS.TEXT_COLOR}
                  />
                </Block>
                <Block row center flex={0.9}>
                  <Text
                    size={15}
                    bold={!!focused}
                    color={focused ? 'white' : argonTheme.COLORS.TEXT_COLOR}
                  >
                    Log Out
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  },
  logo: {
    width: width * 0.5,
    height: height * 0.0366,
  },
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
});

const mapStateToProps = (state) => ({
  userSettings: state.userSettings
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);
