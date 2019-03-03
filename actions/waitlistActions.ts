import { waitlistConstants } from "../constants";
import { waitlistService } from "../services";
import { JoinWaitlistFields, JoinWaitlistResponse } from "../types";

const joinWaitlist = (formData: JoinWaitlistFields) => {
  const request = (formData: JoinWaitlistFields) => {
    return { type: waitlistConstants.JOIN_WAITLIST_REQUEST, formData };
  };
  const success = (successObj: JoinWaitlistResponse) => {
    return { type: waitlistConstants.JOIN_WAITLIST_SUCCESS, successObj };
  };
  const failure = (error: string) => {
    return { type: waitlistConstants.JOIN_WAITLIST_FAILURE, error };
  };

  return (dispatch: Function) => {
    dispatch(request(formData));
    waitlistService
      .joinWaitlist(2 /* clinicId */, formData)
      .then((response: JoinWaitlistResponse) => {
        // const userData = {
        //   firstName: user.first_name,
        //   lastName: user.last_name,
        //   email: user.email,
        //   authToken: response.auth_token
        // };
        console.log(
          "waitlistActions: joined waitlist successfully: ",
          response
        );
        dispatch(success(response));
      })
      .catch(err => {
        console.log("waitlistActions: waitlist join error: ", err);
        dispatch(failure(err.toString()));
      });
  };
};

export const waitlistActions = {
  joinWaitlist
};
