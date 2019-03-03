import { userConstants } from "../constants";
import { userService } from "../services";
import { UserRegistrationFields, SignupSuccessResponse } from "../types";

const register = (user: UserRegistrationFields) => {
  const request = (user: UserRegistrationFields) => {
    return { type: userConstants.REGISTER_REQUEST, user };
  };
  const success = (user: Object) => {
    return { type: userConstants.REGISTER_SUCCESS, user };
  };
  const failure = (error: string) => {
    return { type: userConstants.REGISTER_FAILURE, error };
  };

  return (dispatch: Function) => {
    dispatch(request(user));
    userService
      .signup(user)
      .then((response: SignupSuccessResponse) => {
        const userData = {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          authToken: response.auth_token
        };
        console.log("Registered successfully: ", userData);
        dispatch(success(userData));
      })
      .catch(err => {
        console.log("registration error: ", err);
        if (err === "Try signing in instead!") {
          dispatch(login(user));
        } else {
          dispatch(failure(err.toString()));
        }
      });
  };
};

const login = (user: UserRegistrationFields) => {
  const request = (user: UserRegistrationFields) => {
    return { type: userConstants.LOGIN_REQUEST, user };
  };
  const success = (user: Object) => {
    return { type: userConstants.LOGIN_SUCCESS, user };
  };
  const failure = (error: Object) => {
    return { type: userConstants.LOGIN_FAILURE, error };
  };

  return (dispatch: Function) => {
    dispatch(request(user));
    userService
      .login(user)
      .then((response: SignupSuccessResponse) => {
        const userData = {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          authToken: response.auth_token
        };
        console.log("Logged in successfully: ", userData);
        dispatch(success(userData));
      })
      .catch(err => {
        console.log("login error: ", err);
        dispatch(failure(err.toString()));
      });
  };
};

function logout() {
  return { type: userConstants.LOGOUT };
}

export const userActions = {
  register,
  login,
  logout
};
