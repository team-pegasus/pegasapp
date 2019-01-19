import * as React from "react";
import { View, Text, TextInput } from "react-native";

export interface Props {
  label: string;
}

export interface State {}

const FormInput = (props: Props) => {
  const { label } = props;
  return (
    <View
      style={{
        marginBottom: 20
      }}
    >
      <Text style={{ color: "grey", marginBottom: 5 }}>{label}</Text>
      <TextInput
        style={{
          height: 30,
          borderBottomWidth: 1,
          borderBottomColor: "black",
          fontSize: 20
        }}
      />
    </View>
  );
};

export default FormInput;
