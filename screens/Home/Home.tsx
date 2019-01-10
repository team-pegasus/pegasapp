import React from "react";
import { View, FlatList, Text } from "react-native";
import { MapView } from "expo";
import SearchBar from "./components/SearchBar";
import ClinicCard from "./components/ClinicCard";

const mockClinicData = [
  {
    name: "Waterloo Walk-In",
    address: "170 University Ave. W",
    etr: 15,
    coords: {
      latitude: 43.4723,
      longitude: -80.5449,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    key: "ww170"
  },
  {
    name: "Spruce Medical",
    address: "318 Spruce St.",
    etr: 30,
    coords: {
      latitude: 43.4766,
      longitude: -80.5455,
      latitudeDelta: 0.092,
      longitudeDelta: 0.042
    },
    key: "sm318"
  },
  {
    name: "Waterloo Onyx",
    address: "280 Lester St.",
    etr: 50,
    coords: {
      latitude: 43.4723,
      longitude: -80.5449,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    key: "wo380"
  }
];

const waterlooLocation = {};

export interface Props {}

export interface State {
  selectedClinic: number;
}

class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedClinic: 0
    };
  }

  render() {
    console.log("home render called.");
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <MapView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          // initialRegion={{
          //   latitude: 43.4723,
          //   longitude: -80.5449,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421
          // }}
          initialRegion={mockClinicData[this.state.selectedClinic].coords}
          followsUserLocation={true}
        >
          <MapView.Marker
            coordinate={mockClinicData[this.state.selectedClinic].coords}
            title="Waterloo Walk-In"
            description="Some description"
          >
            <MapView.Callout>
              <Text>{mockClinicData[this.state.selectedClinic].name}</Text>
              <Text>{mockClinicData[this.state.selectedClinic].address}</Text>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
        <SearchBar />

        <FlatList
          data={mockClinicData}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            height: 250
          }}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          maxToRenderPerBatch={3}
          renderItem={({ item, index }) => (
            <ClinicCard
              name={item.name}
              address={item.address}
              etr={item.etr}
              selected={this.state.selectedClinic === index}
              onPress={() => {
                console.log("ClinicCard onPress called with index: ", index);
                this.setState({ selectedClinic: index });
              }}
            />
          )}
        />
      </View>
    );
  }
}

export default HomeScreen;
