import { waitlistConstants } from "../constants";
import { waitlistService } from "../services";
import {
  JoinWaitlistFields,
  JoinWaitlistResponse,
  GetWaitTimeResponse
} from "../types";

const leaveWaitlist = (clinicId: number) => {
  const request = () => {
    return { type: waitlistConstants.LEAVE_WAITLIST_REQUEST };
  };
  const success = (successObj: Object) => {
    return { type: waitlistConstants.LEAVE_WAITLIST_SUCCESS, successObj };
  };
  const failure = (error: string) => {
    return { type: waitlistConstants.LEAVE_WAITLIST_FAILURE, error };
  };

  console.log("leaveWaitlist called with clinicId: ", clinicId);

  return (dispatch: Function, getState: Function) => {
    dispatch(request());
    waitlistService
      .leaveWaitlist(getState().user.authToken, clinicId)
      .then((response: JoinWaitlistResponse) => {
        console.log("waitlistActions: left waitlist successfully: ", response);
        dispatch(success(response));
      })
      .catch(err => {
        console.log("waitlistActions: waitlist leave error: ", err);
        dispatch(failure(err.toString()));
      });
  };
};

const joinWaitlist = (clinicId: number, formData: JoinWaitlistFields) => {
  const request = (formData: JoinWaitlistFields) => {
    return { type: waitlistConstants.JOIN_WAITLIST_REQUEST, formData };
  };
  const success = (data: Object) => {
    return { type: waitlistConstants.JOIN_WAITLIST_SUCCESS, data };
  };
  const failure = (error: string) => {
    return { type: waitlistConstants.JOIN_WAITLIST_FAILURE, error };
  };

  console.log(
    "joinWaitlist called with id: ",
    clinicId,
    ", and formData: ",
    formData
  );

  return (dispatch: Function, getState: Function) => {
    let clinic: Object;
    getState().clinics.clinicsNearBy.forEach((cl: any) => {
      if (cl.id == clinicId) clinic = cl;
    });

    dispatch(request(formData));
    waitlistService
      .joinWaitlist(getState().user.authToken, clinicId, formData)
      .then((response: JoinWaitlistResponse) => {
        console.log(
          "waitlistActions: joined waitlist successfully: ",
          response
        );
        dispatch(success({ clinic, ...response }));
      })
      .catch(err => {
        console.log("waitlistActions: waitlist join error: ", err);
        dispatch(failure(err.toString()));
      });
  };
};

const getWaitTime = () => {
  const request = () => {
    return { type: waitlistConstants.GET_WAIT_TIME_REQUEST };
  };
  const success = (data: GetWaitTimeResponse) => {
    return {
      type: waitlistConstants.GET_WAIT_TIME_SUCCESS,
      data
    };
  };
  const failure = (error: string) => {
    return { type: waitlistConstants.GET_WAIT_TIME_FAILURE, error };
  };

  return (dispatch: Function, getState: Function) => {
    dispatch(request());
    waitlistService
      .getWaitTime(getState().user.authToken)
      .then((response: GetWaitTimeResponse) => {
        console.log("waitlistActions: got wait time successfully: ", response);
        dispatch(success(response));
      })
      .catch(err => {
        console.log("waitlistActions: getWaitTime error: ", err);
        dispatch(failure(err.toString()));
      });
  };
};

export const waitlistActions = {
  joinWaitlist,
  getWaitTime,
  leaveWaitlist
};
