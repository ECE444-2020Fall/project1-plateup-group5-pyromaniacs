import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Switch, Input } from '../components/';
import { argonTheme } from "../constants";
import { TouchableOpacity as TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');

const defaultState = {
  max_cost: "",
  max_cook_time: "",
  "recipes-with-your-ingredients": false,
};

class Filters extends React.Component {
  state = {
    max_cost: "",
    max_cook_time: "",
    "recipes-with-your-ingredients": false,
    "activate-filters": true
  };

  handleToggleSwitch = switchId => {
    this.setState({ [switchId]: !this.state[switchId] });
  }

  handleOnPress = () => {
    console.log(this.state);
  }

  renderFilters = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={[styles.filter, { paddingTop: 10 }]}>
          <Text style={styles.filterText}>Show recipes below a maximum cook time (in minutes)</Text>
          <Input
            style={[
              styles.textInput,
              !this.state["activate-filters"] && { borderColor: argonTheme.COLORS.MUTED }
            ]}
            placeholder="e.g 90"
            onChangeText={max_cook_time => this.setState({ max_cook_time })}
            editable={this.state["activate-filters"] ? true : false}
          />
        </Block>
        <Block style={styles.filter}>
          <Text style={styles.filterText}>Show recipes below a maximum cost</Text>
          <Input
            style={[
              styles.textInput,
              !this.state["activate-filters"] && { borderColor: argonTheme.COLORS.MUTED }
            ]}
            placeholder="e.g $100"
            onChangeText={max_cost => this.setState({ max_cost })}
            editable={this.state["activate-filters"] ? true : false}
          />
        </Block>
        <Block style={[styles.filter, { borderBottomWidth: 1 }]}>
          <Text style={styles.filterText}>Show only recipes you have ingredients for</Text>
          <Switch
            style={[
              styles.switch,
              !this.state["activate-filters"] && { opacity: 0.5 }
            ]}
            value={this.state["recipes-with-your-ingredients"]}
            onValueChange={() => this.handleToggleSwitch("recipes-with-your-ingredients")}
            disabled={this.state["activate-filters"] ? false : true}
            trackColor={{true: argonTheme.COLORS.PRIMARY, false: argonTheme.COLORS.MUTED}}
            />
        </Block>
        <Block style={[styles.filter, { borderBottomWidth: 0, paddingVertical: 25 }]}>
          <Text style={[styles.filterText, { fontWeight: "bold" }]}>Activate filters</Text>
          <Switch
            style={styles.switch}
            value={this.state["activate-filters"]}
            onValueChange={() => this.handleToggleSwitch("activate-filters")}
            trackColor={{true: argonTheme.COLORS.PRIMARY, false: argonTheme.COLORS.MUTED}}
          />
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block style={{flex: 1}}>
        <Block style={styles.filterContainer}>
          {this.renderFilters()}
        </Block>
        <Block style={styles.applyFilters}>
          <Button colour="primary" onPress={this.handleOnPress}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </Button>
        </Block>
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
    paddingLeft: 12,
    paddingRight: 12,
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
  },
  applyFilters: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: theme.SIZES.BASE + 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: argonTheme.COLORS.WHITE,
  }
});

export default Filters;
