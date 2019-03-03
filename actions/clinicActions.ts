import { clinicConstants } from "../constants";
import { clinicService } from "../services";

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
  return (dispatch: Function, getState: Function) => {
    dispatch(fetchRequest());
    clinicService
      .fetchClinicsByLatLong(getState().user.authToken, lat, lng)
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
  return (dispatch: Function, getState: Function) => {
    dispatch(fetchRequest());
    clinicService
      .fetchClinicsByAddress(getState().user.authToken, address)
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
  return (dispatch: Function, getState: Function) => {
    dispatch(fetchRequest());
    clinicService
      .fetchAllClinics(getState().user.authToken)
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
