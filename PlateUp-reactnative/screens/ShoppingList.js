import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Button, IngredientList } from '../components';
import { getShoppingList, updateShoppingList, flashShoppingList } from '../redux/features/user_storage';
import { argonTheme } from '../constants';

const { width } = Dimensions.get('screen');

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const { getShoppingList: getShoppingListRequest, userId } = this.props;
    await getShoppingListRequest(userId);

    this.setState({ loading: false });
  }

  handleReload = async () => {
    const { getShoppingList: getShoppingListRequest, userId } = this.props;

    this.setState({ loading: true }, async () => {
      await getShoppingListRequest(userId);
      this.setState({ loading: false });
    });
  }

  handlePostShoppingList = async (newItems) => {
    const { updateShoppingList: updateShoppingListRequest, userId } = this.props;

    this.setState({ loading: true }, async () => {
      await updateShoppingListRequest({
        userId, data: { shopping: newItems }
      });
      this.setState({ loading: false });
    });
  }

  handleFlash = async () => {
    const { flashShoppingList: flashShoppingListRequest, userId } = this.props;

    this.setState({ loading: true }, async () => {
      await flashShoppingListRequest(userId);
      this.setState({ loading: false });
    });
  }

  renderContent() {
    const { userStorage: { error, shoppingList } } = this.props;

    if (error) {
      <Text
        center
        onPress={this.handleReload}
      >
        Something went wrong. Click to reload.
      </Text>;
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
        <Block center>
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
      <Block flex style={styles.container}>
        { loading ? (
          <Block center>
            <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
          </Block>
        )
          : this.renderContent()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    margin: theme.SIZES.BASE,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: argonTheme.COLORS.PRIMARY
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: argonTheme.COLORS.WHITE,
  },
  container: {
    paddingVertical: theme.SIZES.BASE,
  }
});

const mapStateToProps = (state) => ({
  userId: state.userSettings.user.id,
  userStorage: state.userStorage
});

const mapDispatchToProps = { getShoppingList, updateShoppingList, flashShoppingList };

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
