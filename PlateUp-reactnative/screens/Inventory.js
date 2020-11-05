import {
  Block, Text,
} from 'galio-framework';
import React from 'react';

import { List } from '../components';

const testItems = [
  { ingredient: 'Milk', quantity: '2L' },
  { ingredient: 'Ground Beef', quantity: '500g' },
  { ingredient: 'Shrimp', quantity: '300g' }
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
      />
    );
  }
}

export default Inventory;
