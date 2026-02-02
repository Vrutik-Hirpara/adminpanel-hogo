import api from "./api";

// CREATE (upload documents)
export const createEmployeeDocuments = (data) => {
  return api.post("employee-documents/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// READ ALL
export const getEmployeeDocuments = () => api.get("employee-documents/");

// UPDATE
export const updateEmployeeDocuments = (id, data) => {
  return api.patch(`employee-documents/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// DELETE
export const deleteEmployeeDocuments = (id) =>
  api.delete(`employee-documents/${id}/`);
