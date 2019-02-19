import { userConstants } from "../constants";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  displayPic: "",
  authToken: "",
  isLoading: false,
  loggedIn: false
};

const userReducer = (state: Object = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        ...action.user
      };
    case userConstants.REGISTER_FAILURE:
      return { ...state, loggedIn: false, isLoading: false };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        ...action.user
      };
    case userConstants.LOGIN_FAILURE:
      return { ...state, loggedIn: false, isLoading: false };
    case userConstants.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
