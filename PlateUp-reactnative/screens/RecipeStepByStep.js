import { Block, Text, theme } from 'galio-framework';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { ProgressButton } from 'react-native-progress-button';
import { argonTheme } from '../constants';
import { getRecipeDetails } from '../redux/features/get_recipe_details';

const { width } = Dimensions.get('screen');

class RecipeStepByStep extends React.Component {
  constructor(props) {
    super(props);

    const { recipeDetails: { data: { recipe_instruction: steps } } } = this.props;

    this.state = {
      currentStep: 1,
      maxStep: steps.length,
      stepProgress: {
        buttonState: 'static',
        progress: 0,
        paused: false,
        text: 'Pause Timer',
        timingConfig: {
          duration: (steps[0].time ? steps[0].time * 1000 : 3000)
        },
      },
      stepDetails: steps[0],
      cookingComplete: false
    };

    this.incrementStep = this.incrementStep.bind(this);
    this.decrementStep = this.decrementStep.bind(this);
    this.pauseStepTimer = this.pauseStepTimer.bind(this);
    this.startStepTimer = this.startStepTimer.bind(this);
    this.toggleStepTimer = this.toggleStepTimer.bind(this);
    this.handleProgressAnimatedFinished = this.handleProgressAnimatedFinished.bind(this);
  }

  componentDidMount() {
    this.startStepTimer();
  }

  startStepTimer() {
    const { stepDetails } = this.state;

    this.setState({
      stepProgress: {
        buttonState: 'progress',
        progress: 100,
        paused: false,
        text: 'Pause Timer',
        timingConfig: {
          duration: stepDetails.time ? stepDetails.time * 1000 : 3000
        },
      }
    });
  }

  pauseStepTimer() {
    const { stepProgress } = this.state;

    this.setState({
      stepProgress: {
        ...stepProgress,
        paused: true,
        text: 'Resume Timer'
      }
    });
  }

  toggleStepTimer() {
    const { stepProgress } = this.state;

    if (stepProgress.paused) {
      this.startStepTimer();
    } else {
      this.pauseStepTimer();
    }
  }

  incrementStep() {
    const { recipeDetails: { data: { recipe_instruction: instructions } } } = this.props;
    const { currentStep, maxStep, stepProgress } = this.state;

    if (currentStep < maxStep) {
      this.setState({
        cookingComplete: false,
        currentStep: currentStep + 1,
        stepDetails: instructions[currentStep + 1 - 1], // Array index starts at 0
        stepProgress: {
          ...stepProgress,
          buttonState: 'static',
          progress: 0
        }
      }, this.startStepTimer);
    }
  }

  decrementStep() {
    const { recipeDetails: { data: { recipe_instruction: instructions } } } = this.props;
    const { currentStep, stepProgress } = this.state;

    if (currentStep > 1) {
      this.setState({
        cookingComplete: false,
        currentStep: currentStep - 1,
        stepDetails: instructions[currentStep - 1 - 1], // Array index starts at 0
        stepProgress: {
          ...stepProgress,
          buttonState: 'static',
          progress: 0
        }
      }, this.startStepTimer);
    }
  }

  handleProgressAnimatedFinished(progress) {
    if (progress === 100) {
      const { currentStep, maxStep, stepProgress } = this.state;

      if (currentStep === maxStep) {
        this.setState({
          cookingComplete: true,
          stepProgress: {
            ...stepProgress,
            text: 'Cooking complete!'
          }
        });
      } else {
        this.incrementStep();
      }
    }
  }

  renderImages() {
    const { stepDetails: { ingredients, equipment } } = this.state;

    const imgs = [];

    equipment.forEach((item) => {
      imgs.push(item.img);
    });

    ingredients.forEach((ingredient) => {
      imgs.push(ingredient.img);
    });

    return (
      imgs.map((image) => (
        <Block style={{ marginBottom: 50 }}>
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: '100%' }}
          />
        </Block>
      ))
    );
  }

  render() {
    const {
      cookingComplete, currentStep, maxStep, stepDetails, stepProgress
    } = this.state;

    const { recipeDetails: { data: { recipe_preview: recipe } } } = this.props;

    return (
      <Block flex style={styles.container}>
        <Block row style={styles.header}>
          <Text center size={18} bold>
            {recipe.name}
          </Text>
          <Text center size={18} bold color={argonTheme.COLORS.BLUE}>
            {`Step ${currentStep}/${maxStep}`}
          </Text>
        </Block>

        <Block style={styles.card}>
          <Block style={{ height: '60%' }}>
            <Swiper
              activeDotColor={argonTheme.COLORS.PRIMARY}
              autoplay={true}
              index={0}
              key={stepDetails.equipment.length + stepDetails.ingredients.length}
            >
              {this.renderImages()}
            </Swiper>
          </Block>

          <ScrollView>
            <Text size={16}>
              {stepDetails.step_instruction}
            </Text>
          </ScrollView>
        </Block>

        <Block center style={styles.footer}>
          <ProgressButton
            style={styles.button}
            progressColor={argonTheme.COLORS.PRIMARY}
            unfilledColor={argonTheme.COLORS.PRIMARY_LIGHT}
            progress={stepProgress.progress}
            text={stepProgress.text}
            buttonState={stepProgress.buttonState}
            timingConfig={stepProgress.timingConfig}
            paused={stepProgress.paused}
            onPress={() => (!cookingComplete && this.toggleStepTimer())}
            onProgressAnimatedFinished={(progress) => this.handleProgressAnimatedFinished(progress)}
          />
          <Block row style={styles.stepNavigation}>
            <TouchableOpacity style={styles.stepNavigation} onPress={this.decrementStep}>
              <Text bold color={argonTheme.COLORS.SECONDARY}>
                Previous Step
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stepNavigation} onPress={this.incrementStep}>
              <Text bold color={argonTheme.COLORS.SECONDARY}>
                Next Step
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    borderColor: argonTheme.COLORS.PRIMARY_LIGHT,
    borderRadius: 3,
    borderWidth: 0,
    backgroundColor: argonTheme.COLORS.PRIMARY_LIGHT,
    padding: 2,
  },
  card: {
    padding: theme.SIZES.BASE,
    marginVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    elevation: 10,
    height: '75%'
  },
  container: {
    marginHorizontal: theme.SIZES.BASE,
    marginVertical: theme.SIZES.BASE
  },
  footer: {
    marginVertical: theme.SIZES.BASE
  },
  header: {
    justifyContent: 'space-between'
  },
  stepNavigation: {
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 6
  }
});

const mapStateToProps = (state) => ({
  recipeDetails: state.recipeDetails,
});

const mapDispatchToProps = { getRecipeDetails };

export default connect(mapStateToProps, mapDispatchToProps)(RecipeStepByStep);
