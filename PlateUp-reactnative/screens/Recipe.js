import { Button } from "../components";
import { argonTheme } from "../constants";
import { LinearGradient } from 'expo-linear-gradient';
import { Block, Text, theme } from "galio-framework";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux';
import { getRecipeDetails } from '../redux/features/get_recipe_details';

const { width, height } = Dimensions.get("screen");

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await this.props.getRecipeDetails(this.props.route.params.id);
    this.setState({ loading: false });
  }

  renderMainPage() {
    const recipe = this.props.recipeDetails.data.recipe_preview;

    return (
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.description}
        >
          <Block middle>
            <Text center size={16}>{recipe.preview_text}</Text>
          </Block>
        </ScrollView>
        <Block style={styles.info}>
          <Block row space="between" style={{ marginHorizontal: 15 }}>
            <Block middle>
              <Text bold size={18}>{recipe.time_h}hr{recipe.time_min}m</Text>
              <Text size={12}>Cook Time</Text>
            </Block>
            <Block middle>
              <Text bold size={18}>${(recipe.cost / 100).toFixed(2)}</Text>
              <Text size={12}>Cost per Serving</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }

  renderIngredients() {
    const ingredients = JSON.parse(this.props.recipeDetails.data.recipe_preview.ingredients);
    return (
      <Block style={styles.ingredients}>
        {
          Object.entries(ingredients).map( ([item, quantity], index) => (
            <Block key={index}>
              <Text size={16}>
                <Text bold>{item}</Text>
                <Text>{" "}{quantity}</Text>
              </Text>
            </Block>
          ))
        }
      </Block>
    );
  }

  renderInstructions() {
    const instructions = this.props.recipeDetails.data.recipe_instruction;

    return (
      <Block style={styles.instructions}>
        {
          instructions.map((instruction, index) => (
            <Block key={index}>
              <Text size={16}>
                <Text bold>{index+1}.</Text>
                <Text>{" "}{instruction.step_instruction}</Text>
              </Text>
            </Block>
          ))
        }
      </Block>
    );
  }

  renderContent() {
    const { error } = this.props.recipeDetails;

    if (error) {
      return (
        <Block flex style={styles.recipeCard}>
          <Text center> Something went wrong. </Text>
        </Block>
      );
    }

    const recipe = this.props.recipeDetails.data.recipe_preview;

    return (
      <Block flex style={styles.recipeCard}>
        <Block middle style={styles.recipeImageContainer}>
          <Image
            source={{ uri: recipe.preview_media_url }}
            style={styles.recipeImage}
          />
        </Block>
        <Block middle style={styles.recipeName}>
          <Text bold size={24}>{recipe.name}</Text>
        </Block>
        <Block middle>
          <Block style={styles.divider} />
        </Block>
        <Swiper
          paginationStyle={styles.paginationStyle}
          activeDotColor={argonTheme.COLORS.PRIMARY}
        >
          {this.renderMainPage()}
          {this.renderIngredients()}
          {this.renderInstructions()}
        </Swiper>
      </Block>
    );
  }

  render() {
    const { loading } = this.state;
    const { error } = this.props.recipeDetails;

    return (
      <Block flex>
        <LinearGradient
          style={{ flex: 1 }}
          colors={[
            argonTheme.COLORS.GRADIENT_START,
            argonTheme.COLORS.GRADIENT_END,
            argonTheme.COLORS.WHITE
          ]}
          locations={[0, 0.45, 0.45]}
        >
          { loading
            ?
            <Block flex style={styles.recipeCard}>
              <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
            </Block>
            :
            this.renderContent()
          }

          <Block style={styles.stepByStepInstructions}>
            { !loading && !error &&
              <Button
                style={styles.button}
              >
                <Text style={styles.buttonText}>Let's Go!</Text>
              </Button>
            }
          </Block>
        </LinearGradient>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  recipeCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    elevation: 10,
  },
  info: {
    paddingHorizontal: 40
  },
  recipeImageContainer: {
    position: "relative",
    marginTop: -80
  },
  recipeImage: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  recipeName: {
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    width: "90%",
    borderBottomColor: argonTheme.COLORS.GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  description: {
    marginVertical: 25,
    marginHorizontal: 10,
    height: height * 0.275,
  },
  instructions: {
    marginVertical: 25,
    marginHorizontal: 10,
    height: height * 0.275
  },
  ingredients: {
    marginVertical: 25,
    marginHorizontal: 10,
    height: height * 0.275
  },
  stepByStepInstructions: {
    alignItems: 'center',
    flex: 0.25,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: argonTheme.COLORS.WHITE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginBottom: height * 0.04,
    backgroundColor: argonTheme.COLORS.PRIMARY
  },
  paginationStyle: {
    position: "absolute",
    bottom: 0
  },
});

const mapStateToProps = (state) => ({
  recipeDetails: state.recipeDetails,
});

const mapDispatchToProps = { getRecipeDetails };

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);