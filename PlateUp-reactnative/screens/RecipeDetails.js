import { LinearGradient } from 'expo-linear-gradient';
import { Block, Text, theme } from 'galio-framework';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';

import { argonTheme } from '../constants';
import { height, width } from '../constants/utils';
import { Button } from '../components';
import { getRecipeDetails } from '../redux/features/get_recipe_details';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const {
      route: { params: { id: recipeId } }, getRecipeDetails: fetchRecipeDetails
    } = this.props;

    await fetchRecipeDetails(recipeId);
    this.setState({ loading: false });
  }

  renderRecipeOverview() {
    const { recipeDetails: { data: { recipe_preview: recipe } } } = this.props;

    return (
      <Block>
        <Text style={styles.subtitle}> Description </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.descriptionContainer}
        >
          <Block middle>
            <HTML html={recipe.preview_text} baseFontStyle={styles.mainText} />
          </Block>
        </ScrollView>
        <Block style={styles.info}>
          <Block row space="between" style={{ marginHorizontal: 15 }}>
            <Block middle>
              <Text bold size={18}>
                {recipe.time_h}
                hr
                {recipe.time_min}
                m
              </Text>
              <Text size={12}>Cook Time</Text>
            </Block>
            <Block middle>
              <Text bold size={18}>
                $
                {(recipe.cost / 100).toFixed(2)}
              </Text>
              <Text size={12}>Cost per Serving</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }

  renderIngredients() {
    const { recipeDetails: { data: { recipe_preview: { ingredients } } } } = this.props;

    return (
      <Block>
        <Text style={styles.subtitle}> Ingredients </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.infoContainer}
        >
          {
            Object.entries(ingredients).map(([item, quantity], index) => (
              // Reasonable to disable here as this is a static array
              // eslint-disable-next-line react/no-array-index-key
              <Block key={index}>
                <Text style={styles.mainText}>
                  <Text bold>
                    {index + 1}
                    .
                    {' '}
                    {item}
                    :
                  </Text>
                  <Text>
                    {' '}
                    {quantity}
                  </Text>
                </Text>
              </Block>
            ))
          }
        </ScrollView>
      </Block>

    );
  }

  renderInstructions() {
    const { recipeDetails: { data: { recipe_instruction: instructions } } } = this.props;

    return (
      <Block>
        <Text style={styles.subtitle}> Instructions </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.infoContainer}
        >
          {
            instructions.map((instruction, index) => (
              // Reasonable to disable here as this is a static array
              // eslint-disable-next-line react/no-array-index-key
              <Block key={index}>
                <Text style={styles.mainText}>
                  <Text bold>
                    {index + 1}
                    .
                  </Text>
                  <Text>
                    {' '}
                    {instruction.step_instruction}
                  </Text>
                </Text>
              </Block>
            ))
          }
        </ScrollView>
      </Block>
    );
  }

  renderContent() {
    const { recipeDetails, navigation, route: { params: { id: recipeId } } } = this.props;

    if (recipeDetails.error) {
      return (
        <Block style={{ height: height * 0.9 }}>
          <Block flex style={styles.recipeCard}>
            <Text center> Something went wrong. </Text>
          </Block>
        </Block>
      );
    }

    const { data: { recipe_preview: recipe } } = recipeDetails;

    return (
      <Block style={{ height: height * 0.9 }}>
        <Block flex style={styles.recipeCard}>
          <Block middle style={styles.recipeImageContainer}>
            <Image
              source={{ uri: recipe.preview_media_url }}
              style={styles.recipeImage}
            />
          </Block>
          <Block middle>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={styles.recipeName}
            >
              <Text bold size={24}>{recipe.name}</Text>
            </ScrollView>
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
        <Block flex style={styles.stepByStepInstructions}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('RecipeStepByStep', { id: recipeId })}
          >
            <Text style={styles.buttonText}>Let&apos;s Go!</Text>
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
          {loading
            ? (
              <Block style={{ height: height * 0.9 }}>
                <Block flex style={styles.recipeCard}>
                  <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                </Block>
              </Block>
            )
            : this.renderContent()}
        </LinearGradient>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  recipeCard: {
    padding: theme.SIZES.BASE * 1,
    marginHorizontal: width * 0.04,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    elevation: 10,
  },
  info: {
    marginTop: 5,
    paddingHorizontal: 40,
    height: height * 0.06,
  },
  recipeImageContainer: {
    position: 'relative',
    marginTop: -80
  },
  recipeImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 62,
    borderWidth: 0
  },
  recipeName: {
    margin: theme.SIZES.BASE * 0.5,
  },
  divider: {
    width: '90%',
    borderBottomColor: argonTheme.COLORS.GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  descriptionContainer: {
    marginVertical: 10,
    height: height * 0.36,
  },
  infoContainer: {
    marginVertical: 10,
    height: height * 0.43
  },
  stepByStepInstructions: {
    paddingTop: height * 0.02,
    alignItems: 'center',
    flex: 0.175,
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: argonTheme.COLORS.WHITE,
  },
  button: {
    width: width * 0.8,
    height: height * 0.07,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: argonTheme.COLORS.PRIMARY
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 0,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: argonTheme.COLORS.TEXT_COLOR,
    marginTop: 10,
  },
  mainText: {
    fontSize: 15,
    color: argonTheme.COLORS.TEXT_COLOR,
    paddingBottom: 4,
  }
});

const mapStateToProps = (state) => ({
  recipeDetails: state.recipeDetails,
});

const mapDispatchToProps = { getRecipeDetails };

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
