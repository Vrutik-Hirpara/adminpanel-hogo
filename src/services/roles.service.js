import api from "./api";

// CREATE Role
export const createRole = (data) => {
  return api.post("roles/", data);
};

// READ all Roles
export const getRoles = () => {
  return api.get("roles/");
};

// READ single Role
export const getRoleById = (id) => {
  return api.get(`roles/${id}/`);
};

// UPDATE Role
export const updateRole = (id, data) => {
  return api.patch(`roles/${id}/`, data);
};

// DELETE Role
export const deleteRole = (id) => {
  return api.delete(`roles/${id}/`);
};
