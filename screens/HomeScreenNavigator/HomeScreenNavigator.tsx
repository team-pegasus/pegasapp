import { createStackNavigator } from "react-navigation";
import Explore from "../Explore";
import ClinicDetail from "../ClinicDetail";
import CheckInForm from "../CheckInForm";
import QueueStatus from "../QueueStatus";
import PendingApproval from "../PendingApproval";

const homeScreenNavigator = createStackNavigator({
  Explore: {
    screen: Explore
  },
  ClinicDetail: {
    screen: ClinicDetail
  },
  CheckInForm: {
    screen: CheckInForm
  },
  PendingApproval: {
    screen: PendingApproval
  },
  QueueStatus: {
    screen: QueueStatus
  }
});

export default homeScreenNavigator;
