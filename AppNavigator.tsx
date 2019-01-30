import { createStackNavigator } from "react-navigation";
import Login from "./screens/Login";
import TabNavigator from "./screens/TabNavigator";
import Settings from "./screens/Settings";

const stackNav = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    App: {
      screen: TabNavigator
    },
    Settings: {
      screen: Settings
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default stackNav;
