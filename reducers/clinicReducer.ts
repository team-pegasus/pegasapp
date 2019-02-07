import { clinicConstants } from "../constants";

const INITIAL_STATE = {
  clinics: [],
  isFetching: false,
  isError: false
};

const clinicReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case clinicConstants.FETCH_CLINICS:
      return Object.assign({}, state, {
        isFetching: true,
        clinics: {},
        isError: false
      });
    case clinicConstants.FETCH_CLINICS_SUCCESS:
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: false
      });
    case clinicConstants.FETCH_CLINICS_FAILURE:
      return Object.assign({}, state, {
        isError: true,
        isFetching: false
      });
    default:
      return state;
  }
};

export default clinicReducer;
