import { apiUrl } from "../config";
import { UserRegistrationFields, SignupSuccessResponse } from "../types";

const signup = (user: UserRegistrationFields) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  console.log("registering with user: ", user);

  return fetch(`${apiUrl}/signup`, requestOptions)
    .then((response: any) => {
      return response.json();
    })
    .then((data: SignupSuccessResponse) => {
      if (!data.auth_token) throw "Signup failed!";
      return data;
    });
};

const login = (user: UserRegistrationFields) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrl}/auth/login`, requestOptions)
    .then((response: any) => {
      return response.json();
    })
    .then((data: any) => {
      console.log("login data: ", data);
    });
};

function logout() {
  // remove user from local storage to log user out
  //   localStorage.removeItem("user");
}

const getById = (id: string, authToken: string) => {
  // const headers = { Authorization: authToken };
  // const requestOptions = {
  //   method: "GET",
  //   headers
  // };
  // return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
};

export const userService = {
  signup,
  login,
  logout,
  getById
};
