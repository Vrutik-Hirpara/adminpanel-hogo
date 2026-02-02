import api from "./api";

// READ ALL
export const getEmployeePersonalDetails = () =>
  api.get("Employeepersonaldetails/");

// CREATE
export const createEmployeePersonalDetails = (data) =>
  api.post("Employeepersonaldetails/", data);

// UPDATE
export const updateEmployeePersonalDetails = (id, data) =>
  api.patch(`Employeepersonaldetails/${id}/`, data);

// DELETE
export const deleteEmployeePersonalDetails = (id) =>
  api.delete(`Employeepersonaldetails/${id}/`);
