import { createCRUD } from "./apiFactory";

export const DepartmentAPI = createCRUD("departments");
export const EmployeeAPI = createCRUD("employee");
export const EmployeePersonalAPI = createCRUD("Employeepersonaldetails");
export const SalaryAPI = createCRUD("employee-salary");
export const EmployeeDocsAPI = createCRUD("employee-documents");
export const LeadsAPI = createCRUD("leads");
export const RolesAPI = createCRUD("roles");
export const BranchAPI = createCRUD("office_branches");
export const UserAPI = createCRUD("users");
export const VisitsAPI = createCRUD("visits");
export const HolidayAPI = createCRUD("holidays");
export const LeaveBalanceAPI = createCRUD("leave-balance");
export const LeaveRequestsAPI = createCRUD("leave-requests");
export const ExpenseAPI = createCRUD("expenses");
