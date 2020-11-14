import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Button, IngredientList } from '../components';
import { getShoppingList, updateShoppingList, flashShoppingList } from '../redux/features/user_storage';
import { argonTheme } from '../constants';
import { height, width } from '../constants/utils';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const { getShoppingList: getShoppingListRequest, user: { id: userId } } = this.props;
    await getShoppingListRequest(userId);

    this.setState({ loading: false });
  }

  handleReload = async () => {
    const { getShoppingList: getShoppingListRequest, user: { id: userId } } = this.props;

    this.setState({ loading: true }, async () => {
      await getShoppingListRequest(userId);
      this.setState({ loading: false });
    });
  }

  handlePostShoppingList = async (newItems) => {
    const { updateShoppingList: updateShoppingListRequest, user: { id: userId } } = this.props;

    this.setState({ loading: true }, async () => {
      await updateShoppingListRequest({
        userId, data: { shopping: newItems }
      });
      this.setState({ loading: false });
    });
  }

  handleFlash = async () => {
    const { flashShoppingList: flashShoppingListRequest, user: { id: userId } } = this.props;

    this.setState({ loading: true }, async () => {
      await flashShoppingListRequest(userId);
      this.setState({ loading: false });
    });
  }

  renderContent() {
    const { userStorage: { error, shoppingList } } = this.props;

    if (error) {
      return (
        <Text
          center
          style={{ marginTop: 15 }}
          onPress={this.handleReload}
        >
          Something went wrong. Click to reload.
        </Text>
      );
    }

    return (
      <Block flex>
        <Block flex>
          <IngredientList
            items={shoppingList || {}}
            onAddItem={this.handlePostShoppingList}
            onDeleteItem={this.handlePostShoppingList}
          />
        </Block>
        <Block center style={styles.moveToGroceryInventory}>
          <Button
            style={styles.button}
            onPress={this.handleFlash}
          >
            <Text style={styles.buttonText}> Move to Grocery Inventory </Text>
          </Button>
        </Block>
      </Block>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <Block flex>
        { loading ? (
          <Block center style={{ marginTop: 15 }}>
            <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
          </Block>
        )
          : this.renderContent()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  moveToGroceryInventory: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: theme.SIZES.BASE + 10,
  },
  button: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
    width: width * 0.85,
    height: height * 0.07,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: argonTheme.COLORS.WHITE,
  },
});

const mapStateToProps = (state) => ({
  user: state.userSettings.user,
  userStorage: state.userStorage
});

const mapDispatchToProps = { getShoppingList, updateShoppingList, flashShoppingList };

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
