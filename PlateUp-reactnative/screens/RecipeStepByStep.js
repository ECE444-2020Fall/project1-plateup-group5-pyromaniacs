import { Block, Text, theme } from 'galio-framework';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { ProgressButton } from 'react-native-progress-button';
import { argonTheme } from '../constants';
import { width } from '../constants/utils';

const DEFAULT_STEP_TIME = 10000;

class RecipeStepByStep extends React.Component {
  constructor(props) {
    super(props);

    const { recipeDetails: { data: { recipe_instruction: steps } } } = this.props;

    // The fields in the stepProgress are props related to the ProgressButton component
    // Documentation on it can be found at: https://github.com/xinghui0000/react-native-progress-button
    this.state = {
      currentStep: 1,
      maxStep: steps.length,
      stepProgress: {
        buttonState: 'static', // Initially, the button is static when the progress has not begun
        progress: 0,
        paused: false,
        text: 'Pause Timer',
        timingConfig: {
          duration: (steps[0].time ? steps[0].time * 1000 : DEFAULT_STEP_TIME)
        },
      },
      stepDetails: steps[0],
      cookingComplete: false
    };
  }

  componentDidMount() {
    this.startStepTimer();
  }

  startStepTimer = () => {
    const { stepDetails } = this.state;

    // Animation starts by going from static state to progress state
    this.setState({
      stepProgress: {
        buttonState: 'progress',
        progress: 100, // This value is basically the end value the animation goes till
        paused: false,
        text: 'Pause Timer',
        timingConfig: {
          duration: stepDetails.time ? stepDetails.time * 1000 : DEFAULT_STEP_TIME
        },
      }
    });
  }

  pauseStepTimer = () => {
    const { stepProgress } = this.state;

    this.setState({
      stepProgress: {
        ...stepProgress,
        paused: true, // To pause the animation, we can simply set paused to true
        text: 'Resume Timer'
      }
    });
  }

  toggleStepTimer = () => {
    const { stepProgress } = this.state;

    if (stepProgress.paused) {
      this.startStepTimer();
    } else {
      this.pauseStepTimer();
    }
  }

  incrementStep = () => {
    const { recipeDetails: { data: { recipe_instruction: steps } } } = this.props;
    const { currentStep, maxStep, stepProgress } = this.state;

    if (currentStep < maxStep) {
      const nextStep = currentStep + 1;

      this.setState({
        currentStep: nextStep,
        stepDetails: steps[nextStep - 1],
        stepProgress: {
          ...stepProgress,
          buttonState: 'static', // We set the button state to static again to reset the animation
          progress: 0
        }
      }, this.startStepTimer);
    }
  }

  decrementStep = () => {
    const { recipeDetails: { data: { recipe_instruction: steps } } } = this.props;
    const { currentStep, stepProgress } = this.state;

    if (currentStep > 1) {
      const nextStep = currentStep - 1;

      this.setState({
        cookingComplete: false,
        currentStep: nextStep,
        stepDetails: steps[nextStep - 1],
        stepProgress: {
          ...stepProgress,
          buttonState: 'static', // We set the button state to static again to reset the animation
          progress: 0
        }
      }, this.startStepTimer);
    }
  }

  handleProgressAnimatedFinished = (progress) => {
    if (progress === 100) {
      const { currentStep, maxStep, stepProgress } = this.state;

      if (currentStep === maxStep) {
        this.setState({
          cookingComplete: true,
          stepProgress: {
            ...stepProgress,
            text: 'Cooking complete!' // Update the text on the 100% completed progress button
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

    if (imgs.length === 0) {
      return null;
    }

    return (
      <Block style={styles.sliderContainer}>
        <Swiper
          activeDotColor={argonTheme.COLORS.PRIMARY}
          autoplay
          index={0}
          key={imgs.length}
        >
          {imgs.map((image, index) => (
            // Reasonable to disable here as this is a static array
            // eslint-disable-next-line react/no-array-index-key
            <Block key={index} style={{ marginBottom: 50 }}>
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%' }}
              />
            </Block>
          ))}
        </Swiper>
      </Block>
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
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, marginRight: theme.SIZES.BASE }}
            center
            size={18}
            bold
          >
            {recipe.name}
          </Text>
          <Text center size={18} bold color={argonTheme.COLORS.BLUE}>
            {`Step ${currentStep}/${maxStep}`}
          </Text>
        </Block>

        <Block style={styles.card}>
          {this.renderImages()}
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
          <Block row>
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
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    elevation: 10,
    flex: 1
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
  sliderContainer: {
    height: '60%'
  },
  stepNavigation: {
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 12
  }
});

const mapStateToProps = (state) => ({
  recipeDetails: state.recipeDetails,
});

export default connect(mapStateToProps)(RecipeStepByStep);
