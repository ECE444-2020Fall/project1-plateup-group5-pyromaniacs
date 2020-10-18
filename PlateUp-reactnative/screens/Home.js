import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Block, theme, Text } from 'galio-framework';
import { Card } from '../components';
import articles from '../constants/articles';
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

  render() {
    const recipePreviews = this.props.recipes;
    const loading = recipePreviews.status === "idle" || recipePreviews.status === "fetching";
    const error = recipePreviews && recipePreviews.error

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
              contentContainerStyle={styles.articles}>
              <Block flex>
                <Card item={articles[0]} horizontal />
                <Block flex row>
                  <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
                  <Card item={articles[2]} />
                </Block>
                <Card item={articles[3]} horizontal />
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
