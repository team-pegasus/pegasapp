import * as React from "react";
import { View, Keyboard, TouchableWithoutFeedback, Text } from "react-native";
import FormInput from "../../shared_components/FormInput";
//@ts-ignore -- RN styled components arent' typed
import styled from "styled-components/native";
import { connect } from "react-redux";

import { waitlistActions } from "../../actions";

export interface Props {
  navigation: any;
  firstName?: string;
  lastName?: string;
  dispatch: Function;
}

export interface State {}

class CheckInForm extends React.Component<Props, State> {
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

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onFormSubmit = () => {
    this.props.navigation.navigate("PendingApproval", {
      title: "Waterloo Walk-In"
    });
    // this.props.dispatch(waitlistActions.joinWaitlist());
  };

  public render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ margin: 20 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "black",
                shadowOpacity: 0.2
              }}
            >
              <FormInput
                defaultValue={this.props.firstName}
                label={"FIRST NAME"}
              />
              <FormInput
                defaultValue={this.props.lastName}
                label={"LAST NAME"}
              />
              <FormInput label={"REASON FOR VISIT"} />>
              <ConfirmButton onPress={this.onFormSubmit}>
                <Text style={{ color: "white" }}>CONFIRM</Text>
              </ConfirmButton>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName
  };
};

export default connect(mapStateToProps)(CheckInForm);

const ConfirmButton = styled.TouchableOpacity`
  background-color: #7BCC2A;
  border-radius: 5px;
  width: auto
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;
