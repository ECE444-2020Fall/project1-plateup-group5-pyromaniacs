import {
  Block, Button, Text, theme
} from 'galio-framework';
import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { saveFilters } from '../redux/features/filter_settings';
import { argonTheme } from '../constants';
import { height, width } from '../constants/utils';
import { Switch, Input } from '../components';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    const { filterSettings } = this.props;

    this.state = {
      ...filterSettings,
    };
  }

  handleToggleSwitch = (switchId) => {
    const { [switchId]: switchState } = this.state;
    this.setState({ [switchId]: !switchState });
  }

  handleApplyFilters = () => {
    const { saveFilters: saveFiltersRequest, navigation } = this.props;

    saveFiltersRequest({ ...this.state });
    // The only way to get to this screen is from the Home screen, so simply go back to it
    navigation.goBack();
  }

  renderFilters = () => {
    const {
      activateFilters, maxCookTime, maxCost, recipesWithOwnedIngredients
    } = this.state;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={[styles.filter, { paddingTop: 10 }]}>
          <Text
            style={[
              styles.filterText,
              !activateFilters && { opacity: 0.5 },
            ]}
          >
            Show recipes below a maximum cook time (in minutes)
          </Text>
          <Input
            style={[
              styles.textInput,
              !activateFilters && { borderColor: argonTheme.COLORS.MUTED }
            ]}
            value={maxCookTime}
            placeholder="e.g 45"
            onChangeText={(val) => this.setState({ maxCookTime: val })}
            editable={!!activateFilters}
          />
        </Block>
        <Block style={styles.filter}>
          <Text
            style={[
              styles.filterText,
              !activateFilters && { opacity: 0.5 },
            ]}
          >
            Show recipes below a maximum cost per serving (in dollars)
          </Text>
          <Input
            style={[
              styles.textInput,
              !activateFilters && { borderColor: argonTheme.COLORS.MUTED }
            ]}
            value={maxCost}
            placeholder="e.g 15"
            onChangeText={(val) => this.setState({ maxCost: val })}
            editable={!!activateFilters}
          />
        </Block>
        <Block style={[styles.filter, { borderBottomWidth: 1 }]}>
          <Text
            style={[
              styles.filterText,
              !activateFilters && { opacity: 0.5 },
            ]}
          >
            Show only recipes you have ingredients for
          </Text>
          <Switch
            style={[
              styles.switch,
              !activateFilters && { opacity: 0.5 }
            ]}
            value={recipesWithOwnedIngredients}
            onValueChange={() => this.handleToggleSwitch('recipesWithOwnedIngredients')}
            trackColor={{ true: argonTheme.COLORS.PRIMARY, false: argonTheme.COLORS.MUTED }}
            disabled={!activateFilters}
          />
        </Block>
        <Block style={[styles.filter, { borderBottomWidth: 0, paddingVertical: 25 }]}>
          <Text style={[styles.filterText, { fontWeight: 'bold' }]}>Activate filters</Text>
          <Switch
            style={styles.switch}
            value={activateFilters}
            onValueChange={() => this.handleToggleSwitch('activateFilters')}
            trackColor={{ true: argonTheme.COLORS.PRIMARY, false: argonTheme.COLORS.MUTED }}
          />
        </Block>
      </ScrollView>
    );
  }

  render() {
    return (
      <Block style={{ flex: 1 }}>
        <Block style={styles.filterContainer}>
          {this.renderFilters()}
        </Block>
        <KeyboardAvoidingView
          enabled={false}
          style={{ flex: 1, }}
          behavior="height"
        >
          <Block style={styles.applyFilters}>
            <Button
              style={styles.button}
              onPress={this.handleApplyFilters}
            >
              <Text style={styles.buttonText}>Apply Filters</Text>
            </Button>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    width,
    padding: theme.SIZES.BASE,
  },
  button: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
    width: width * 0.85,
    height: height * 0.07,
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
