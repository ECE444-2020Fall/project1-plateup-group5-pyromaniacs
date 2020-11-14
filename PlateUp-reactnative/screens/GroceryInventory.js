import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Block, Text } from 'galio-framework';

import { IngredientList } from '../components';
import { getGroceryInventory, updateGroceryInventory } from '../redux/features/user_storage';
import { argonTheme } from '../constants';

class GroceryInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const { getGroceryInventory: getGroceryInventoryRequest, user: { id: userId } } = this.props;

    await getGroceryInventoryRequest(userId);

    this.setState({ loading: false });
  }

  handleReload = async () => {
    const { getGroceryInventory: getGroceryInventoryRequest, user: { id: userId } } = this.props;

    this.setState({ loading: true }, async () => {
      await getGroceryInventoryRequest(userId);
      this.setState({ loading: false });
    });
  }

  handlePostInventory = async (newItems) => {
    const {
      updateGroceryInventory: updateGroceryInventoryRequest, user: { id: userId }
    } = this.props;

    this.setState({ loading: true }, async () => {
      await updateGroceryInventoryRequest({
        userId, data: { inventory: newItems }
      });
      this.setState({ loading: false });
    });
  }

  renderContent() {
    const { userStorage: { error, groceryInventory } } = this.props;

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
      <IngredientList
        items={groceryInventory || {}}
        onAddItem={this.handlePostInventory}
        onDeleteItem={this.handlePostInventory}
      />
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

const mapStateToProps = (state) => ({
  user: state.userSettings.user,
  userStorage: state.userStorage
});

const mapDispatchToProps = { getGroceryInventory, updateGroceryInventory };

export default connect(mapStateToProps, mapDispatchToProps)(GroceryInventory);
