import * as React from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { userActions } from "../../actions/userActions";

export interface Props {
  dispatch: Function;
  navigation: any;
}

class Settings extends React.Component<Props> {
  signOutUser = async () => {
    this.props.dispatch(userActions.logout());
    this.props.navigation.navigate("Login");
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

export default connect()(Settings);
