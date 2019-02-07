import * as React from "react";
import { Facebook, Google } from "expo";
import { View, Text, StatusBar, ActivityIndicator } from "react-native";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons"; //https://expo.github.io/vector-icons/
import firebase from "firebase";
import { LinearGradient } from "expo";

import { connect } from "react-redux";
import { userActions } from "../../actions/userActions";

export interface Props {
  navigation: any;
  dispatch: Function;
}

export interface State {
  loading: boolean;
}

export class Login extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const user = {
      first_name: "jitin",
      last_name: "dodd",
      email: "jd@gmail.com"
      // password: "test123!"
    };

    this.props.dispatch(userActions.register(user));
  }

  checkIfLoggedIn = () => {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.props.navigation.navigate("App");
    //   } else {
    //   }
    // });
  };

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
        console.log("google result: ", result);

        const { idToken } = result;

        //sign into firebase
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .catch(err => {
            console.log(err);
          });

        this.props.navigation.navigate("App", {
          headerMode: "none",
          navigationOptions: {
            gesturesEnabled: false
          }
        });
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
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
      const { type, token, expires } = loginResponse;

      console.log("Login response from Facebook: ", loginResponse);

      if (type === "success") {
        console.log("success!");

        //sign into firebase
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        console.log("firebase credential: ", credential);

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .catch(err => {
            console.log(err);
          });

        //other posisbilities: name, gender, picture
        const fields = "id,first_name,last_name,email";

        // Get user data using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=${fields}&access_token=${token}`
        );

        const userData = await response.json();

        console.log("User Data: ", userData);

        this.props.navigation.navigate("App");
      } else {
        // type === 'cancel'
        console.log("cancel!");
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
        <Text style={{ fontSize: 35, color: "white", fontWeight: "400" }}>
          MedCare
        </Text>
      </View>
    );

    return (
      <LinearGradient
        style={{ flex: 1 }}
        // colors={["#0F2027", "#203A43", "#2C5364"]}
        colors={["#0f0c29", "#302b63", "#24243e"]}
        // colors={["#192f6a", "#3b5998"]}
        // colors={["#000428", "#004e92"]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
            // backgroundColor: "#0A0D32"
          }}
        >
          <StatusBar barStyle="light-content" />
          {this.state.loading ? (
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
    data: state
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
