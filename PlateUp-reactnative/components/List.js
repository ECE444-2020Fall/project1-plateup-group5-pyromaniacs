import { Block, Text } from 'galio-framework';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from './Icon';
import { argonTheme } from '../constants';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { ingredient: 'Milk', quantity: '2L' },
        { ingredient: 'Ground Beef', quantity: '500g' },
        { ingredient: 'Shrimp', quantity: '300g' }
      ]
    };
  }

  handleDeleteItem = (key) => {
    const { items } = this.state;

    // Find and remove item with the given key (ingredient name)
    const newItems = Array.from(items);
    const itemToRemoveIdx = newItems.map((item) => item.ingredient).indexOf(key);
    newItems.splice(itemToRemoveIdx, 1);

    this.setState({ items: newItems });
  }

  render() {
    const { items } = this.state;

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
                  onPress={() => this.handleDeleteItem(key)}
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
}

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
