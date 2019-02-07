import * as React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons"; //https://expo.github.io/vector-icons/

import HomeScreenNavigator from "../HomeScreenNavigator";
import Settings from "../Settings";

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
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-settings" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {}
  }
);

tabNavigator.navigationOptions = {
  header: null,
  gesturesEnabled: false
};

export default tabNavigator;
