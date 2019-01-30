import store from "../AppStore";

export const fetchClinics = () => {
  return {
    type: "FETCH_CLINICS"
  };
};

export const receiveClinics = (clinics: any) => {
  return {
    type: "RECEIVE_CLINICS",
    data: clinics
  };
};

export const fetchClinicsError = () => {
  return {
    type: "RECEIVE_CLINICS_ERROR"
  };
};

export const thunk_action_creator = (username: any) => {
  const user = username.replace(/\s/g, "");
  store.dispatch(fetchClinics());
  return function(dispatch: any, getState: any) {
    return (
      fetch(`https://api.github.com/users/${user}`)
        // return fetch('https://pegabackk.herokuapp.com/clinics')
        .then(data => data.json())
        .then(data => {
          console.log("data from github: ", data);
          if (data.message === "Not Found") {
            throw new Error("No such user found!!");
          } else dispatch(receiveClinics(data));
        })
        .catch(err => dispatch(fetchClinicsError()))
    );
  };
};
