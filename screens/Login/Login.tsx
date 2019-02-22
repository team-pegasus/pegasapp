import * as React from "react";
import { Facebook, Google } from "expo";
import { View, Text, StatusBar, ActivityIndicator } from "react-native";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons"; //https://expo.github.io/vector-icons/
import { LinearGradient } from "expo";

import { connect } from "react-redux";
import { userActions } from "../../actions";

export interface Props {
  navigation: any;
  dispatch: Function;
  loggedIn: boolean;
  isLoading: boolean;
}

export class Login extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);
    if (props.loggedIn) this.navigateToLoggedInExperience();
  }

  componentWillReceiveProps(props: Props) {
    console.log("component receiving props: ", props);
    if (props.loggedIn) this.navigateToLoggedInExperience();
  }

  logInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "901411520285-nhnhkk5t6b6c7rll4t7qi02qo7iniq19.apps.googleusercontent.com",
        iosClientId:
          "901411520285-taih7lofpvqajbvfpk4c81a9juj0b04b.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("API: Google login success: ", result);

        const { user } = result;

        const { id, email, familyName, givenName } = user;

        this.props.dispatch(
          userActions.register({
            first_name: givenName,
            last_name: familyName,
            email: email || "",
            password: id
          })
        );
        return result;
      } else {
        console.log("API: Google login cancelled");
        return { cancelled: true };
      }
    } catch (e) {
      console.log("API: Google login failed");
      return { error: true };
    }
  };

  navigateToLoggedInExperience = () => {
    this.props.navigation.navigate("App", {
      headerMode: "none",
      navigationOptions: {
        gesturesEnabled: false
      }
    });
  };

  logInWithFacebook = async () => {
    try {
      const loginResponse = await Facebook.logInWithReadPermissionsAsync(
        "2379249225690629", //app ID
        {
          //other possibilities: user_gender, user_photos
          permissions: ["public_profile", "email"]
        }
      );

      const { type, token } = loginResponse;

      if (type === "success") {
        console.log("API: Facebook login success: ", loginResponse);

        // Get user data using Facebook's Graph API
        const fields = "id,first_name,last_name,email"; //other: name, gender, picture
        const response = await fetch(
          `https://graph.facebook.com/me?fields=${fields}&access_token=${token}`
        );

        const user = await response.json();
        console.log("API: Facebook user data: ", user);

        const { id, email, first_name, last_name } = user;

        this.props.dispatch(
          userActions.register({
            first_name,
            last_name,
            email,
            password: id
          })
        );
      } else {
        console.log("API: Facebook login canceled!");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  signInWithEmail = () => {
    this.props.navigation.navigate("LogInWithEmail", {
      headerMode: "float"
    });
  };

  renderButtons = () => (
    <View style={{ flex: 1 }}>
      <EmailButton onPress={this.signInWithEmail}>
        <FontAwesome
          name="envelope"
          size={26}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "white" }}>Sign in with email</Text>
      </EmailButton>
      <FacebookButton onPress={this.logInWithFacebook}>
        <FontAwesome
          name="facebook"
          size={32}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "white" }}>Sign in with Facebook</Text>
      </FacebookButton>
      <GoogleButton onPress={this.logInWithGoogle}>
        <FontAwesome
          name="google"
          size={32}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "white" }}>Sign in with Google</Text>
      </GoogleButton>
    </View>
  );

  render() {
    let title = (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 50,
            color: "white",
            fontWeight: "100",
            fontFamily: "Futura-Medium"
          }}
        >
          MedCare
        </Text>
      </View>
    );

    return (
      <LinearGradient style={{ flex: 1 }} colors={["#0f0c29", "#302b63"]}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <StatusBar barStyle="light-content" />
          {this.props.loading ? (
            <React.Fragment>
              {title}
              <ActivityIndicator size="large" style={{ flex: 1 }} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {title}
              {this.renderButtons()}
            </React.Fragment>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.user.loggedIn,
    loading: state.user.isLoading
  };
};

export default connect(mapStateToProps)(Login);

const EmailButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #31a6e9;
  border-radius: 5px;
  width: auto;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-left: 0;
  margin-top: 15px;
`;

const FacebookButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #3c5a99;
  border-radius: 5px;
  width: auto;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 15px;
`;

const GoogleButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #db3236;
  border-radius: 5px;
  width: auto;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 15px;
`;
