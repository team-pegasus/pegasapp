import { createStackNavigator } from "react-navigation";
import Login from "./screens/Login";
import TabNavigator from "./screens/TabNavigator";
import firebase from "firebase";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export interface Props {
  navigation: any;
}

const stackNav = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    App: {
      screen: TabNavigator
    }
  },
  {
    headerMode: "none"
  }
);

export default stackNav;
