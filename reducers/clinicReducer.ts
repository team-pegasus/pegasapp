const INITIAL_STATE = {
  clinics: [],
  user: "Jitin",
  isFetching: false,
  isError: false
};

const clinicReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "FETCH_CLINICS":
      return Object.assign({}, state, {
        isFetching: true,
        clinics: {},
        isError: false
      });
    case "RECEIVE_CLINICS":
      return Object.assign({}, state, {
        userData: action.data,
        isFetching: false,
        isError: false
      });
    case "RECEIVE_CLINICS_ERROR":
      return Object.assign({}, state, {
        isError: true,
        isFetching: false
      });
    default:
      return state;
  }
};

export default clinicReducer;
