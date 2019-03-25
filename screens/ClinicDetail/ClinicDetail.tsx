import * as React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons"; //https://expo.github.io/vector-icons/
//@ts-ignore -- RN styled components arent' typed
import { Linking } from "expo";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { hoursOfOperationTo12Hours } from "../../helpers/time";

export interface Props {
  navigation: any;
  clinic: any;
  inQueue: boolean;
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const randomizeRating = () => {
  return getRandomInt(3) + 2;
};

const getStarsArr = (rating: number) => {
  const stars = [0, 0, 0, 0, 0];
  for (let i = 0; i < rating; i++) {
    stars[i] = 1;
  }
  return stars;
};

class ClinicDetail extends React.Component<Props> {
  rating: number;

  static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.rating = randomizeRating();
  }

  //@ts-ignore -- navigation options
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      }
    };
  };

  onCheckInPress = () => {
    if (!this.props.inQueue) {
      this.props.navigation.navigate("CheckInForm", {
        title: this.props.navigation.state.params.title,
        clinicId: this.props.clinic.id
      });
    }
  };

  onPhoneNumberPress = (number: string) => {
    console.log("number: ", number);
    Linking.canOpenURL(`tel:${number}`)
      .then((supported: boolean) => {
        if (!supported) {
          console.log("Can't handle number: " + number);
          return;
        }
        return Linking.openURL(`tel:${number}`);
      })
      .catch(err => console.error("An error occurred", err));
  };

  render() {
    console.log("clinic detail test: ", this.props.clinic);

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

    const clinic = this.props.clinic;
    const etr = clinic.curr_wait_time;

    let etrColour = "#7bcc2a";
    if (etr && etr > 20 && etr < 40) {
      etrColour = "orange";
    } else if (etr && etr >= 40) {
      etrColour = "red";
    }

    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        //CHECK IN CARD --------------------------------------------------
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
                <Circle color={etrColour} />
              </View>
              <Text style={{ fontSize: 20 }}>
                {clinic.curr_wait_time} minutes
              </Text>
            </View>
          </View>
          <CheckInButton
            onPress={this.onCheckInPress}
            color={this.props.inQueue ? "#85878c" : etrColour}
          >
            <Text style={{ color: "white" }}>
              {this.props.inQueue ? "Already in Queue" : "CHECK-IN"}
            </Text>
          </CheckInButton>
        </View>
        //RATINGS AND OPEN --------------------------------------------------
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
            <TouchableOpacity
              onPress={this.onPhoneNumberPress.bind(this, clinic.phone)}
              style={{ flexDirection: "row" }}
            >
              <FontAwesome
                name="phone"
                size={16}
                color="purple"
                style={{ marginRight: 10 }}
              />
              <Text
                style={{ color: "purple", textDecorationLine: "underline" }}
              >
                {clinic.phone}
              </Text>
            </TouchableOpacity>
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
            <Text style={{ fontWeight: "bold", color: "#7bcc2a" }}>
              OPEN NOW
            </Text>
          </View>
        </View>
        //HOURS OF OPERATION --------------------------------------------------
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 10, color: "grey" }}>
            HOURS OF OPERATION
          </Text>
          {daysOfWeek.map((day: string) => {
            return (
              <View style={{ marginTop: 3, flexDirection: "row" }} key={day}>
                <Text style={{ fontSize: 16 }}>
                  {day}
                  {": "}
                  {clinic.hours_of_operation
                    ? clinic.hours_of_operation[day].length
                      ? clinic.hours_of_operation[day].map(
                          (hOp: string, index: number) => {
                            return index ==
                              clinic.hours_of_operation[day].length - 1
                              ? hoursOfOperationTo12Hours(
                                  clinic.hours_of_operation[day][index]
                                )
                              : hoursOfOperationTo12Hours(
                                  clinic.hours_of_operation[day][index]
                                ) + ", ";
                          }
                        )
                      : "Closed"
                    : "Unknown"}
                </Text>
              </View>
            );
          })}
        </View>
        //REVIEWS --------------------------------------------------
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
              {getRandomInt(50) + 2} reviews
            </Text>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ marginRight: 5 }}>
                {this.rating}.{getRandomInt(37) + 10}
              </Text>
              //HACKY, TODO: unhardcode this
              {getStarsArr(this.rating).map((num, idx) => {
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
        //SERVICES --------------------------------------------------
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
                //@ts-ignore -- serviceIcons access via index signature
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
  background-color: ${props => props.color};
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

const CheckInButton = styled.TouchableOpacity`
  background-color: ${props => props.color};
  width: 10px;
  border-radius: 5px;
  width: auto;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;

const mapStateToProps = (state: any, props: Props) => {
  console.log("clinicIndex: ", props.navigation.state.params);
  return {
    clinic:
      state.clinics.clinicsNearBy[props.navigation.state.params.clinicIndex],
    inQueue: state.waitlist.inQueue
  };
};

export default connect(mapStateToProps)(ClinicDetail);
