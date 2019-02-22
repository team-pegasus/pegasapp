import { clinicConstants } from "../constants";
import { clinicService } from "../services";

//TODO: remove
const auth =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NiwiZXhwIjoxNTUwOTQ1MzQxfQ.ZeJAbNI2agZVuO15f3bmNOq0eYmuWAeW0rU0NgFe61M";

const fetchRequest = () => {
  return { type: clinicConstants.FETCH_CLINICS_REQUEST };
};
const fetchSuccess = (clinics: any) => {
  return { type: clinicConstants.FETCH_CLINICS_SUCCESS, data: clinics };
};
const fetchFailure = (error: string) => {
  return { type: clinicConstants.FETCH_CLINICS_FAILURE, error };
};

export const fetchClinicsByLatLong = (lat: number, lng: number) => {
  return (dispatch: Function) => {
    dispatch(fetchRequest());
    clinicService
      .fetchClinicsByLatLong(/*pass in auth token*/ auth, lat, lng)
      .then((response: any) => {
        console.log(
          "clinicActions: fetched all clinics by lat/long successfully: ",
          response
        );
        dispatch(fetchSuccess(response));
      })
      .catch(err => {
        console.log("clinicActions: clinics fetch by lat/long error: ", err);
        dispatch(fetchFailure(err.toString()));
      });
  };
};

export const fetchClinicsByAddress = (address: string) => {
  return (dispatch: Function) => {
    dispatch(fetchRequest());
    clinicService
      .fetchClinicsByAddress(/*pass in auth token*/ auth, address)
      .then((response: any) => {
        console.log(
          "clinicActions: fetched all clinics by address successfully: ",
          response
        );
        dispatch(fetchSuccess(response));
      })
      .catch(err => {
        console.log("clinicActions: clinics fetch by address error: ", err);
        dispatch(fetchFailure(err.toString()));
      });
  };
};

export const fetchAllClinics = () => {
  return (dispatch: Function) => {
    dispatch(fetchRequest());
    clinicService
      .fetchAllClinics(/*pass in auth token*/ auth)
      .then((response: any) => {
        console.log(
          "clinicActions: fetched all clinics successfully: ",
          response
        );
        dispatch(fetchSuccess(response));
      })
      .catch(err => {
        console.log("clinicActions: all clinics fetch error: ", err);
        dispatch(fetchFailure(err.toString()));
      });
  };
};

export const clinicActions = {
  fetchAllClinics,
  fetchClinicsByAddress,
  fetchClinicsByLatLong
};
