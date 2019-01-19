import { createStackNavigator } from "react-navigation";
import Explore from "../Explore";
import ClinicDetail from "../ClinicDetail";
import CheckInForm from "../CheckInForm";

const homeScreenNavigator = createStackNavigator({
  Explore: {
    screen: Explore
  },
  ClinicDetail: {
    screen: ClinicDetail
  },
  CheckInForm: {
    screen: CheckInForm
  }
});

export default homeScreenNavigator;
