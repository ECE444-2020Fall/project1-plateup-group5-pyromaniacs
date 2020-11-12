import React from 'react';
import {
  ActivityIndicator, Dimensions, ScrollView, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Block, theme, Text } from 'galio-framework';
import deepEqual from 'deep-equal';
import { Card } from '../components';
import { fetchBrowseRecipes } from '../redux/features/browse_recipes';
import { argonTheme } from '../constants';

const { width } = Dimensions.get('screen');

class BrowseRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const {
      filterSettings, searchQuery, user: { id: userId },
      fetchBrowseRecipes: fetchBrowseRecipesRequest
    } = this.props;

    await fetchBrowseRecipesRequest({
      filterSettings,
      searchQuery,
      userId
    });

    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    // If the previous state was not loading, this flow was triggered because of prop updates
    // This means that the data is stale and we need to fetch it again
    // Set state to loading and since setState isn't synchronous, pass a callback function to it
    // The callback function fetches the data, once the data is fetched, set loading to false
    const {
      filterSettings, searchQuery, user: { id: userId },
      fetchBrowseRecipes: fetchBrowseRecipesRequest
    } = this.props;

    if (
      !prevState.loading
      && (
        !deepEqual(prevProps.filterSettings, filterSettings)
        || prevProps.searchQuery !== searchQuery
      )
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: true }, async () => {
        await fetchBrowseRecipesRequest({
          filterSettings,
          searchQuery,
          userId
        });

        this.setState({ loading: false });
      });
    }
  }

  renderContent() {
    const { browseRecipes: { error } } = this.props;

    if (error) {
      return <Text center> Something went wrong. </Text>;
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.browsingContainer}
      >
        <Block flex>
          {this.renderRecipes()}
        </Block>
      </ScrollView>
    );
  }

  renderRecipes() {
    const { browseRecipes: { data: { recipes, isRandom } }, searchQuery, navigation } = this.props;

    if (!recipes || recipes.length === 0) {
      return <Text center> No recipes found with given filters. </Text>;
    }

    const recipeItems = [];

    recipes.forEach((recipe) => {
      recipeItems.push({
        id: recipe.id,
        title: recipe.name,
        image: recipe.preview_media_url,
        cta: 'View recipe',
        tag: {
          text: `${recipe.time_h}hr${recipe.time_min}m`,
          icon: {
            name: 'clock',
            family: 'Foundation',
            color: argonTheme.COLORS.TEXT_COLOR
          }
        }
      });
    });

    return (
      <Block>
        { isRandom && !!searchQuery.trim()
          && (
            <Text style={{ paddingBottom: theme.SIZES.BASE }} center>
              No recipes found for search query. Showing random results with given filters.
            </Text>
          )}
        { recipeItems.map((recipeItem) => (
          <Card
            key={recipeItem.id}
            item={recipeItem}
            horizontal
            handlePress={() => navigation.navigate('Recipe', { id: recipeItem.id })}
          />
        ))}
      </Block>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <Block flex center style={styles.browsingContainer}>
        { loading
          ? <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
          : this.renderContent()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  recipes: {
    width,
  },
  browsingContainer: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

const mapStateToProps = (state) => ({
  browseRecipes: state.browseRecipes,
  filterSettings: state.filterSettings,
  searchQuery: state.searchQuery,
  user: state.userSettings.user
});

const mapDispatchToProps = { fetchBrowseRecipes };

export default connect(mapStateToProps, mapDispatchToProps)(BrowseRecipes);
