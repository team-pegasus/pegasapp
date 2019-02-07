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

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        isLoading: true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        isLoading: false,
        loggedIn: true,
        ...action.user
      };
    case userConstants.LOGIN_FAILURE:
      return { loggedIn: false };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
