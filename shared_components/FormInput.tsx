import * as React from "react";
import { View, Text, TextInput } from "react-native";

export interface Props {
  label: string;
  defaultValue?: string;
  labelColor?: string;
  textColor?: string;
  borderColor?: string;
  password?: boolean;
  onChangeText?: (text: string) => {};
}

export interface State {}

const FormInput = (props: Props) => {
  const {
    label,
    borderColor,
    defaultValue,
    labelColor,
    textColor,
    onChangeText,
    password
  } = props;

  return (
    <View
      style={{
        marginBottom: 20
      }}
    >
      <Text style={{ color: labelColor || "grey", marginBottom: 5 }}>
        {label}
      </Text>
      <TextInput
        style={{
          height: 30,
          borderBottomWidth: 1,
          borderBottomColor: borderColor || "black",
          fontSize: 20,
          color: textColor || "black"
        }}
        defaultValue={defaultValue || ""}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </View>
  );
};

export default FormInput;
