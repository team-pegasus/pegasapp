import React from "react";
import { View, FlatList, Text, StatusBar } from "react-native";
import { MapView } from "expo";

import SearchBar from "./components/SearchBar";
import ClinicCard from "./components/ClinicCard";

import { connect } from "react-redux";
import { thunk_action_creator } from "../../actions/clinicActions";

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
      latitude: 43.48,
      longitude: -80.52,
      latitudeDelta: 0.093,
      longitudeDelta: 0.041
    },
    key: "wo380"
  }
];

export interface Props {
  navigation: any;
  dispatch: any;
}

export interface State {
  selectedClinic: number;
}

class Explore extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedClinic: 0
    };
    this.handleClinicFetch();
  }

  handleClinicFetch = () => {
    this.props.dispatch(thunk_action_creator("jitindodd"));
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <StatusBar barStyle="dark-content" />

        <MapView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          initialRegion={mockClinicData[this.state.selectedClinic].coords}
          followsUserLocation={true}
        >
          {mockClinicData.map((clinic, index) => (
            //@ts-ignore -- MapView.Marker not typed
            <MapView.Marker
              coordinate={clinic.coords}
              title="Waterloo Walk-In"
              description="Some description"
              key={clinic.name + clinic.address}
              pinColor={this.state.selectedClinic === index ? "red" : "blue"}
            >
              {/* bootleg way of ignoring ts error
              // @ts-ignore */}
              <MapView.Callout>
                <Text>{clinic.name}</Text>
                <Text>{clinic.address}</Text>
                {/* bootleg way of ignoring ts error
              // @ts-ignore */}
              </MapView.Callout>
              {/* bootleg way of ignoring ts error
              // @ts-ignore */}
            </MapView.Marker>
          ))}
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
                this.props.navigation.navigate("ClinicDetail", {
                  title: mockClinicData[index].name
                });
              }}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    data: state
  };
};

export default connect(mapStateToProps)(Explore);
