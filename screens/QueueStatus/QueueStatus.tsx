import * as React from "react";
import { Alert, View, Keyboard, Text } from "react-native";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";

export interface Props {}

export interface State {}

export default class QueueStatus extends React.Component<Props, State> {
  //@ts-ignore -- navigation options
  static navigationOptions = ({ navigation }) => {
    return {
      //   title: `${navigation.state.params.title}`,
      title: "Waterloo Walk-In",
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      }
    };
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  showAlert = () => {
    Alert.alert("Are you sure?", "You will forfeit your position in queue", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: () => console.log("OK Pressed") }
    ]);
  };

  public render() {
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
            <Text style={{ fontSize: 24 }}>~ 12 minutes</Text>
          </View>
          <LeaveQueueButton onPress={this.showAlert}>
            <Text style={{ color: "white" }}>LEAVE QUEUE</Text>
          </LeaveQueueButton>
        </View>
      </View>
    );
  }
}

const LeaveQueueButton = styled.TouchableOpacity`
  background-color: orange;
  border-radius: 5px;
  width: auto
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;
