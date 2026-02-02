import api from "./api";

/* ===============================
   DOCUMENTS OF EMPLOYEE SERVICE
================================ */

const buildFormData = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((file) => formData.append(key, file));
    } else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return formData;
};



// 🔹 CREATE
export const createDocumentsOfEmployee = async (data) => {
  const formData = buildFormData(data);
  return api.post("employee-documents/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


// 🔹 READ ALL
export const getDocumentsOfEmployee = async () => {
  return api.get("employee-documents/");
};


// 🔹 READ SINGLE
export const getDocumentsOfEmployeeById = async (id) => {
  return api.get(`employee-documents/${id}/`);
};


// 🔹 UPDATE
export const updateDocumentsOfEmployee = async (id, data) => {
  const formData = buildFormData(data);
  return api.patch(`employee-documents/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


// 🔹 DELETE
export const deleteDocumentsOfEmployee = async (id) => {
  return api.delete(`employee-documents/${id}/`);
};
