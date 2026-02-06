import api from "./api";

/* 🔹 Helper */
const safeArr = (res) => res.data?.data || res.data || [];

/* ================= DASHBOARD ================= */
export const DashboardAPI = {
  getStats: async () => {
    const [categories, roles, officebranches, contacts] = await Promise.all([
      api.get("categories/"),
      api.get("roles/"),
      api.get("office_branches/"),
      api.get("contact/"),
    ]);

    return {
      categories: safeArr(categories),
      roles: safeArr(roles),
      officebranches: safeArr(officebranches),
      contacts: safeArr(contacts),
    };
  },
};

/* ================= DEPARTMENTS ================= */
export const DepartmentAPI = {
  getAll: () => api.get("departments/"),
  getById: (id) => api.get(`departments/${id}/`),
  create: (data) => api.post("departments/", data),
  update: (id, data) => api.patch(`departments/${id}/`, data),
  delete: (id) => api.delete(`departments/${id}/`),
};

/* ================= EMPLOYEES ================= */
export const EmployeeAPI = {
  getAll: () => api.get("employee/"),
  create: (data) => api.post("employee/", data),
  update: (id, data) => api.patch(`employee/${id}/`, data),
  delete: (id) => api.delete(`employee/${id}/`),
};

/* ================= EMPLOYEE PERSONAL DETAILS ================= */
export const EmployeePersonalAPI = {
  getAll: () => api.get("Employeepersonaldetails/"),
  create: (data) => api.post("Employeepersonaldetails/", data),
  update: (id, data) => api.patch(`Employeepersonaldetails/${id}/`, data),
  delete: (id) => api.delete(`Employeepersonaldetails/${id}/`),
};

/* ================= EMPLOYEE SALARY ================= */
export const SalaryAPI = {
  getAll: () => api.get("employee-salary/"),
  create: (data) => api.post("employee-salary/", data),
  update: (id, data) => api.patch(`employee-salary/${id}/`, data),
  delete: (id) => api.delete(`employee-salary/${id}/`),
};

/* ================= EMPLOYEE DOCUMENTS ================= */
export const EmployeeDocsAPI = {
  getAll: () => api.get("employee-documents/"),
  getById: (id) => api.get(`employee-documents/${id}/`),
  create: (data) =>
    api.post("employee-documents/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) =>
    api.patch(`employee-documents/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`employee-documents/${id}/`),
};

/* ================= LEADS ================= */
export const LeadsAPI = {
  getAll: () => api.get("leads/"),
  create: (data) => api.post("leads/", data),
  update: (id, data) => api.patch(`leads/${id}/`, data),
  delete: (id) => api.delete(`leads/${id}/`),
};

/* ================= ROLES ================= */
export const RolesAPI = {
  getAll: () => api.get("roles/"),
  getById: (id) => api.get(`roles/${id}/`),
  create: (data) => api.post("roles/", data),
  update: (id, data) => api.patch(`roles/${id}/`, data),
  delete: (id) => api.delete(`roles/${id}/`),
};

/* ================= OFFICE BRANCHES ================= */
export const BranchAPI = {
  getAll: () => api.get("office_branches/"),
  create: (data) => api.post("office_branches/", data),
  update: (id, data) => api.patch(`office_branches/${id}/`, data),
  delete: (id) => api.delete(`office_branches/${id}/`),
};

/* ================= USERS ================= */
export const UserAPI = {
  getAll: () => api.get("users/"),
  getById: (id) => api.get(`users/${id}/`),
  create: (data) => api.post("users/", data),
  update: (id, data) => api.patch(`users/${id}/`, data),
  delete: (id) => api.delete(`users/${id}/`),
};

// /* ================= VISITS ================= */
// export const VisitsAPI = {
//   getAll: () => api.get("visits/"),
//   getById: (id) => api.get(`visits/${id}/`),
//   create: (data) =>
//     api.post("visits/", data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     }),
//   update: (id, data) =>
//     api.patch(`visits/${id}/`, data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     }),
//   delete: (id) => api.delete(`visits/${id}/`),
// };
export const VisitsAPI = {
  getAll: () => api.get("visits/"),
  getById: (id) => api.get(`visits/${id}/`),

  create: (data) => {
    const isForm = data instanceof FormData;
    return api.post("visits/", data, {
      headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
    });
  },

  update: (id, data) => {
    const isForm = data instanceof FormData;
    // console.log(isForm,"okok",data)
    return api.patch(`visits/${id}/`, data, {
      headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
    });
  },

  delete: (id) => api.delete(`visits/${id}/`),
};

/* ================= HOLIDAYS ================= */
export const HolidayAPI = {
  getAll: () => api.get("holidays/"),
  create: (data) => api.post("holidays/", data),
  update: (id, data) => api.patch(`holidays/${id}/`, data),
  delete: (id) => api.delete(`holidays/${id}/`),
};


/* ================= LEAVE BALANCE ================= */
export const LeaveBalanceAPI = {
  getAll: () => api.get("leave-balance/"),
  create: (data) => api.post("leave-balance/", data),
  update: (id, data) => api.patch(`leave-balance/${id}/`, data),
  delete: (id) => api.delete(`leave-balance/${id}/`),
};


export const LeaveRequestsAPI = {
  getAll: () => api.get("leave-requests/"),
  create: (data) =>
    api.post("leave-requests/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) =>
    api.patch(`leave-requests/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`leave-requests/${id}/`),
};
