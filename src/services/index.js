// import api from "./api";
// import { createCRUD } from "./apiFactory";
// import { VisitsAPI as CustomVisitsAPI } from "./visits.service";
// export const DepartmentAPI = createCRUD("departments");
// export const EmployeeAPI = createCRUD("employee");
// export const EmployeePersonalAPI = createCRUD("Employeepersonaldetails");
// export const SalaryAPI = createCRUD("employee-salary");
// export const EmployeeDocsAPI = createCRUD("employee-documents");
// export const LeadsAPI = createCRUD("leads");
// export const RolesAPI = createCRUD("roles");
// export const BranchAPI = createCRUD("office_branches");
// export const UserAPI = createCRUD("users");
// // export const VisitsAPI = createCRUD("visits");
// export const VisitsAPI = CustomVisitsAPI;
// export const HolidayAPI = createCRUD("holidays");
// export const LeaveBalanceAPI = createCRUD("leave-balance");
// export const LeaveRequestsAPI = createCRUD("leave-requests");
// export const ExpenseAPI = createCRUD("expenses");
// export const LeadFollowupsAPI = createCRUD("lead_followups");
// // Add Travel Plan and Daily Plan APIs
// export const TravelPlanAPI = createCRUD("travel-plan");
// export const DailyPlanAPI = createCRUD("daily-plan");


// // Helper function
// const safeArr = (res) => res.data?.data || res.data || [];

// // Base CRUD for attendance
// const baseAttendanceAPI = createCRUD("employee_attendence");

// // Extended EmployeeAttendanceAPI with custom methods
// export const EmployeeAttendanceAPI = {
//   // Base CRUD operations
//   getAll: async () => {
//     const res = await api.get("employee_attendence/");
//     return safeArr(res);
//   },

//   getById: async (id) => {
//     const res = await api.get(`employee_attendence/${id}/`);
//     return res.data;
//   },

//   create: async (data) => {
//     const res = await api.post("employee_attendence/", data);
//     return res.data;
//   },

//   // ✅ Fixed: Use PATCH with correct spelling: employee_attendence
//   update: async (id, data) => {
//     const res = await api.patch(`employee_attendence/${id}/`, data);
//     return res.data;
//   },

//   delete: async (id) => {
//     const res = await api.delete(`employee_attendence/${id}/`);
//     return res.data;
//   },

//   // Custom methods for filtering
//   getByDate: async (date) => {
//     const res = await api.get(`employee_attendence/?date=${date}`);
//     return res;
//   },

//   getByMonth: async (month) => {
//     const res = await api.get(`employee_attendence/?month=${month}`);
//     return res;
//   },

//   getByDateRange: async (startDate, endDate) => {
//     const res = await api.get(`employee_attendence/?start_date=${startDate}&end_date=${endDate}`);
//     return res;
//   },

//   getByEmployeeAndMonth: async (employeeId, month) => {
//     const res = await api.get(`employee_attendence/?employee_id=${employeeId}&month=${month}`);
//     return res;
//   },

//   getByEmployeeAndDateRange: async (employeeId, startDate, endDate) => {
//     const res = await api.get(`employee_attendence/?employee_id=${employeeId}&start_date=${startDate}&end_date=${endDate}`);
//     return res;
//   }
// };


import api from "./api";
import { createCRUD } from "./apiFactory";
import { appendQueryParams } from "../utils/apiFilter";
/* ================= BASIC CRUD APIs ================= */
export const DepartmentAPI = createCRUD("departments");
export const EmployeeAPI = createCRUD("employee");
export const EmployeePersonalAPI = createCRUD("Employeepersonaldetails");
export const SalaryAPI = createCRUD("employee-salary");
export const EmployeeDocsAPI = createCRUD("employee-documents");
export const RolesAPI = createCRUD("roles");
export const BranchAPI = createCRUD("office_branches");
export const UserAPI = createCRUD("users");
export const HolidayAPI = createCRUD("holidays");
export const LeaveBalanceAPI = createCRUD("leave-balance");
export const LeaveRequestsAPI = createCRUD("leave-requests");
export const ExpenseAPI = createCRUD("expenses");
export const LeadFollowupsAPI = createCRUD("lead_followups");
export const TravelPlanAPI = createCRUD("travel-plan");
export const DailyPlanAPI = createCRUD("daily-plan");

/* ================= LEADS CUSTOM ================= */
// export const LeadsAPI = {
//   ...createCRUD("leads"),
//   getByEmployee: (employeeId) => api.get(`leads/${employeeId}/`),
// };

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
    return res.data;
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

  getByMonth: (month) =>
    api.get(`employee_attendence/?month=${month}`),

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
};