import api from "./api";

/* ===============================
   EMPLOYEE DOCUMENTS SERVICE
================================ */

// CREATE (Upload documents)
export const createEmployeeDocuments = (data) => {
  return api.post("employee-documents/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// READ ALL
export const getEmployeeDocuments = () => {
  return api.get("employee-documents/");
};

// READ SINGLE (optional)
export const getEmployeeDocumentById = (id) => {
  return api.get(`employee-documents/${id}/`);
};

// UPDATE
export const updateEmployeeDocuments = (id, data) => {
  return api.patch(`employee-documents/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// DELETE
export const deleteEmployeeDocuments = (id) => {
  return api.delete(`employee-documents/${id}/`);
};
