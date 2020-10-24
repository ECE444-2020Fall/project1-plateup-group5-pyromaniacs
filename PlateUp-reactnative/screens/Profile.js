import { HeaderHeight } from "../constants/utils";
import * as util from "../constants/utils";
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Block, Text, theme } from "galio-framework";
import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { StackActions } from '@react-navigation/native';
import { logout, LOGOUT_IPR, IDLE } from "../redux/features/user_settings"
import { connect } from "react-redux"

const { width, height } = Dimensions.get("screen");

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userSettings.user.name,
      email: this.props.userSettings.user.email,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userSettings.status === LOGOUT_IPR && this.props.userSettings.status === IDLE) {
      if (this.props.userSettings.user !== null) {
        util.toast(this.props.userSettings.error);
      }
      else {
        util.toast("Logged out successfully!");
        this.props.navigation.dispatch(StackActions.popToTop())
      }
    }
  }

  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image source={{ uri: Images.ProfilePicture }} style={styles.avatar} />
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {this.state.name}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      {this.state.email}
                    </Text>
                  </Block>
                </Block>
                <Block style={styles.info}>
                  <Block middle row style={{ marginTop: 20, paddingBottom: 24 }} >
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}
                      onPress={() => this.props.logout(null)}
                    >
                      LOG OUT
                    </Button>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
    flex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
});

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings
  }
}

const mapDispatchToProps = {
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);