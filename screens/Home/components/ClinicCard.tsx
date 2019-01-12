import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export interface Props {
  name: string;
  address: string;
  etr: Number;
  selected?: boolean;
  onPress?: Function;
}

class ClinicCard extends Component<Props> {
  static defaultProps = {
    selected: false,
    onPress: () => {}
  };

  render() {
    let etrColour = "green";
    if (this.props.etr && this.props.etr > 20 && this.props.etr < 40) {
      etrColour = "orange";
    } else if (this.props.etr && this.props.etr >= 40) {
      etrColour = "red";
    }
    return (
      <TouchableOpacity
        // onPress={this.props.selected ? this.props.onPress : () => {}}
        onPress={this.props.onPress}
      >
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            marginHorizontal: 20,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.2,
            elevation: 1,
            marginBottom: 15
            // padding: 10
          }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              borderLeftWidth: this.props.selected ? 3 : 0,
              borderLeftColor: "red"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                borderRightWidth: 1,
                borderRightColor: "grey",
                flex: 3
              }}
            >
              <Text style={{ fontSize: 20 }}>{this.props.name}</Text>
              <Text style={{ color: "#666666", marginVertical: 3 }}>
                {this.props.address}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Icon name="ios-time-outline" size={14} />
                <Text style={{ marginLeft: 5 }}>9am - 6pm</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}
            >
              <Text style={{ fontSize: 18, color: etrColour }}>
                {this.props.etr} min
              </Text>
            </View>
          </View>
          {/* {this.props.selected && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "darkgrey"
              }}
            >
              <Text style={{ color: "white", fontStyle: "italic" }}>
                Tap for clinic details
              </Text>
            </View>
          )} */}
        </View>
      </TouchableOpacity>
    );
  }
}
export default ClinicCard;
