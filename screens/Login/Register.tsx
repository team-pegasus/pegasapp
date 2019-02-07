import * as React from "react";
import { View, KeyboardAvoidingView, Text } from "react-native";
import FormInput from "../../shared_components/FormInput";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { Header } from "react-navigation";

export interface Props {}

export interface State {}

export default class Register extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Register",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0A0D32"
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
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
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            width: "100%",
            padding: 20
          }}
        >
          <FormInput
            label={"First Name"}
            textColor="white"
            borderColor="white"
          />
          <FormInput
            label={"Last Name"}
            textColor="white"
            borderColor="white"
          />
          <FormInput label={"Email"} textColor="white" borderColor="white" />
          <FormInput
            label={"Password"}
            textColor="white"
            borderColor="white"
            password
          />
          <FormInput
            label={"Confirm Password"}
            textColor="white"
            borderColor="white"
            password
          />
          <ConfirmButton>
            <Text style={{ color: "white" }}>Sign up</Text>
          </ConfirmButton>
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
