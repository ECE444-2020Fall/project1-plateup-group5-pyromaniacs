import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import Icon from './Icon';
import argonTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'Home':
        return (
          <Icon
            name="shop"
            family="ArgonExtra"
            size={14}
            color={focused ? 'white' : argonTheme.COLORS.TEXT_COLOR}
          />
        );
      case 'Shopping List':
        return (
          <Icon
            name="basket"
            family="ArgonExtra"
            size={14}
            color={focused ? 'white' : argonTheme.COLORS.TEXT_COLOR}
          />
        );
      case 'Grocery Inventory':
        return (
          <Icon
            name="bag-17"
            family="ArgonExtra"
            size={14}
            color={focused ? 'white' : argonTheme.COLORS.TEXT_COLOR}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const {
      focused, title, navigation, navigationScreenName
    } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => (navigationScreenName ? navigation.navigate(navigationScreenName) : {})}
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={!!focused}
              color={focused ? 'white' : argonTheme.COLORS.TEXT_COLOR}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
