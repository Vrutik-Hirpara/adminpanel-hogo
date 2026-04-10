

import api from "./api";
import { createCRUD } from "./apiFactory";
import { appendQueryParams } from "../utils/apiFilter";
/* ================= BASIC CRUD APIs ================= */
export const DepartmentAPI = createCRUD("departments");
export const EmployeeAPI = createCRUD("employee");
export const EmployeePersonalAPI = createCRUD("Employeepersonaldetails");
// export const SalaryAPI = createCRUD("employee-salary");
export const EmployeeDocsAPI = createCRUD("employee-documents");
export const RolesAPI = createCRUD("roles");
export const BranchAPI = createCRUD("office_branches");
export const UserAPI = createCRUD("users");
export const HolidayAPI = createCRUD("holidays");
export const LeaveBalanceAPI = createCRUD("leave-balance");
export const LeaveRequestsAPI = createCRUD("leave-requests");
// export const ExpenseAPI = createCRUD("expenses");
export const LeadFollowupsAPI = createCRUD("lead_followups");
export const TravelPlanAPI = createCRUD("travel-plan");
export const DailyPlanAPI = createCRUD("daily-plan");

/* ================= LEADS CUSTOM ================= */
// export const LeadsAPI = {
//   ...createCRUD("leads"),
//   getByEmployee: (employeeId) => api.get(`leads/${employeeId}/`),
// };
export const SalaryAPI = {
  ...createCRUD("employee-salary"),

  filter: (params) => {
    const cleanParams = {};

    // ❗ only allow true/false
    if (params.status === "true" || params.status === "false") {
      cleanParams.status = params.status;
    }

    const url = appendQueryParams("employee-salary/", cleanParams);
    return api.get(url);
  },
};
export const LeadsAPI = {
  ...createCRUD("leads"),

  filter: (params) => {
    const url = appendQueryParams("leads/", params);
    return api.get(url);
  },
};
/* ================= VISITS CUSTOM ================= */
// export const VisitsAPI = {
//   ...createCRUD("visits"),
//   getByEmployee: (employeeId) =>
//     api.get(`visits/?employee_id=${employeeId}`),
//   getByLeadId: (leadId) =>
//     api.get(`visits/?lead_id=${leadId}`),
// };
// export const VisitsAPI = {
//   ...createCRUD("visits"),

//   filter: (params) => {
//     const url = appendQueryParams("visits/", params);
//     return api.get(url);
//   },
// };
export const VisitsAPI = {
  ...createCRUD("visits"),

  filter: async (params) => {
    const url = appendQueryParams("visits/", params);
    const res = await api.get(url);
    console.log("Filter response:", res.data); // Debug log
    // Make sure we always return an array
    if (Array.isArray(res.data)) {
      return res.data;
    } else if (res.data?.data && Array.isArray(res.data.data)) {
      return res.data.data;
    } else if (res.data?.results && Array.isArray(res.data.results)) {
      return res.data.results;
    }
    return []; // Return empty array if nothing matches
  },

  getByEmployee(employeeId) {
    return this.filter({ employee_id: employeeId });
  },

  getByLeadId(leadId) {
    return this.filter({ lead_id: leadId });
  },
};
/* ================= DASHBOARD ================= */
const safeArr = (res) => res.data?.data || res.data || [];

export const DashboardAPI = {
  getStats: async () => {
    const [categories, roles, officebranches, contacts] =
      await Promise.all([
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

/* ================= ATTENDANCE ================= */
export const EmployeeAttendanceAPI = {
  ...createCRUD("employee_attendence"),

  getByDate: (date) =>
    api.get(`employee_attendence/?date=${date}`),

  getByMonth: (month, year) =>
    api.get(`employee_attendence/?month=${month}&year=${year}`),

  getByDateRange: (startDate, endDate) =>
    api.get(
      `employee_attendence/?start_date=${startDate}&end_date=${endDate}`
    ),

  getByEmployeeAndMonth: (employeeId, month) =>
    api.get(
      `employee_attendence/?employee_id=${employeeId}&month=${month}`
    ),

  getByEmployeeAndDateRange: (employeeId, startDate, endDate) =>
    api.get(
      `employee_attendence/?employee_id=${employeeId}&start_date=${startDate}&end_date=${endDate}`
    ),
  getPreviousMonthByEmployee: (employeeId) =>
    api.get(
      `employee_attendence/?employee_id=${employeeId}&prev_month=true`
    ),
};


/* ================= SALARY PAYMENT ================= */
export const SalaryPaymentAPI = {

  filter: (params) => {
    const url = appendQueryParams("salary-payment/", params);
    return api.get(url);
  },
};

export const ExpenseAPI = {
  getAll: () => api.get("/expenses/"),

  // Add this new method for employee-specific expenses
  getByEmployee: (employeeId) => api.get(`/expenses/?employee_id=${employeeId}`),

  getById: (id) => api.get(`/expenses/${id}/`),
  create: (data) => api.post("/expenses/", data),
  update: (id, data) => api.patch(`/expenses/${id}/`, data),
  delete: (id) => api.delete(`/expenses/${id}/`),
};
