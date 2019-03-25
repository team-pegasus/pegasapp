import * as React from "react";
import { Alert, View, Keyboard, Text, TouchableOpacity } from "react-native";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { waitlistActions } from "../../actions";
import { connect } from "react-redux";
import { Linking } from "expo";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { hoursOfOperationTo12Hours } from "../../helpers/time";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export interface Props {
  navigation: any;
  dispatch: Function;
  currWaitTime: any;
  clinic: any;
}

export interface State {}

class QueueStatus extends React.Component<Props, State> {
  //@ts-ignore -- navigation options
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
      headerLeft: null,
      gesturesEnabled: false
    };
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(waitlistActions.getWaitTime());
  }

  showAlert = () => {
    Alert.alert("Are you sure?", "You will forfeit your position in queue", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed");
        },
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => {
          console.log("OK Pressed");
          this.props.navigation.navigate("Explore", {});
          this.props.dispatch(
            waitlistActions.leaveWaitlist(this.props.clinic.id)
          );
        }
      }
    ]);
  };

  openMaps = () => {
    const scheme = "maps:0,0?q=";
    const latLng = `${this.props.clinic.latitude},${
      this.props.clinic.longitude
    }`;
    const label = this.props.clinic.name;
    const url = `${scheme}${label}@${latLng}`;
    Linking.openURL(url);
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
    const { currWaitTime, clinic } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.2,
            margin: 20
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "grey" }}>WAIT TIME</Text>
            </View>
            <Text style={{ fontSize: 24 }}>~{currWaitTime.wait} minutes</Text>
          </View>
          <LeaveQueueButton onPress={this.showAlert}>
            <Text style={{ color: "white", fontSize: 16 }}>Leave Queue</Text>
          </LeaveQueueButton>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.2,
            margin: 20
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "grey" }}>QUICK HELP</Text>
            </View>
          </View>
          <View style={{ marginVertical: 15 }}>
            <Text style={{ fontSize: 20 }}>{clinic.name}</Text>
            <Text style={{ color: "#666666", marginVertical: 3 }}>
              {clinic.address}
            </Text>
            <Text style={{ marginTop: 2 }}>{clinic.phone}</Text>
          </View>
          <DirectionsButton onPress={this.openMaps}>
            <MaterialIcon
              name="directions"
              size={22}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: "white", fontSize: 16 }}>Directions</Text>
          </DirectionsButton>
          <CallNowButton
            onPress={this.onPhoneNumberPress.bind(this, clinic.phone)}
          >
            <FontAwesome
              name="phone"
              size={22}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: "white", fontSize: 16 }}>Call Clinic</Text>
          </CallNowButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currWaitTime: state.waitlist.currWaitTime,
    clinic: state.waitlist.clinic
  };
};

export default connect(mapStateToProps)(QueueStatus);

const LeaveQueueButton = styled.TouchableOpacity`
  background-color: red;
  border-radius: 5px;
  width: auto
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;

// background-color: #7bcc2a;
const DirectionsButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  background-color: #302b63;
  border-radius: 5px;
  width: auto
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;

// background-color: #31a6e9;
const CallNowButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  background-color: #302b63;
  border-radius: 5px;
  width: auto
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;
