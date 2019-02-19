import { clinicConstants } from "../constants";
import { clinicService } from "../services";

export const fetchClinics = () => {
  const request = () => {
    return { type: clinicConstants.FETCH_CLINICS_REQUEST };
  };
  const success = (clinics: any) => {
    return { type: clinicConstants.FETCH_CLINICS_SUCCESS, data: clinics };
  };
  const failure = (error: string) => {
    return { type: clinicConstants.FETCH_CLINICS_FAILURE, error };
  };

  const auth =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NiwiZXhwIjoxNTUwNjMxNzYwfQ.I7mk_O48xR5z_I-et0eHT9I6MI_kNxe2EYlnmXrhBDo";

  return (dispatch: Function) => {
    dispatch(request());
    clinicService
      .fetchAllClinics(/*pass in auth token*/ auth)
      .then((response: any) => {
        console.log(
          "clinicActions: fetched all clinics successfully: ",
          response
        );
        dispatch(success(response));
      })
      .catch(err => {
        console.log("clinicActions: all clinics fetch error: ", err);
        dispatch(failure(err.toString()));
      });
  };
};

export const clinicActions = {
  fetchClinics
};
