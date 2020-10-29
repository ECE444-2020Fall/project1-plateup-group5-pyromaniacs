import {
  Block, Button, Text, theme
} from 'galio-framework';
import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { saveFilters } from '../redux/features/filter_settings';
import { argonTheme } from '../constants';
import { Switch, Input } from '../components';

const { width } = Dimensions.get('screen');

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    const { id } = props.route.params;
    console.log(props)

    this.state = {
      id: id,
    };
  }

  render() {
    return (
      <Block style={{ flex: 1 }}>
        <Text>Recipe ID: {this.state.id}</Text>
      </Block>
    );
  }
}

export default Recipe;
