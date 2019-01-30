import * as React from "react";

import store from "./AppStore";
import { Provider } from "react-redux";
import AppNavigator from "./AppNavigator";

import firebase from "firebase";
import { firebaseConfig } from "./config";
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
