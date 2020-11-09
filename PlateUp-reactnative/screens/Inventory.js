import React from 'react';

import { IngredientList } from '../components';

const testItems = {
  Milk: { qty: 2, units: 'L' },
  'Ground Beef': { qty: 500, units: 'g' },
  Shrimp: { qty: 300, units: 'g' },
  Milk2: { qty: 2, units: 'L' },
  'Ground Beef2': { qty: 500, units: 'g' },
  Shrimp2: { qty: 300, units: 'g' },
  Milk3: { qty: 2, units: 'L' },
  'Ground Beef3': { qty: 500, units: 'g' },
  Shrimp3: { qty: 300, units: 'g' },
  Milk4: { qty: 2, units: 'L' },
  'Ground Beef4': { qty: 500, units: 'g' },
  Shrimp4: { qty: 300, units: 'g' },
  Milk5: { qty: 2, units: 'L' },
  'Ground Beef5': { qty: 500, units: 'g' },
  Shrimp5: { qty: 300, units: 'g' },
};

class Inventory extends React.Component {
  handleDeleteItem = (newItems) => {
    console.log('Items after deletion: ', newItems);
  }

  handleAddItem = (newItems) => {
    console.log('Items after addition: ', newItems);
  }

  render() {
    return (
      <IngredientList
        items={testItems}
        onAddItem={this.handleAddItem}
        onDeleteItem={this.handleDeleteItem}
      />
    );
  }
}

export default Inventory;
