import React, { Component } from "react";
import { View, ScrollView, Button, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; //https://expo.github.io/vector-icons/

export interface Props {}

class ClinicDetail extends Component<Props> {
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state.params);
    return {
      title: `${navigation.state.params.title}`,
      // title: "testing!",
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      }
    };
  };

  render() {
    //index 0 == monday
    const hoursOfOperation = [
      { start: 9, end: 20 },
      { start: 10, end: 21 },
      { start: 9, end: 20 },
      { start: 10, end: 21 },
      { start: 9, end: 20 },
      { start: 10, end: 16 },
      { start: 10, end: 16 }
    ];

    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const serviceIcons = {
      Pharmacy: "pill",
      "Kid Friendly": "heart",
      Accessible: "wheelchair-accessibility"
    };

    const mockServices = ["Pharmacy", "Kid Friendly", "Accessible"];

    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        //CHECK IN CARD
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            padding: 20,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.2
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Ionicons
              name="md-time"
              size={32}
              color="grey"
              style={{ marginLeft: 10, marginRight: 20 }}
            />
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5
                }}
              >
                <Text style={{ color: "grey", fontSize: 15, marginRight: 5 }}>
                  WAIT TIME
                </Text>
                <Circle />
              </View>
              <Text style={{ fontSize: 20 }}>15 minutes</Text>
            </View>
          </View>
          <CheckInButton>
            <Text style={{ color: "white" }}>CHECK-IN</Text>
          </CheckInButton>
        </View>
        //RATINGS AND OPEN
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            marginTop: 20
          }}
        >
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "lightgrey",
              borderLeftColor: "white",
              padding: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>S: 9:00am - 8:00pm</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderLeftWidth: 0,
              borderColor: "lightgrey",
              borderRightColor: "white",
              padding: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>OPEN NOW</Text>
          </View>
        </View>
        //HOURS OF OPERATION
        <View style={{ padding: 20 }}>
          {hoursOfOperation.map((hours, index) => {
            const start = hours.start % 12;
            const startSuffix = hours.start >= 12 ? "pm" : "am";
            const end = hours.end % 12;
            const endSuffix = hours.end >= 12 ? "pm" : "am";
            return (
              <Text
                key={daysOfWeek[index]}
                style={{ fontSize: 16, marginTop: 3 }}
              >
                {daysOfWeek[index]}: {start}:00{startSuffix} - {end}:00
                {endSuffix}
              </Text>
            );
          })}
        </View>
        //REVIEWS
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderTopColor: "lightgrey",
            borderBottomColor: "lightgrey",
            padding: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center"
              }}
            >
              12 reviews
            </Text>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ marginRight: 5 }}>3.2</Text>
              //HACKY
              {[1, 1, 1, 0, 0].map((num, idx) => {
                return (
                  <Ionicons
                    name="md-star"
                    size={24}
                    color={num ? "purple" : "lightgrey"}
                    key={idx + "star"}
                  />
                );
              })}
            </View>
          </View>
        </View>
        //SERVICES
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            alignItems: "flex-end"
          }}
        >
          {mockServices.map(service => (
            <View
              style={{ flexDirection: "column", alignItems: "center" }}
              key={service}
            >
              <MaterialCommunityIcons
                name={serviceIcons[service]}
                size={32}
                color="purple"
                style={{ marginLeft: 10, marginRight: 20 }}
              />
              <Text style={{ marginTop: 10, color: "grey" }}>
                {service.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const Circle = styled.View`
  background-color: #0ab20a;
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

const CheckInButton = styled.TouchableOpacity`
  background-color: orange;
  border-radius: 5px;
  width: auto;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;

export default ClinicDetail;
