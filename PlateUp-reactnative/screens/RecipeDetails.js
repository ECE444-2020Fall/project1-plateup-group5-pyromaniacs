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

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await this.props.getRecipeDetails(this.props.route.params.id);
    this.setState({ loading: false });
  }

  renderRecipeOverview() {
    const recipe = this.props.recipeDetails.data.recipe_preview;

    return (
      <Block>
        <Text style={styles.subtitle}> Description </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.descriptionContainer}
        >
          <Block middle>
            <Text center style={styles.mainText}>{recipe.preview_text}</Text>
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
    const ingredients = this.props.recipeDetails.data.recipe_preview.ingredients;

    return (
      <Block>
        <Text style={styles.subtitle}> Ingredients </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.infoContainer}
        >
          {
            Object.entries(ingredients).map( ([item, quantity], index) => (
              <Block key={index}>
                <Text style={styles.mainText}>
                  <Text bold>{index+1}.{" "}{item}:</Text>
                  <Text>{" "}{quantity}</Text>
                </Text>
              </Block>
            ))
          }
      </ScrollView>
      </Block>
      
    );
  }

  renderInstructions() {
    const instructions = this.props.recipeDetails.data.recipe_instruction;

    return (
      <Block>
        <Text style={styles.subtitle}> Instructions </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.infoContainer}
        >
          {
            instructions.map((instruction, index) => (
              <Block key={index}>
                <Text style={styles.mainText}>
                  <Text bold>{index+1}.</Text>
                  <Text>{" "}{instruction.step_instruction}</Text>
                </Text>
              </Block>
            ))
          }
        </ScrollView>
      </Block>
    );
  }

  renderContent() {
    const { error } = this.props.recipeDetails;

    if (error) {
      return (
        <Block flex style={[styles.recipeCard, { flex: 0.8 }]}>
          <Text center> Something went wrong. </Text>
        </Block>
      );
    }

    const recipe = this.props.recipeDetails.data.recipe_preview;

    return (
      <Block flex>
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
            loop={false}
          >
            {this.renderRecipeOverview()}
            {this.renderIngredients()}
            {this.renderInstructions()}
          </Swiper>
        </Block>
        <Block style={styles.stepByStepInstructions}>
          <Button style={styles.button}>
            <Text style={styles.buttonText}>Let's Go!</Text>
          </Button>
        </Block>
      </Block>
    );
  }

  render() {
    const { loading } = this.state;

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
            <Block flex style={[styles.recipeCard, { flex: 0.8 }]}>
              <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
            </Block>
            :
            this.renderContent()
          }
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
  descriptionContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    height: height * 0.29
  },
  infoContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    height: height * 0.345
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
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: "center",
    color: argonTheme.COLORS.TEXT_COLOR,
    marginVertical: 10,
  },
  mainText: {
    fontSize: 16,
    color: argonTheme.COLORS.TEXT_COLOR,
    paddingBottom: 4,
  }
});

const mapStateToProps = (state) => ({
  recipeDetails: state.recipeDetails,
});

const mapDispatchToProps = { getRecipeDetails };

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);