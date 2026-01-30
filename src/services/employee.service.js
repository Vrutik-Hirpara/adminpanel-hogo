import api from "./api";

// CREATE
export const createEmployee = (data) => {
  return api.post("employee/", data);
};

// READ ALL
export const getEmployees = () => api.get("employee/");

// UPDATE
export const updateEmployee = (id, data) => {
  return api.patch(`employee/${id}/`, data);
};

// DELETE
export const deleteEmployee = (id) => api.delete(`employee/${id}/`);
