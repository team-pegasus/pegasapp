import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export interface Props {
  name?: string;
  address?: string;
  etr?: Number;
}

class ClinicCard extends Component<Props> {
  render() {
    let etrColour = "green";
    if (this.props.etr && this.props.etr > 20 && this.props.etr < 40) {
      etrColour = "orange";
    } else if (this.props.etr && this.props.etr >= 40) {
      etrColour = "red";
    }
    return (
      <View
        style={{
          flexDirection: "row",
          //   backgroundColor: "#dcdcdc",
          backgroundColor: "white",
          justifyContent: "space-between",
          padding: 10,
          // height: 00
          marginHorizontal: 20,
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 0.2,
          elevation: 1,
          marginBottom: 15
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
          <Text style={{ fontSize: 20 }}>
            {this.props.name || "Waterloo Walk-In"}
          </Text>
          <Text style={{ color: "#666666", marginVertical: 3 }}>
            {this.props.address || "170 University Ave W"}
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
    );
  }
}
export default ClinicCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
