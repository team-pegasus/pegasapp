import React from "react";
import { View, FlatList, Text, StatusBar } from "react-native";
import { MapView, Location, Permissions } from "expo";

import SearchBar from "./components/SearchBar";
import ClinicCard from "./components/ClinicCard";

import { connect } from "react-redux";
import { clinicActions } from "../../actions";

export interface Props {
  navigation: any;
  clinics: Array<any>;
  dispatch: Function;
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

  static defaultProps = {
    clinics: []
  };

  // componentWillMount() {
  //   this._getLocationAsync();
  // }

  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);

  //   if (status !== "granted") {
  //     console.log("Explore: user denied permission for location");
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   console.log("Explore: user granted permission for location: ", location);

  //   // location.coords = {speed, longitude, latitude, accuracy}
  //   // this.setState({ location });
  // };

  handleClinicFetch = () => {
    this.props.dispatch(clinicActions.fetchClinics());
  };

  componentWillReceiveProps(props: Props) {}

  render() {
    const { clinics } = this.props;
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
          // initialRegion={mockClinicData[this.state.selectedClinic].coords}
          initialRegion={{
            latitude: clinics[0].latitude,
            longitude: clinics[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          followsUserLocation={true}
        >
          {clinics.map((clinic, index) => (
            //@ts-ignore -- MapView.Marker not typed
            <MapView.Marker
              // coordinate={clinic.coords}
              coordinate={{
                latitude: clinic.latitude,
                longitude: clinic.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
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
          data={clinics}
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
          keyExtractor={item => item.address}
          renderItem={({ item, index }) => (
            <ClinicCard
              name={item.name}
              address={item.address}
              key={item.name + item.address}
              // etr={item.etr}
              etr={15}
              selected={this.state.selectedClinic === index}
              onPress={() => {
                console.log("ClinicCard onPress called with index: ", index);
                this.setState({ selectedClinic: index });
                this.props.navigation.navigate("ClinicDetail", {
                  title: clinics[index].name
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
    data: state,
    clinics: state.clinics.clinicsNearBy
  };
};

export default connect(mapStateToProps)(Explore);
