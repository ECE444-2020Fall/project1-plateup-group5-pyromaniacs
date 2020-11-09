import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { IngredientList } from '../components';
import { getGroceryInventory, updateGroceryInventory } from '../redux/features/user_storage';
import { argonTheme } from '../constants';

class GroceryInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const { getGroceryInventory: getGroceryInventoryRequest, userId } = this.props;
    await getGroceryInventoryRequest(userId);

    this.setState({ loading: false });
  }

  handleReload = async () => {
    const { getGroceryInventory: getGroceryInventoryRequest, userId } = this.props;

    this.setState({ loading: true }, async () => {
      await getGroceryInventoryRequest(userId);
      this.setState({ loading: false });
    });
  }

  handlePostInventory = async (newItems) => {
    const { updateGroceryInventory: updateGroceryInventoryRequest, userId } = this.props;

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
  container: {
    paddingVertical: theme.SIZES.BASE,
  }
});

const mapStateToProps = (state) => ({
  userId: state.userSettings.user.id,
  userStorage: state.userStorage
});

const mapDispatchToProps = { getGroceryInventory, updateGroceryInventory };

export default connect(mapStateToProps, mapDispatchToProps)(GroceryInventory);
