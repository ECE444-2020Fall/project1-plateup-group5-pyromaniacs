import React from 'react';
import { Switch, Platform } from 'react-native';

import argonTheme from '../constants/Theme';

class MkSwitch extends React.PureComponent {
  render() {
    const { value, ...props } = this.props;
    let thumbColor = null;

    if (Platform.OS === 'android') {
      if (value) {
        thumbColor = argonTheme.COLORS.SWITCH_ON;
      } else {
        thumbColor = argonTheme.COLORS.SWITCH_OFF;
      }
    }

    return (
      <Switch
        value={value}
        thumbColor={thumbColor}
        ios_backgroundColor={argonTheme.COLORS.SWITCH_OFF}
        trackColor={{ false: argonTheme.COLORS.SWITCH_ON, true: argonTheme.COLORS.SWITCH_ON }}
        // Reasonable to disable here as this is a wrapper component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    );
  }
}

export default MkSwitch;
