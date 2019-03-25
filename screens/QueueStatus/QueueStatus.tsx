import * as React from "react";
import { Alert, View, Keyboard, Text, TouchableOpacity } from "react-native";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { waitlistActions } from "../../actions";
import { connect } from "react-redux";
import Ionicon from "react-native-vector-icons/Ionicons";

export interface Props {
  navigation: any;
  dispatch: Function;
  currWaitTime: any;
  clinicId: number;
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
            waitlistActions.leaveWaitlist(this.props.clinicId)
          );
        }
      }
    ]);
  };

  render() {
    const { currWaitTime } = this.props;

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
            <Text style={{ color: "white" }}>LEAVE QUEUE</Text>
          </LeaveQueueButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currWaitTime: state.waitlist.currWaitTime,
    clinicId: state.waitlist.clinicId
  };
};

export default connect(mapStateToProps)(QueueStatus);

const LeaveQueueButton = styled.TouchableOpacity`
  background-color: orange;
  border-radius: 5px;
  width: auto
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;
