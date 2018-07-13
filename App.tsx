import React from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { MapView } from "expo";
import SearchBar from "./SearchBar";
import ClinicCard from "./ClinicCard";
import Icon from "react-native-vector-icons/Ionicons";

export interface Props {
  navigation: any;
}

class HomeScreen extends React.Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 2 }}
          initialRegion={{
            latitude: 43.4723,
            longitude: -80.5449,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <SearchBar />
        </MapView>
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            backgroundColor: "white",
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.2,
            elevation: 1
          }}
        >
          <ScrollView style={{ flex: 1, paddingTop: 3 }}>
            <ClinicCard etr={15} />
            <ClinicCard
              name="Spruce Medical"
              address="318 Spruce St."
              etr={30}
            />
            <ClinicCard
              name="Waterloo Onyx"
              address="280 Lester St."
              etr={50}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 2,
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <SearchBar />
        </View>
        <ScrollView
          style={{ flex: 2, paddingTop: 20, backgroundColor: "white" }}
        >
          <ClinicCard />
          <ClinicCard name="Spruce Medical" />
          <ClinicCard name="Waterloo Onyx" />
        </ScrollView>
      </View>
    );
  }
}

const RootStack = createBottomTabNavigator(
  {
    // Home: HomeScreen,
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
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
