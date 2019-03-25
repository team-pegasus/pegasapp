import { combineReducers } from "redux";

import clinicReducer from "./clinicReducer";
import userReducer from "./userReducer";
import waitlistReducer from "./waitlistReducer";

export default combineReducers({
  user: userReducer,
  clinics: clinicReducer,
  waitlist: waitlistReducer
});
