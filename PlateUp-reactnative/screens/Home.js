import React from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Block, theme, Text } from 'galio-framework';
import { Card } from '../components';
import { fetchBrowseRecipes } from '../redux/features/browse_recipes';
import { argonTheme } from '../constants';
import deepEqual from 'deep-equal';

const { width } = Dimensions.get('screen');

class Home extends React.Component {

  componentDidMount() {
    this.props.fetchBrowseRecipes({
      filterSettings: this.props.filterSettings,
      searchQuery: this.props.searchQuery
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.browseRecipes.status === "success" && 
      (!deepEqual(prevProps.filterSettings, this.props.filterSettings) || prevProps.searchQuery !== this.props.searchQuery)
    ) {
      this.props.fetchBrowseRecipes({
        filterSettings: this.props.filterSettings,
        searchQuery: this.props.searchQuery
      });
    }
  }

  renderContent(status) {
    switch (status) {
      case 'idle':
      case 'fetching':
        return <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />;
      case 'failed':
        return <Text center> Something went wrong. </Text>;
      case 'success':
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
  }

  renderRecipes() {
    const recipes = this.props.browseRecipes.data.recipes;

    if (!recipes || recipes.length == 0) {
      return <Text> No recipes found with given filters and search query. </Text>;
    }

    let recipeItems = [];

    for (let recipe of recipes) {
      recipeItems.push({
        id: recipe.recipe_id,
        title: recipe.name,
        image: recipe.preview_media_url,
        cta: "View recipe",
        tag: {
          text: `${recipe.time_h}hr${recipe.time_min}m`,
          icon: {
            name: "clock",
            family: "Foundation",
            color: argonTheme.COLORS.TEXT_COLOR
          }
        }
      })
    };

    const cardsToRender = recipeItems.map((recipeItem, index) => 
      <Card key={index} item={recipeItem} horizontal />
    );

    return cardsToRender;
  }

  render() {
    const status = this.props.browseRecipes.status;

    return (
      <Block flex center style={styles.browsingContainer}>
        {this.renderContent(status)}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  recipes: {
    width: width,
  },
  browsingContainer: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

const mapStateToProps = (state) => {
  return {
    browseRecipes: state.browseRecipes,
    filterSettings: state.filterSettings,
    searchQuery: state.searchQuery
  }
}

const mapDispatchToProps = { fetchBrowseRecipes };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
