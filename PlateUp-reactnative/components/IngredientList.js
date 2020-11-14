import { Block, Text } from 'galio-framework';
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from './Icon';
import { argonTheme } from '../constants';
import { toast, height } from '../constants/utils';

const DEFAULT_DIALOG_STATE = {
  addItemDialogVisible: false,
  dialogIngredient: '',
  dialogQuantity: '',
  dialogUnits: '',
};

class IngredientList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...DEFAULT_DIALOG_STATE
    };
  }

  handleCancelDialog = () => {
    this.setState(DEFAULT_DIALOG_STATE);
  }

  handleSubmitDialog = () => {
    const { onAddItem, items } = this.props;
    const {
      dialogIngredient, dialogQuantity, dialogUnits
    } = this.state;

    const ingredient = dialogIngredient.trim();
    const qty = Number(dialogQuantity.trim());
    const unit = dialogUnits.trim();

    if (ingredient.length === 0 || qty.length === 0) {
      toast('Please fill in all required fields.');
      return;
    }

    if (Number.isNaN(qty)) {
      toast('Please enter a number for the quantity.');
      return;
    }

    // Only add item to list if the key isn't already in the list
    // The user's input will be trimmed and lowercased and be
    // compared to all the lowercased keys.
    const keyExists = Object.keys(items).some((itemIngredient) => (
      itemIngredient.toLowerCase() === ingredient.toLowerCase()
    ));

    if (keyExists) {
      toast(`Cannot add "${ingredient}" as it already exists!`);
      return;
    }

    const newItems = {
      ...JSON.parse(JSON.stringify(items)),
      [ingredient]: { qty, unit }
    };

    onAddItem(newItems);
    this.setState(DEFAULT_DIALOG_STATE);
  };

  handleDeleteItem = (key) => {
    const { onDeleteItem, items } = this.props;

    const newItems = { ...JSON.parse(JSON.stringify(items)) };
    delete newItems[key];

    onDeleteItem(newItems);
  }

  renderAddItem() {
    const { addItemDialogVisible } = this.state;

    return (
      <Block>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          enabled
        >
          <Block flex middle>
            <Dialog.Container visible={addItemDialogVisible}>
              <Dialog.Title>Enter new item</Dialog.Title>
              <Dialog.Input
                placeholder="Ingredient"
                wrapperStyle={styles.dialogTextInput}
                onChangeText={(dialogIngredient) => this.setState({ dialogIngredient })}
              />
              <Dialog.Input
                placeholder="Quantity"
                wrapperStyle={styles.dialogTextInput}
                onChangeText={(dialogQuantity) => this.setState({ dialogQuantity })}
              />
              <Dialog.Input
                placeholder="Units (Optional)"
                wrapperStyle={styles.dialogTextInput}
                onChangeText={(dialogUnits) => this.setState({ dialogUnits })}
              />
              <Dialog.Button
                label="Cancel"
                color={argonTheme.COLORS.PRIMARY}
                onPress={() => this.handleCancelDialog()}
              />
              <Dialog.Button
                label="Submit"
                color={argonTheme.COLORS.PRIMARY}
                onPress={() => this.handleSubmitDialog()}
              />
            </Dialog.Container>
          </Block>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={styles.addItemContainer}
          onPress={() => this.setState({ addItemDialogVisible: true })}
        >
          <Icon
            name="plus"
            family="EvilIcons"
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
      </Block>
    );
  }

  renderItems() {
    const { items } = this.props;

    // Can't rely on order of JS objects, so instead just sort the
    // keys and use them to access the items in the props.
    const itemsSorted = Object.keys(items).sort();

    return (
      itemsSorted.map((ingredient) => {
        const { qty, unit } = items[ingredient];

        return (
          <Block key={ingredient} row>
            <TouchableOpacity style={styles.deleteIconContainer}>
              <Icon
                name="minus"
                family="EvilIcons"
                size={24}
                color={argonTheme.COLORS.TEXT_COLOR}
                onPress={() => this.handleDeleteItem(ingredient)}
              />
            </TouchableOpacity>
            <Block style={styles.listItemContainer}>
              <Text style={[styles.text, { width: '60%', flexWrap: 'wrap' }]}>
                {ingredient}
              </Text>
              <Text style={[styles.text, { width: '40%', flexWrap: 'wrap', textAlign: 'right' }]}>
                {qty.toString()}
                {' '}
                {unit}
              </Text>
            </Block>
          </Block>
        );
      })
    );
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator
        style={styles.listContainer}
      >
        {this.renderItems()}
        {this.renderAddItem()}
      </ScrollView>
    );
  }
}

IngredientList.propTypes = {
  items: PropTypes.objectOf(
    PropTypes.shape({
      qty: PropTypes.number,
      unit: PropTypes.string
    })
  ).isRequired,
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
  deleteIconContainer: {
    paddingRight: 10,
    flex: 1,
    justifyContent: 'center',
  },
  addIcon: {
    paddingRight: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
  },
  dialogTextInput: {
    paddingLeft: 12,
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    backgroundColor: argonTheme.COLORS.WHITE,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  }
});

export default IngredientList;
