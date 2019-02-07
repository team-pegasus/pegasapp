import { createStackNavigator } from "react-navigation";
import Login from "./screens/Login";
import LogInWithEmail from "./screens/Login/LoginWithEmail";
import Register from "./screens/Login/Register";
import TabNavigator from "./screens/TabNavigator";
import Settings from "./screens/Settings";

const stackNav = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    LogInWithEmail: {
      screen: LogInWithEmail
    },
    Register: {
      screen: Register
    },
    App: {
      screen: TabNavigator
    },
    Settings: {
      screen: Settings
    }
  },
  {
    // headerMode: "none",
    // navigationOptions: {
    //   gesturesEnabled: false
    // }
  }
);

export default stackNav;
