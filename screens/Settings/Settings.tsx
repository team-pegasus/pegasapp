import * as React from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";
import { connect } from "react-redux";
import { userActions } from "../../actions/userActions";

export interface Props {
  dispatch: Function;
  navigation: any;
}

export interface ListItemProps {
  first: boolean;
  last: boolean;
  text: string;
  onPress: any;
}

class ListItem extends React.Component<ListItemProps> {
  render() {
    const { first, last, text, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            paddingHorizontal: 20,
            borderTopWidth: first ? 1 : 0,
            borderBottomWidth: last ? 1 : 0,
            borderColor: "#d3d3d3"
          }}
        >
          <View
            style={{
              borderBottomWidth: last ? 0 : 1,
              borderColor: "#d3d3d3",
              paddingVertical: 20,
              flex: 1
            }}
          >
            <Text style={{ fontSize: 16 }}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

class Settings extends React.Component<Props> {
  signOutUser = async () => {
    this.props.dispatch(userActions.logout());
    this.props.navigation.navigate("Login");
  };

  itemStrings = [
    { text: "My Profile Settings" },
    { text: "Edit Profile Picture" },
    { text: "Push Notifications" },
    { text: "Sign Out", onPress: this.signOutUser }
  ];

  supportStrings = [{ text: "Report a Problem" }, { text: "Privacy Policy" }];

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "#F4F2F1" }}
      >
        <StatusBar barStyle="dark-content" />
        <Text
          style={{
            fontSize: 30,
            padding: 20,
            paddingTop: 30,
            fontWeight: "bold"
          }}
        >
          Settings
        </Text>
        <Text
          style={{ fontSize: 20, padding: 20, paddingTop: 0, color: "grey" }}
        >
          Profile
        </Text>
        {this.itemStrings.map((item: any, idx: number) => (
          <ListItem
            first={idx == 0}
            last={idx == this.itemStrings.length - 1}
            key={item.text}
            text={item.text}
            onPress={item.onPress}
          />
        ))}
        <Text style={{ fontSize: 20, padding: 20, color: "grey" }}>
          Support
        </Text>
        {this.supportStrings.map((item: any, idx: number) => (
          <ListItem
            first={idx == 0}
            last={idx == this.supportStrings.length - 1}
            key={item.text}
            text={item.text}
            onPress={item.onPress}
          />
        ))}
      </View>
    );
  }
}

export default connect()(Settings);
