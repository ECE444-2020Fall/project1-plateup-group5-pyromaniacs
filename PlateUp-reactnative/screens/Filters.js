import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

const { width } = Dimensions.get('screen');

class Filters extends React.Component {
  renderFilters = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Block flex>
          <Text>
            Placeholder
          </Text>
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.filters}>
        {this.renderFilters()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  filters: {
    width: width,
    paddingTop: 12
  }
});

export default Filters;
