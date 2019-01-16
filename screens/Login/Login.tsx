import * as React from "react";
import { Facebook, Google } from "expo";
import { View, Text } from "react-native";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons"; //https://expo.github.io/vector-icons/

export interface LoginProps {
  navigation: any;
}

export default class Login extends React.Component<LoginProps> {
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
        this.props.navigation.navigate("App");
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

      if (type === "success") {
        console.log("success!");

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

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0D32"
        }}
      >
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 35, color: "white", fontWeight: "400" }}>
            MedCare
          </Text>
        </View>
        <View style={{ flex: 1 }}>
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
      </View>
    );
  }
}

const FacebookButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #3c5a99;
  border-radius: 5px;
  width: auto;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;

const GoogleButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #db3236;
  border-radius: 5px;
  width: auto;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;
