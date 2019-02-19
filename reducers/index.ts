import { combineReducers } from "redux";

import clinicReducer from "./clinicReducer";
import userReducer from "./userReducer";

export default combineReducers({
  user: userReducer,
  clinics: clinicReducer
});
