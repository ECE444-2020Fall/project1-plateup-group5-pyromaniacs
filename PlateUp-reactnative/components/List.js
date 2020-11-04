import { Block, Text } from 'galio-framework';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from './Icon';
import { argonTheme } from '../constants';
import { toast } from '../constants/utils';

class List extends React.Component {
  handleAddItem = () => {
    // Alert.prompt(
    //   'Ingredient Name',
    //   'Quantity',
    //   [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel'
    //     },
    //     {
    //       text: 'OK',
    //       onPress: console.log('OK Pressed')
    //     }
    //   ],
    // );

    const { onAddItem, items } = this.props;

    const key = '';
    const val = '';

    if (items.some((item) => item.key === key)) {
      toast(`Cannot add "${key}" as it already exists!`);
      return;
    }

    onAddItem(key, val);
  }

  handleDeleteItem = (key) => {
    const { onDeleteItem } = this.props;
    onDeleteItem(key);
  }

  renderAddItem = () => (
    <TouchableOpacity
      style={styles.addItemContainer}
      onPress={() => this.handleAddItem()}
    >
      <Icon
        name="add"
        family="MaterialIcons"
        size={24}
        color={argonTheme.COLORS.PRIMARY}
        style={styles.addIcon}
      />
      <Block style={{ padding: 15 }}>
        <Text style={styles.text} bold color={argonTheme.COLORS.PRIMARY}>
          Add Item
        </Text>
      </Block>
    </TouchableOpacity>
  )

  renderItems() {
    const { items } = this.props;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {
        items.map((item) => {
          const { ingredient, quantity } = item;
          const key = ingredient;

          return (
            <Block key={key} row>
              <Icon
                name="close"
                family="Ionicons"
                size={24}
                color={argonTheme.COLORS.TEXT_COLOR}
                style={styles.deleteIcon}
                onPress={() => this.handleDeleteItem(key)}
              />
              <Block style={styles.listItemContainer}>
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
      <Block style={styles.listContainer}>
        {this.renderItems()}
        {this.renderAddItem()}
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
    margin: 20,
  },
  listItemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: argonTheme.COLORS.MUTED,
    borderBottomWidth: StyleSheet.hairlineWidth * 0.9,
    padding: 15,
  },
  addItemContainer: {
    flexDirection: 'row',
  },
  deleteIcon: {
    paddingRight: 10,
    alignSelf: 'center',
  },
  addIcon: {
    paddingRight: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default List;
