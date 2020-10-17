import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import argonTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => {}}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, navigation}) => (
  <TouchableOpacity style={styles.button} onPress={() => {}}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderRight = () => {
    const { white, title, navigation } = this.props;

    switch (title) {
      case 'Home':
        return ([
          <BasketButton key='basket-home' navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

  renderSearch = () => {
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What ingredients do you have?"
        iconContent={
          <Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />
        }
      />
    );
  }

  renderHeader = () => {
    const { white, title, navigation } = this.props;

    return (
      <Block>
        <Block center>
          {this.props.search ? this.renderSearch() : null}
        </Block>
        <Block style={styles.options}>
          <Button shadowless style={[styles.tab]} onPress={() => {this.props.navigation.navigate("Filters")}}>
            <Block row>
              <Icon size={18} style={styles.icon} name="filter" family="Foundation" color={argonTheme.COLORS.ICON} />
              <Text size={16} style={styles.tabTitle}>Filters</Text>
            </Block>
          </Button>
        </Block>
      </Block>
    );
  }

  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;

    const noShadow = ['Search', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'flex-end', flex: 0.25 }}
          left={
            <Icon
              name={back ? 'chevron-left' : "menu"} family="entypo"
              size={20} onPress={this.handleLeftPress}
              color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
              style={{ marginTop: 2 }}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  options: {
    marginBottom: 16,
    marginTop: 10,
    marginEnd: 28,
    flexDirection: "column",
    alignItems: "flex-end"
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
    alignItems: "flex-end"
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  icon: {
    marginTop: 0,
    paddingRight: 8,
  }
});

export default withNavigation(Header);
