import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get("screen");

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    const { id } = props.route.params;
    console.log(props)

    this.state = {
      id: id,
    };
  }

  render() {
    return (
      <Block flex>
        <LinearGradient
          style={styles.gradientContainer}
          colors={[
            argonTheme.COLORS.GRADIENT_START,
            argonTheme.COLORS.GRADIENT_END,
          ]}
          // start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 0 }}
        >
          <Block style={{flex: 1}}>
            <Block flex style={styles.recipeCard}>
              <Block middle style={styles.recipeContainer}>
                <Image
                  source={{ uri: Images.ProfilePicture }}
                  style={styles.recipeImage}
                />
              </Block>
              <Block middle style={styles.recipeName}>
                <Text bold size={24}>
                  Recipe Name
                </Text>
              </Block>
              <Block middle>
                <Block style={styles.divider} />
              </Block>
              <Swiper
                paginationStyle={styles.paginationStyle}
                activeDotColor={argonTheme.COLORS.PRIMARY}
              >
                <Block>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.description}
                  >
                    <Block middle>
                      <Text size={16} style={{ textAlign: "center" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum lobortis justo et facilisis. Mauris nisl tortor, scelerisque a massa id, varius luctus tellus. Sed lacinia, erat id ornare sollicitudin, odio lacus vulputate nisl, quis convallis purus metus nec nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet blandit urna. Ut est nisi, pellentesque et bibendum in, sollicitudin ac velit. Maecenas in maximus nulla. Aenean a faucibus leo. Cras tempor facilisis rhoncus. Sed euismod ultrices quam nec convallis. Integer eros odio, hendrerit a augue in, fringilla sagittis erat. Maecenas hendrerit sollicitudin mauris, eget vulputate arcu.
                      </Text>
                    </Block>
                  </ScrollView>
                  <Block style={styles.info}>
                    <Block row space="between" style={{ marginHorizontal: 15 }}>
                      <Block middle>
                        <Text bold size={18}>2hr10</Text>
                        <Text size={12}>Cook Time</Text>
                      </Block>
                      <Block middle>
                        <Text bold size={18}>$10</Text>
                        <Text size={12}>Cost per Serving</Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
                <Block style={styles.instructions}>
                  <Text>Test</Text>
                </Block>
              </Swiper>
            </Block>
          </Block>
          <Block style={styles.stepByStepInstructions}>
            <Button
              style={styles.button}
            >
              <Text style={styles.buttonText}>Let's Go!</Text>
            </Button>
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
  },
  info: {
    paddingHorizontal: 40
  },
  recipeContainer: {
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
    marginTop: 5,
    marginBottom: 15,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  gradientContainer: {
    flex: 1,
  },
  description: {
    marginVertical: 25,
    marginHorizontal: 10,
    height: height * 0.275
  },
  instructions: {
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
    color: argonTheme.COLORS.BLACK,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginBottom: height * 0.05,
    backgroundColor: argonTheme.COLORS.BUTTON_COLOR
  },
  paginationStyle: {
    position: "absolute",
    bottom: 0
  },
});

export default Recipe;