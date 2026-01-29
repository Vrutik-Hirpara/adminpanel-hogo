import api from "./api";

export const getOfficeBranches = () =>
  api.get("/office_branches/");

export const createOfficeBranch = (data) =>
  api.post("/office_branches/", data);

export const updateOfficeBranch = (id, data) =>
  api.patch(`/office_branches/${id}/`, data);

export const deleteOfficeBranch = (id) =>
  api.delete(`/office_branches/${id}/`);
