import { createStackNavigator } from "react-navigation";
import Explore from "../Explore";
import ClinicDetail from "../ClinicDetail";

const homeScreenNavigator = createStackNavigator({
  Explore: {
    screen: Explore
  },
  ClinicDetail: {
    screen: ClinicDetail
  }
});

export default homeScreenNavigator;
