import { Block, Text } from 'galio-framework';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from './Icon';
import { argonTheme } from '../constants';
import { toast } from '../constants/utils';

const DEFAULT_DIALOG_STATE = {
  addItemDialogVisible: false,
  dialogKey: '',
  dialogVal: '',
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_DIALOG_STATE };
  }

  handleCancelDialog = () => {
    this.setState(DEFAULT_DIALOG_STATE);
  }

  handleOKDialog = () => {
    const { onAddItem, items } = this.props;
    const { dialogKey, dialogVal } = this.state;
    const key = dialogKey.trim();
    const val = dialogVal.trim();

    if (key.length === 0 || val.length === 0) {
      toast('Please fill in all fields.');
      return;
    }

    const keyExists = items.some((item) => {
      const itemKey = Object.values(item)[0];
      return itemKey.toLowerCase() === key.toLowerCase();
    });

    if (keyExists) {
      toast(`Cannot add "${key}" as it already exists!`);
      return;
    }

    onAddItem(key, val);
    this.setState(DEFAULT_DIALOG_STATE);
  };

  handleDeleteItem = (key) => {
    const { onDeleteItem } = this.props;
    onDeleteItem(key);
  }

  renderAddItem() {
    const { addItemDialogVisible } = this.state;
    const { keyName, valName } = this.props;

    return (
      <Block>
        <Dialog.Container visible={addItemDialogVisible}>
          <Dialog.Title>Enter new item</Dialog.Title>
          <Dialog.Input
            placeholder={keyName}
            wrapperStyle={styles.dialogTextInput}
            onChangeText={(dialogKey) => this.setState({ dialogKey })}
          />
          <Dialog.Input
            placeholder={valName}
            wrapperStyle={styles.dialogTextInput}
            onChangeText={(dialogVal) => this.setState({ dialogVal })}
          />
          <Dialog.Button
            label="Cancel"
            color={argonTheme.COLORS.PRIMARY}
            onPress={() => this.handleCancelDialog()}
          />
          <Dialog.Button
            label="OK"
            color={argonTheme.COLORS.PRIMARY}
            onPress={() => this.handleOKDialog()}
          />
        </Dialog.Container>

        <TouchableOpacity
          style={styles.addItemContainer}
          onPress={() => this.setState({ addItemDialogVisible: true })}
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
      </Block>
    );
  }

  renderItems() {
    const { items } = this.props;

    return (
      <Block>
        {
        items.map((item) => {
          const key = Object.values(item)[0];
          const val = Object.values(item)[1];

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
                  {key}
                </Text>
                <Text style={styles.text}>
                  {val}
                </Text>
              </Block>
            </Block>
          );
        })
        }
      </Block>
    );
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
      >
        {this.renderItems()}
        {this.renderAddItem()}
      </ScrollView>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string, PropTypes.string)).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,

  keyName: PropTypes.string,
  valName: PropTypes.string,
};

List.defaultProps = {
  keyName: 'Key',
  valName: 'Value',
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

export default List;