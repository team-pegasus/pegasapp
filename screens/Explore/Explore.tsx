import React from "react";
import {
  View,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from "react-native";
import { MapView, Location, Permissions } from "expo";

import SearchBar from "./components/SearchBar";
import ClinicCard from "./components/ClinicCard";

import { connect } from "react-redux";
import { clinicActions } from "../../actions";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export interface Props {
  navigation: any;
  clinics: Array<any>;
  dispatch: Function;
}

export interface State {
  selectedClinic: number;
}

const fallBackData = {
  latitude: 43.4723,
  longitude: -80.5449,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05
};

class Explore extends React.Component<Props, State> {
  map: any; // used as a ref for MapView

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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("Explore: user denied permission for location");
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("Explore: user's location is: ", location);

    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    this.props.dispatch(clinicActions.fetchClinicsByLatLong(lat, lng));
    this.handleMapCenter(lat, lng);
  };

  currentLocationSearch = () => {
    this._getLocationAsync();
  };

  handleClinicFetch = () => {
    this.props.dispatch(clinicActions.fetchAllClinics());
  };

  handleSearch = (query: string) => {
    console.log("Explore: search submitted with query: ", query);
    this.props.dispatch(clinicActions.fetchClinicsByAddress(query));
  };

  componentWillReceiveProps(props: Props) {
    if (props.clinics.length) {
      this.handleMapCenter(
        props.clinics[0].latitude,
        props.clinics[0].longitude
      );
    }
  }

  handleMapCenter = (lat: number, lng: number) => {
    this.map.animateToRegion({
      latitude: lat || fallBackData.latitude,
      longitude: lng || fallBackData.longitude,
      latitudeDelta: fallBackData.latitudeDelta,
      longitudeDelta: fallBackData.longitudeDelta
    });
  };

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
          ref={map => {
            this.map = map;
          }}
          initialRegion={{
            latitude: clinics[0] ? clinics[0].latitude : fallBackData.latitude,
            longitude: clinics[0]
              ? clinics[0].longitude
              : fallBackData.longitude,
            latitudeDelta: fallBackData.latitudeDelta,
            longitudeDelta: fallBackData.longitudeDelta
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

        <SearchBar onSearch={this.handleSearch} />

        {/* CURRENT LOCATION COMPONENT */}
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            position: "absolute",
            bottom: 270,
            right: 20,
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.2,
            elevation: 1
          }}
          onPress={this.currentLocationSearch}
        >
          <MaterialIcon
            name="my-location"
            size={20}
            style={{ color: "black" }}
          />
        </TouchableOpacity>

        {clinics.length ? (
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
        ) : (
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "white",
              marginHorizontal: 20,
              shadowOffset: { width: 0, height: 0 },
              shadowColor: "black",
              shadowOpacity: 0.2,
              elevation: 1,
              marginBottom: 15,
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              height: 240,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              padding: 10
            }}
          >
            {/* <View style={{ flexDirection: "row", flex: 1 }}> */}
            <Image
              style={{ width: 80, height: 150 }}
              source={require("../../assets/sad_doctor.png")}
            />
            <Text
              style={{
                fontFamily: "Futura-Medium",
                marginHorizontal: 10,
                flex: 1,
                fontSize: 20,
                textAlign: "center",
                justifyContent: "center"
              }}
            >
              Sorry, we couldn't find any clinics near you.
            </Text>
          </View>
        )}
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
