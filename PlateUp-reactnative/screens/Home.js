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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await this.props.fetchBrowseRecipes({
      filterSettings: this.props.filterSettings,
      searchQuery: this.props.searchQuery
    });

    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    // If the previous state was not loading, this flow was triggered because of filter / search query updates
    // This means that the data is stale and we need to fetch it again
    // Set state to loading = true and since React setState isn't synchronous, pass a callback function to it
    // The callback function fetches the data, once the data is fetched, set loading to false
    if (
      !prevState.loading
      && (!deepEqual(prevProps.filterSettings, this.props.filterSettings) || prevProps.searchQuery !== this.props.searchQuery)
    ) {
      this.setState({ loading: true }, async () => {
        await this.props.fetchBrowseRecipes({
          filterSettings: this.props.filterSettings,
          searchQuery: this.props.searchQuery
        });

        this.setState({ loading: false });
      });
    }
  }

  renderContent() {
    const { error } = this.props.browseRecipes;

    if (error) {
      return <Text center> Something went wrong. </Text>;
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.browsingContainer}
      >
        <Block flex>
          { this.renderRecipes() }
        </Block>
      </ScrollView>
    );
  }

  renderRecipes() {
    const { recipes, is_random } = this.props.browseRecipes.data;

    if (!recipes || recipes.length == 0) {
      return <Text center> No recipes found with given filters. </Text>;
    }

    const recipeItems = [];

    for (const recipe of recipes) {
      recipeItems.push({
        id: recipe.recipe_id,
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
    }

    return (
      <Block>
        { is_random && !!this.props.searchQuery.trim() &&
          <Text style={{ paddingBottom: theme.SIZES.BASE }} center>
            No recipes found for search query. Showing random results with given filters.
          </Text> 
        }
        { recipeItems.map((recipeItem, index) => <Card key={index} item={recipeItem} horizontal />) }
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
  searchQuery: state.searchQuery
});

const mapDispatchToProps = { fetchBrowseRecipes };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
