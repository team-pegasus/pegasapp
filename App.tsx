import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./screens/Home";

export interface Props {
  navigation: any;
}

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

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Find",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        )
      }
    },
    ScreenTwo: {
      screen: ScreenTwo,
      navigationOptions: {
        tabBarLabel: "ScreenTwo",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-bookmark" color={tintColor} size={24} />
        )
      }
    },
    ScreenThree: {
      screen: ScreenThree,
      navigationOptions: {
        tabBarLabel: "ScreenThree",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      // activeTintColor: "#e91e63",
      // labelStyle: {
      //   fontSize: 12
      // },
      // style: {
      //   backgroundColor: "blue"
      // }
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
