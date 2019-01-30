import { combineReducers } from "redux";

import clinicReducer from "./clinicReducer";

export default combineReducers({
  clinics: clinicReducer
});
