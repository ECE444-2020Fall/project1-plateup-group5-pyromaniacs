import React from 'react';

import { List } from '../components';

const testItems = [
  { ingredient: 'Milk', quantity: '2L' },
  { ingredient: 'Ground Beef', quantity: '500g' },
  { ingredient: 'Shrimp', quantity: '300g' },
  { ingredient: 'Milk2', quantity: '2L' },
  { ingredient: 'Ground Beef2', quantity: '500g' },
  { ingredient: 'Shrimp2', quantity: '300g' },
  { ingredient: 'Milk3', quantity: '2L' },
  { ingredient: 'Ground Beef3', quantity: '500g' },
  { ingredient: 'Shrimp3', quantity: '300g' },
  { ingredient: 'Milk4', quantity: '2L' },
  { ingredient: 'Ground Beef4', quantity: '500g' },
  { ingredient: 'Shrimp4', quantity: '300g' },
  { ingredient: 'Milk5', quantity: '2L' },
  { ingredient: 'Ground Beef5', quantity: '500g' },
  { ingredient: 'Shrimp5', quantity: '300g' },
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
