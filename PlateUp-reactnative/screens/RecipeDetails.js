import { LinearGradient } from 'expo-linear-gradient';
import { Block, Text, theme } from 'galio-framework';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';

import { argonTheme } from '../constants';
import { Button } from '../components';
import { getRecipeDetails } from '../redux/features/get_recipe_details';

const { width, height } = Dimensions.get('screen');

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
        <Block flex style={[styles.recipeCard, { flex: 0.8 }]}>
          <Text center> Something went wrong. </Text>
        </Block>
      );
    }

    const { data: { recipe_preview: recipe } } = recipeDetails;

    return (
      <Block flex>
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
        <Block style={styles.stepByStepInstructions}>
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
              <Block flex style={[styles.recipeCard, { flex: 0.8 }]}>
                <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
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
    position: 'relative',
    marginTop: -80
  },
  recipeImage: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  recipeName: {
    margin: 10,
  },
  divider: {
    width: '90%',
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
    position: 'absolute',
    bottom: 0
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
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
