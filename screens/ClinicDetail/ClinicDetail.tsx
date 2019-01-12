import React, { Component } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
// import Icon from "react-native-vector-icons/fontawesome";
import { Ionicons } from "@expo/vector-icons";

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
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
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
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRightColor: "white",
              padding: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>OPEN TODAY</Text>
          </View>
        </View>
      </View>
    );
  }
}

const Testview = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MyButton = styled.Button``;

const Container = styled.View``;

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
