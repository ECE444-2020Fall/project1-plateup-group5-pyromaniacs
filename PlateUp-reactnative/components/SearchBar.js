import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import argonTheme from '../constants/Theme';
import { saveSearch } from '../redux/features/search_query';
import Icon from './Icon';
import Input from './Input';

const { width } = Dimensions.get('window');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    const { searchQuery } = this.props;
    this.state = { value: searchQuery };
  }

  handleSubmit = () => {
    const { value: searchQuery } = this.state;
    const { saveSearch: saveSearchDispatch } = this.props;

    saveSearchDispatch(searchQuery);
  }

  render() {
    const { value } = this.state;

    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Search by ingredient, name, or type..."
        value={value}
        iconContent={
          <Icon size={16} color={argonTheme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />
        }
        returnKeyType="search"
        onChangeText={(newValue) => this.setState({ value: newValue })}
        onSubmitEditing={this.handleSubmit}
      />
    );
  }
}

const styles = StyleSheet.create({
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
});

const mapStateToProps = (state) => ({
  searchQuery: state.searchQuery
});

const mapDispatchToProps = { saveSearch };

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
