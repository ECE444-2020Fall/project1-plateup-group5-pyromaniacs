import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Block, theme, Text } from 'galio-framework';
import { Card } from '../components';
import { fetchBrowseRecipes } from '../features/browse_recipes';
import { argonTheme } from '../constants';
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
    this.props.fetchBrowseRecipes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading == true && this.props.browseRecipes.status == "failure") {
      this.setState({ loading: false, error: "Something went wrong." })
    }
    else if (prevState.loading == true && this.props.browseRecipes.status == "success") {
      this.setState({ loading: false })
    }
  }

  renderRecipes() {
    const recipes = this.props.browseRecipes.data.recipes;
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
    const loading = this.state.loading;
    const error = this.state.error;

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
              contentContainerStyle={styles.browsingContainer}
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
    browseRecipes: state.browseRecipes
  }
}

const mapDispatchToProps = { fetchBrowseRecipes };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
