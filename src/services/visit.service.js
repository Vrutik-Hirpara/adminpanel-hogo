import api from "./api";


// ================= VISITS CRUD =================

// GET ALL VISITS
export const getVisits = () => api.get("visits/");

// GET SINGLE VISIT
export const getVisitById = (id) => api.get(`visits/${id}/`);

// CREATE VISIT (with images)
export const createVisit = (data) =>
  api.post("visits/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// UPDATE VISIT (PATCH + images supported)
export const updateVisit = (id, data) =>
  api.patch(`visits/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// DELETE VISIT
export const deleteVisit = (id) => api.delete(`visits/${id}/`);


// ================= DROPDOWN DATA =================

// GET ALL LEADS (for lead_id dropdown)
export const getLeads = () => api.get("leads/");

// GET ALL EMPLOYEES (for employee_id dropdown)
export const getEmployees = () => api.get("employee/");
