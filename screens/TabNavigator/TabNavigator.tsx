import * as React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons"; //https://expo.github.io/vector-icons/

import HomeScreenNavigator from "../HomeScreenNavigator";

class ScreenTwo extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Screen Two</Text>
      </View>
    );
  }
}

class ScreenThree extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Screen Three</Text>
      </View>
    );
  }
}

const tabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenNavigator,
      navigationOptions: {
        tabBarLabel: "Find",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-search" size={24} color={tintColor} />
        )
      }
    },
    ScreenTwo: {
      screen: ScreenTwo,
      navigationOptions: {
        tabBarLabel: "ScreenTwo",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmark" size={24} color={tintColor} />
        )
      }
    },
    ScreenThree: {
      screen: ScreenThree,
      navigationOptions: {
        tabBarLabel: "ScreenThree",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {}
  }
);

export default tabNavigator;
