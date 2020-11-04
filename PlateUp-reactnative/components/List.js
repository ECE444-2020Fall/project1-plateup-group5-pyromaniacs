import { Block, Text } from 'galio-framework';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import Icon from './Icon';
import { argonTheme } from '../constants';

class List extends React.Component {
  renderItems() {
    const { onDeleteItem, onAddItem, items } = this.props;

    return (
      <ScrollView style={styles.listContainer}>
        {
          items.map((item) => {
            const { ingredient, quantity } = item;
            const key = ingredient;

            return (
              <Block key={key} flex row>
                <Icon
                  name="close"
                  family="Ionicons"
                  size={24}
                  color={argonTheme.COLORS.TEXT_COLOR}
                  style={styles.deleteIcon}
                  onPress={() => onDeleteItem(key)}
                />
                <Block style={styles.itemContainer}>
                  <Text style={styles.text}>
                    {ingredient}
                  </Text>
                  <Text style={styles.text}>
                    {quantity}
                  </Text>
                </Block>
              </Block>
            );
          })
        }
      </ScrollView>
    );
  }

  render() {
    return (
      <Block flex>
        {this.renderItems()}
      </Block>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string, PropTypes.string)).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 20,
  },
  deleteIcon: {
    paddingRight: 10,
    alignSelf: 'center',
  },
  itemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: argonTheme.COLORS.MUTED,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
  },
});

export default List;
