import { waitlistConstants } from "../constants";

const INITIAL_WAITLIST_STATE = {
  clinic: {},
  currWaitTime: {},
  inQueue: false,
  isError: false,
  isFetching: false
};

const waitlistReducer = (state = INITIAL_WAITLIST_STATE, action: any) => {
  switch (action.type) {
    case waitlistConstants.JOIN_WAITLIST_REQUEST:
      return Object.assign({}, state, {
        clinic: {},
        isError: false
      });
    case waitlistConstants.JOIN_WAITLIST_SUCCESS:
      console.log("join_waitlist_success data: ", action.data);
      return Object.assign({}, state, {
        clinic: action.data.clinic,
        inQueue: true,
        isError: false
      });
    case waitlistConstants.JOIN_WAITLIST_FAILURE:
      return Object.assign({}, state, {
        clinic: {},
        isError: true
      });
    case waitlistConstants.LEAVE_WAITLIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case waitlistConstants.LEAVE_WAITLIST_SUCCESS:
      return Object.assign({}, state, {
        clinic: {},
        currWaitTime: {},
        inQueue: false,
        isError: false,
        isFetching: false
      });
    case waitlistConstants.LEAVE_WAITLIST_FAILURE:
      return Object.assign({}, state, {
        isError: true,
        isFetching: false
      });
    case waitlistConstants.GET_WAIT_TIME_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case waitlistConstants.GET_WAIT_TIME_SUCCESS:
      return Object.assign({}, state, {
        currWaitTime: action.data,
        isFetching: false
      });
    case waitlistConstants.GET_WAIT_TIME_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

export default waitlistReducer;
