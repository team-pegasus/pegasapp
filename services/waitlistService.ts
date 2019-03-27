import { apiUrl } from "../config";
import {
  JoinWaitlistFields,
  JoinWaitlistResponse,
  GetWaitTimeResponse
} from "../types";

const leaveWaitlist = (authToken: string, clinicId: number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: authToken }
  };

  console.log("waitlistService: leaving waitlist");

  return fetch(`${apiUrl}/waitlist/${clinicId}`, requestOptions)
    .then((response: any) => {
      return response.json();
    })
    .then((data: JoinWaitlistResponse) => {
      console.log("LeaveWaitlistResponse: ", data);
      if (!data) throw "Waitlist leave failed!";
      return data;
    });
};

const joinWaitlist = (
  authToken: string,
  clinicId: number,
  formData: JoinWaitlistFields
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: authToken },
    body: JSON.stringify(formData)
  };

  console.log("waitlistService: joining waitlist with formData ", formData);

  return fetch(`${apiUrl}/waitlist/${clinicId}`, requestOptions)
    .then((response: any) => {
      console.log("response from joinWaitlist: ", response);
      return response.json();
    })
    .then((data: JoinWaitlistResponse) => {
      console.log("JoinWaitlistResponse: ", data);
      if (!data.length) throw "Waitlist join failed!";
      return data;
    });
};

const getWaitTime = (authToken: string) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: authToken }
  };

  console.log("waitlistService: getting wait time...");

  return fetch(`${apiUrl}/user/waitingtime`, requestOptions)
    .then((response: any) => {
      return response.json();
    })
    .then((data: GetWaitTimeResponse) => {
      console.log("getWaitTime response: ", data);
      if (!data.wait) throw data;
      return data;
    });
};

export const waitlistService = {
  joinWaitlist,
  leaveWaitlist,
  getWaitTime
};
