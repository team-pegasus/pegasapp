import { apiUrl } from "../config";

const fetchAllClinics = (authToken: string) => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: authToken }
  };

  console.log("clinicService: Fetching all clinics...");

  return fetchClinics(requestOptions);
};

const fetchClinicsByLatLong = (authToken: string, lat: number, lng: number) => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: authToken, lat, lng }
  };

  console.log("clinicService: Fetching clinics by lat/long...");

  return fetchClinics(requestOptions);
};

const fetchClinicsByAddress = (authToken: string, address: string) => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: authToken, address }
  };

  console.log("clinicService: Fetching clinics by address...");

  return fetchClinics(requestOptions);
};

const fetchClinics = (requestOptions: Object) => {
  return fetch(`${apiUrl}/clinics`, requestOptions)
    .then((response: any) => {
      return response.json();
    })
    .then((data: any) => {
      console.log("clinicService: fetchAllClinics response: ", data);
      if (!Array.isArray(data)) throw "/clinics fetch failed";
      return data;
    });
};

export const clinicService = {
  fetchAllClinics,
  fetchClinicsByLatLong,
  fetchClinicsByAddress
};
