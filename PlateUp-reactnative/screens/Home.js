import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Block, theme, Text } from 'galio-framework';
import { Card } from '../components';
import { fetchRecipePreviews } from '../features/recipes_preview';
const { width } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.props.fetchRecipePreviews()
  }

  renderRecipes() {
    const recipes = this.props.recipes.recipePreviews.recipes
    let recipeItems = []

    for (let recipe of recipes) {
      recipeItems.push({
        id: recipe.recipe_id,
        title: recipe.name,
        image: recipe.preview_media_url,
        cta: "View recipe",
        tag: {
          text: `${recipe.time_h}hr${recipe.time_min}m`,
          icon: require("../assets/imgs/timer.png")
        }
      })
    }

    const cardsToRender = recipeItems.map((recipeItem, index) => 
      <Card key={index} item={recipeItem} horizontal />
    )

    return cardsToRender;
  }

  render() {
    const recipePreviews = this.props.recipes;
    const loading = recipePreviews.status === "idle" || recipePreviews.status === "fetching";
    const error = recipePreviews && recipePreviews.error;

    console.log(recipePreviews)

    return (
        <Block flex center style={styles.home}>
          { loading && 
            <Text center> Loading... </Text>
          }
          { !loading && (error ? 
            <Text center> Something went wrong </Text>
            :
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.articles}
            >
              <Block flex>
                {this.renderRecipes()}
              </Block>
            </ScrollView>
          )}
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

const mapStateToProps = (state) => {
  return {
    recipes: state.recipePreviews
  }
}

const mapDispatchToProps = { fetchRecipePreviews };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
