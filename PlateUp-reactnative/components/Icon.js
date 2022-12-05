import React from 'react';
import * as Font from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Icon } from 'galio-framework';

import argonConfig from '../assets/config/argon.json';

const ArgonExtra = require('../assets/font/argon.ttf');

const IconArgonExtra = createIconSetFromIcoMoon(argonConfig, 'ArgonExtra');

class IconExtra extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({ ArgonExtra });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { name, family, ...rest } = this.props;
    const { fontLoaded } = this.state;

    if (name && family && fontLoaded) {
      if (family === 'ArgonExtra') {
        // Reasonable to disable here as this is a wrapper component
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <IconArgonExtra name={name} family={family} {...rest} />;
      }
      // Reasonable to disable here as this is a wrapper component
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
  }
}

export default IconExtra;
