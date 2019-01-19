import * as React from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";

export interface Props {
  navigation: any;
}

export default class Settings extends React.Component<Props> {
  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      // navigate("Auth");
      this.props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 35 }}>Settings</Text>
        <Button title="Sign out" onPress={this.signOutUser} />
      </View>
    );
  }
}
