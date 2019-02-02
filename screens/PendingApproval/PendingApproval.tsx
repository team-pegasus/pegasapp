import * as React from "react";
import { Alert, View, Text, ActivityIndicator } from "react-native";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";

export interface Props {
  navigation: any;
}

export interface State {}

export default class PendingApproval extends React.Component<Props, State> {
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
    // mimic APPROVAL from receptionist here..
    setTimeout(() => {
      this.props.navigation.navigate("QueueStatus", {
        title: "yoyoyo"
      });
    }, 3000);
  }

  onCancelRequest = () => {
    Alert.alert("Are you sure?", "You will delete your request to join queue", [
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
            <Text style={{ color: "grey" }}>
              PRESENT YOUR EMAIIL AT FRONT DESK:
            </Text>
            <Text style={{ fontSize: 24, marginTop: 5 }}>
              jitindodd@gmail.com
            </Text>
            <CancelRequestButton onPress={this.onCancelRequest}>
              <Text style={{ color: "white" }}>CANCEL REQUEST</Text>
            </CancelRequestButton>
          </View>
        </View>

        <ActivityIndicator size="large" style={{ flex: 1 }} />
      </View>
    );
  }
}

const CancelRequestButton = styled.TouchableOpacity`
  background-color: orange;
  border-radius: 5px;
  width: auto
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;
