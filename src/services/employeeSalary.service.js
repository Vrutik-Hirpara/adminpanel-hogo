import api from "./api";

// CREATE
export const createEmployeeSalary = (data) => {
  return api.post("employee-salary/", data);
};

// READ ALL
export const getEmployeeSalary = () => {
  return api.get("employee-salary/");
};

// UPDATE
export const updateEmployeeSalary = (id, data) => {
  return api.patch(`employee-salary/${id}/`, data);
};

// DELETE
export const deleteEmployeeSalary = (id) => {
  return api.delete(`employee-salary/${id}/`);
};
