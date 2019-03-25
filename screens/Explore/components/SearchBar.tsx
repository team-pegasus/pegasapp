import React, { Component } from "react";
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export interface Props {
  onSearch: (query: string) => void;
  marginTop?: number;
}

export interface State {
  inFocus: boolean;
  pendingQuery: string;
}

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inFocus: false,
      pendingQuery: ""
    };
  }

  onFocus = () => {
    this.setState({ inFocus: true });
  };

  onBlur = () => {
    this.setState({ inFocus: false });
  };

  onCloseButtonPressed = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: "white",
          marginHorizontal: 20,
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 0.2,
          elevation: 1,
          marginTop: this.props.marginTop || 50
        }}
      >
        <IonIcon name="ios-search" size={20} style={{ marginRight: 10 }} />
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="e.g. Waterloo, ON"
          style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
          returnKeyType="search"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSubmitEditing={() => {
            this.props.onSearch && this.props.onSearch(this.state.pendingQuery);
          }}
          onChangeText={text => {
            this.setState({ pendingQuery: text });
          }}
        />
        {this.state.inFocus && (
          <TouchableOpacity onPress={this.onCloseButtonPressed}>
            <MaterialIcon name="close" size={20} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        )}
        }
      </View>
    );
  }
}
export default SearchBar;
