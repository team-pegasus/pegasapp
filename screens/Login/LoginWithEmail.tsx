import * as React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity
} from "react-native";
import FormInput from "../../shared_components/FormInput";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { Header } from "react-navigation";

export interface Props {
  navigation: any;
}

export interface State {}

export default class LoginWithEmail extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Login",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0A0D32"
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onRegisterPress = () => {
    this.props.navigation.navigate("Register");
  };

  public render() {
    let title = (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <Text
          style={{
            fontSize: 50,
            color: "white",
            fontWeight: "100",
            fontFamily: "OriyaSangamMN"
          }}
        >
          WALK
        </Text>
        <Text
          style={{
            fontSize: 50,
            color: "#63c6ff",
            fontWeight: "100",
            fontFamily: "OriyaSangamMN"
          }}
        >
          IN
        </Text>
      </View>
    );
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0D32"
        }}
        keyboardVerticalOffset={Header.HEIGHT + 20} // adjust the value here if you need more padding
        behavior="padding"
      >
        {title}
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            width: "100%",
            padding: 20
          }}
        >
          <FormInput label={"Email"} textColor="white" borderColor="white" />
          <FormInput
            label={"Password"}
            textColor="white"
            borderColor="white"
            password
          />
          <ConfirmButton>
            <Text style={{ color: "white" }}>Sign in</Text>
          </ConfirmButton>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10
            }}
            onPress={this.onRegisterPress}
          >
            <Text style={{ color: "#31a6e9" }}>New User? Register here.</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const ConfirmButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #31a6e9;
  border-radius: 5px;
  width: auto;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 15px;
`;
