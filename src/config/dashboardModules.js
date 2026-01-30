// import { themes } from "./theme.config";
// import { getDepartments } from "../services/department.service";
// import { getRoles } from "../services/roles.service";
// import { getOfficeBranches } from "../services/officebranches.service";

// export const dashboardModules = [
//   {
//     title: "Departments",
//     color: themes.cardDepartment,
//     api: getDepartments,
//   },
//   {
//     title: "Roles",
//     color: themes.cardDonation,
//     api: getRoles,
//   },
//   {
//     title: "Office Branches",
//     color: themes.cardEvent,
//     api: getOfficeBranches,
//   },
// ];










import { themes } from "./theme.config";
import { getDepartments } from "../services/department.service";
import { getRoles } from "../services/roles.service";
import { getEmployees } from "../services/employee.service";
import { getOfficeBranches } from "../services/officebranches.service";

export const dashboardModules = [
  {
    title: "Departments",
    api: getDepartments,
    color: themes.cardDepartment,
    path: "/department",
  },
  {
    title: "Roles",
    api: getRoles,
    color: themes.cardDonation,
    path: "/roles",
  },
    {
    title: "Office Branches",
    api: getOfficeBranches,
    color: themes.cardEvent,
    path: "/office-branches",
  },
  {
    title: "Employees",
    api: getEmployees,
    color: themes.cardContact,
    path: "/employee",
  },

];
