import api from "./api";

// CREATE Department
export const createDepartment = (data) => {
  return api.post("departments/", data);
};

// READ all Departments
export const getDepartments = () => {
  return api.get("departments/");
};

// READ single Department
export const getDepartmentById = (id) => {
  return api.get(`departments/${id}/`);
};

// UPDATE Department
export const updateDepartment = (id, data) => {
  return api.patch(`departments/${id}/`, data);
};

// DELETE Department
export const deleteDepartment = (id) => {
  return api.delete(`departments/${id}/`);
};
