import { createStore, applyMiddleware } from "redux";
import clinicReducer from "./reducers/index";
import thunk from "redux-thunk";

const store = createStore(clinicReducer, applyMiddleware(thunk));

export default store;
