import { apiUrl } from "../config";
import { JoinWaitlistFields, JoinWaitlistResponse } from "../types";

const joinWaitlist = (clinicId: number, formData: JoinWaitlistFields) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  };

  console.log("waitlistService: joining waitlist with formData ", formData);

  return fetch(`${apiUrl}/waitlist/${clinicId}`, requestOptions)
    .then((response: any) => {
      return response.json();
    })
    .then((data: JoinWaitlistResponse) => {
      if (!data.wait_time) throw "Waitlist join failed!";
      return data;
    });
};

export const waitlistService = {
  joinWaitlist
};
