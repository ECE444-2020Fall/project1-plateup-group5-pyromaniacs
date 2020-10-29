import { withNavigation } from '@react-navigation/compat';
import {
  Button, Block, NavBar, Text, theme
} from 'galio-framework';
import React from 'react';
import {
  TouchableOpacity, StyleSheet, Platform, Dimensions
} from 'react-native';
import argonTheme from '../constants/Theme';
import Icon from './Icon';
import SearchBar from './SearchBar';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderRight = () => {
    const { title, navigation } = this.props;

    switch (title) {
      case 'Home':
        return (
          <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Filters')}>
            <Block row>
              <Text style={styles.filterTitle}>Filters</Text>
              <Icon
                family="Foundation"
                size={16}
                name="filter"
                color={argonTheme.COLORS.ICON}
                style={[styles.button, styles.icon]}
              />
            </Block>
          </Button>
        );
      default:
        break;
    }
  }

  renderHeader = () => {
    return (
      <Block>
        { this.props.search &&
          <Block center style={{ paddingBottom: 15 }}>
            <SearchBar />
          </Block>
        }
      </Block>
    );
  }

  render() {
    const {
      back, title, transparent, bgColor, iconColor, titleColor, ...props
    } = this.props;

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
          rightStyle={styles.rightStyle}
          left={(
            <Icon
              name={back ? 'chevron-left' : 'menu'}
              family="entypo"
              size={20}
              onPress={this.handleLeftPress}
              color={iconColor || argonTheme.COLORS.ICON}
              style={{ marginTop: 2 }}
            />
          )}
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS.HEADER },
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
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
    alignItems: 'flex-end'
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
  icon: {
    marginTop: 0,
    paddingRight: 8,
  },
  rightStyle: {
    alignItems: 'flex-end',
    alignContent: 'center',
    flex: 0.6,
  },
  filterTitle: {
    fontSize: 14,
    marginTop: 11,
    lineHeight: 19,
    color: argonTheme.COLORS.HEADER,
  }
});

export default withNavigation(Header);
