import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Switch, Input } from '../components/';
import { argonTheme } from "../constants";

const { width } = Dimensions.get('screen');

class Filters extends React.Component {
  state = {
    "recipes-with-your-ingredients": false,
    "activate-filters": false
  };

  handleToggleSwitch = switchId => {
    this.setState({ [switchId]: !this.state[switchId] });
  }

  renderFilters = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={[styles.filter, { paddingTop: 10 }]}>
          <Text style={styles.filterText}>Show recipes below a maximum cook time (in minutes)</Text>
          <Input
            style={styles.textInput}
            placeholder="e.g 90"
          />
        </Block>
        <Block style={styles.filter}>
          <Text style={styles.filterText}>Show recipes below a maximum cost</Text>
          <Input
            style={styles.textInput}
            placeholder="e.g $100"
          />
        </Block>
        <Block style={styles.filter}>
          <Text style={styles.filterText}>Show only recipes you have ingredients for</Text>
          <Switch
            style={styles.switch}
            value={this.state["recipes-with-your-ingredients"]}
            onValueChange={() => this.handleToggleSwitch("recipes-with-your-ingredients")}
          />
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block style={styles.filterContainer}>
        {this.renderFilters()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    width: width,
    padding: theme.SIZES.BASE,
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: argonTheme.COLORS.MUTED,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 10,
    paddingVertical: 20,
  },
  filterText: {
    flexWrap: "wrap",
    fontSize: 16,
    lineHeight: 19,
    width: "65%",
  },
  switch: {
    transform: [{
      scale: 1.2,
    }],
  },
  textInput: {
    alignSelf: "flex-end",
    backgroundColor: argonTheme.COLORS.GREY,
    borderColor: argonTheme.COLORS.PRIMARY,
    height: 30,
    width: 90,
    right: 0,
    position: "absolute",
  }
});

export default Filters;
