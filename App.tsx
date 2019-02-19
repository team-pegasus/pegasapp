import * as React from "react";
import { ActivityIndicator, View } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistedStore } from "./helpers/AppStore";
import AppNavigator from "./AppNavigator";

export default class App extends React.Component {
  renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistedStore} loading={this.renderLoading()}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
