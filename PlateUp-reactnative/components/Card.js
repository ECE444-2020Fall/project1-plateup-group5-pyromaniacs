import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';


class Card extends React.Component {
  render() {
    const { navigation, item, tag, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, horizontal ? styles.cardHorizontal : styles.cardVertical, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.image}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>{item.title}</Text>
            <Block row space="between">
              <Text size={12} muted={!ctaColor} color={ctaColor} bold>{item.cta}</Text>
              { tag &&
                <Block row style={styles.tagContainer}>
                  {tag.icon && <Image source={require('../assets/imgs/timer.png')} style={styles.tagImage} />}
                  <Text size={12} style={styles.tagText}>{tag.text}</Text>
                </Block>
              }
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.defaultProps = {
  ctaColor: argonTheme.COLORS.SECONDARY,
  handlePress: null,
  imageStyle: {},
  tag: {
    icon: "wow",
    text: "3h21m"
  }
}

Card.propTypes = {
  ctaColor: PropTypes.string,
  full: PropTypes.bool,
  handlePress: PropTypes.func,
  horizontal: PropTypes.bool,
  imageStyle: PropTypes.any,
  item: PropTypes.object,
  tag: PropTypes.shape({
    icon: PropTypes.string,
    text: PropTypes.string
  })
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    marginBottom: 16
  },
  cardHorizontal: {
    maxHeight: 122,
  },
  cardVertical: {
    minHeight: 114,
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  fullImage: {
    height: 215
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  image: {
    // borderRadius: 3,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  tagImage: {
    height: 20,
    width: 20
  },
  tagText: {
    lineHeight: 20,
    color: argonTheme.COLORS.TEXT_COLOR
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  }
});

export default withNavigation(Card);