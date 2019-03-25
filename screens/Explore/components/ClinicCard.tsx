import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { hoursOfOperationTo12Hours } from "../../../helpers/time";

export interface Props {
  name: string;
  address: string;
  etr: Number;
  closed?: boolean;
  hoursOfOperation: [string];
  selected?: boolean;
  onPress?: ((event: any) => void) | undefined;
}

class ClinicCard extends Component<Props> {
  static defaultProps = {
    selected: false,
    closed: false,
    onPress: () => {}
  };

  renderCard = () => {
    let { name, address, etr, closed, hoursOfOperation } = this.props;
    if (!hoursOfOperation || (hoursOfOperation && !hoursOfOperation.length))
      closed = true;

    let etrColour = "green";
    if (closed) {
      etrColour = "red";
    } else if (etr && etr > 20 && etr < 40) {
      etrColour = "orange";
    } else if (etr && etr >= 40) {
      etrColour = "orange";
    }

    return (
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
            // borderLeftWidth: this.props.selected ? 3 : 0,
            borderLeftWidth: 3,
            borderLeftColor: etrColour
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
            <Text style={{ fontSize: 20 }}>{name}</Text>
            <Text style={{ color: "#666666", marginVertical: 3 }}>
              {address}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon name="ios-time-outline" size={14} />
              <Text style={{ marginLeft: 5 }}>
                {closed
                  ? "Closed"
                  : hoursOfOperationTo12Hours(hoursOfOperation[0]) +
                    (hoursOfOperation.length > 1 ? ",..." : "")}
              </Text>
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
              {closed ? "Closed" : etr.toString() + " min"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let { closed, onPress, hoursOfOperation } = this.props;
    if (!hoursOfOperation || (hoursOfOperation && !hoursOfOperation.length))
      closed = true;

    return closed ? (
      this.renderCard()
    ) : (
      <TouchableOpacity onPress={onPress}>{this.renderCard()}</TouchableOpacity>
    );
  }
}
export default ClinicCard;
