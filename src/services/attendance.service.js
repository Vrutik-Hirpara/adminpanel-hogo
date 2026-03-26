// import api from "./api";

// const safeArr = (res) => res.data?.data || res.data || [];

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

//   update: async (id, data) => {
//     const res = await api.put(`employee_attendence/${id}/`, data);
//     return res.data;
//   },

//   delete: async (id) => {
//     const res = await api.delete(`employee_attendence/${id}/`);
//     return res.data;
//   },

//   // Custom methods for filtering
//   getByDate: async (date) => {
//     const res = await api.get(`employee_attendence/?date=${date}`);
//     return safeArr(res);
//   },

//   getByMonth: async (month) => {
//     const res = await api.get(`employee_attendence/?month=${month}`);
//     return safeArr(res);
//   },

//   getByDateRange: async (startDate, endDate) => {
//     const res = await api.get(`employee_attendence/?start_date=${startDate}&end_date=${endDate}`);
//     return safeArr(res);
//   },

// getByEmployeeAndMonth: async (employeeId, month) => {
//   const res = await api.get(`employee_attendence/?employee=${employeeId}&month=${month}`);
//   return res;  // Return full response, not safeArr(res)
// },

//   getByEmployeeAndDateRange: async (employeeId, startDate, endDate) => {
//     const res = await api.get(`employee_attendence/?employee=${employeeId}&start_date=${startDate}&end_date=${endDate}`);
//     return safeArr(res);
//   }
// };