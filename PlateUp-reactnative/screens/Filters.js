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

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.filterSettings,
    };
  }

  handleToggleSwitch = (switchId) => {
    this.setState({ [switchId]: !this.state[switchId] });
  }

  handleApplyFilters = () => {
    this.props.saveFilters({ ...this.state });
    // The only way to get to this screen is from the Home screen, so simply go back to it
    this.props.navigation.goBack();
  }

  renderFilters = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block style={[styles.filter, { paddingTop: 10 }]}>
        <Text
          style={[
            styles.filterText,
            !this.state.activateFilters && { opacity: 0.5 },
          ]}
        >
          Show recipes below a maximum cook time (in minutes)
        </Text>
        <Input
          style={[
            styles.textInput,
            !this.state.activateFilters && { borderColor: argonTheme.COLORS.MUTED }
          ]}
          value={this.state.maxCookTime}
          placeholder="e.g 45"
          onChangeText={(maxCookTime) => this.setState({ maxCookTime })}
          editable={!!this.state.activateFilters}
        />
      </Block>
      <Block style={styles.filter}>
        <Text
          style={[
            styles.filterText,
            !this.state.activateFilters && { opacity: 0.5 },
          ]}
        >
          Show recipes below a maximum cost per serving (in dollars)
        </Text>
        <Input
          style={[
            styles.textInput,
            !this.state.activateFilters && { borderColor: argonTheme.COLORS.MUTED }
          ]}
          value={this.state.maxCost}
          placeholder="e.g 15"
          onChangeText={(maxCost) => this.setState({ maxCost })}
          editable={!!this.state.activateFilters}
        />
      </Block>
      <Block style={[styles.filter, { borderBottomWidth: 1 }]}>
        <Text
          style={[
            styles.filterText,
            !this.state.activateFilters && { opacity: 0.5 },
          ]}
        >
          Show only recipes you have ingredients for
        </Text>
        <Switch
          style={[
            styles.switch,
            !this.state.activateFilters && { opacity: 0.5 }
          ]}
          value={this.state.recipesWithOwnedIngredients}
          onValueChange={() => this.handleToggleSwitch('recipesWithOwnedIngredients')}
          trackColor={{ true: argonTheme.COLORS.PRIMARY, false: argonTheme.COLORS.MUTED }}
          disabled={!this.state.activateFilters}
        />
      </Block>
      <Block style={[styles.filter, { borderBottomWidth: 0, paddingVertical: 25 }]}>
        <Text style={[styles.filterText, { fontWeight: 'bold' }]}>Activate filters</Text>
        <Switch
          style={styles.switch}
          value={this.state.activateFilters}
          onValueChange={() => this.handleToggleSwitch('activateFilters')}
          trackColor={{ true: argonTheme.COLORS.PRIMARY, false: argonTheme.COLORS.MUTED }}
        />
      </Block>
    </ScrollView>
  )

  render() {
    return (
      <Block style={{ flex: 1 }}>
        <Block style={styles.filterContainer}>
          {this.renderFilters()}
        </Block>
        <Block style={styles.applyFilters}>
          <Button colour="primary" onPress={this.handleApplyFilters}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </Button>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    width,
    padding: theme.SIZES.BASE,
  },
  filter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: argonTheme.COLORS.MUTED,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 20,
  },
  filterText: {
    flexWrap: 'wrap',
    fontSize: 15,
    lineHeight: 18,
    width: '65%',
  },
  switch: {
    transform: [{
      scale: 1.2,
    }],
  },
  textInput: {
    alignSelf: 'flex-end',
    backgroundColor: argonTheme.COLORS.GREY,
    borderColor: argonTheme.COLORS.PRIMARY,
    height: 30,
    width: 90,
    right: 0,
    position: 'absolute',
  },
  applyFilters: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: theme.SIZES.BASE + 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: argonTheme.COLORS.WHITE,
  }
});

const mapStateToProps = (state) => ({
  filterSettings: state.filterSettings
});

const mapDispatchToProps = {
  saveFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
