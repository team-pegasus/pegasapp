import * as React from "react";
import { Facebook } from "expo";
import { View, Button, Text } from "react-native";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons"; //https://expo.github.io/vector-icons/

export interface LoginProps {
  navigation: any;
}

export default class Login extends React.Component<LoginProps, any> {
  constructor(props: LoginProps) {
    super(props);
  }

  logIn = async () => {
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FacebookButton onPress={this.logIn}>
          <FontAwesome
            name="facebook"
            size={32}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "white" }}>Sign in with Facebook</Text>
        </FacebookButton>
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
