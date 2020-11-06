import React from 'react';

import { List } from '../components';

const testItems = [
  { key: 'Milk', value: '2L' },
  { key: 'Ground Beef', value: '500g' },
  { key: 'Shrimp', value: '300g' },
  { key: 'Milk2', value: '2L' },
  { key: 'Ground Beef2', value: '500g' },
  { key: 'Shrimp2', value: '300g' },
  { key: 'Milk3', value: '2L' },
  { key: 'Ground Beef3', value: '500g' },
  { key: 'Shrimp3', value: '300g' },
  { key: 'Milk4', value: '2L' },
  { key: 'Ground Beef4', value: '500g' },
  { key: 'Shrimp4', value: '300g' },
  { key: 'Milk5', value: '2L' },
  { key: 'Ground Beef5', value: '500g' },
  { key: 'Shrimp5', value: '300g' },
];

class Inventory extends React.Component {
  handleDeleteItem = (key) => {
    console.log(`Item with key '${key}' deleted!`);
  }

  handleAddItem = (key, val) => {
    console.log(`Item with (key,val) '(${key},${val})' added!`);
  }

  render() {
    return (
      <List
        items={testItems}
        onAddItem={this.handleAddItem}
        onDeleteItem={this.handleDeleteItem}
        keyName="Ingredient"
        valName="Quantity"
      />
    );
  }
}

export default Inventory;
