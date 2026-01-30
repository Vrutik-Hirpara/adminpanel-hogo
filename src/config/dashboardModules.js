// import { themes } from "./theme.config";
// import { getDepartments } from "../services/department.service";
// import { getRoles } from "../services/roles.service";
// import { getEmployees } from "../services/employee.service";
// import { getOfficeBranches } from "../services/officebranches.service";

// export const dashboardModules = [
//   {
//     title: "Departments",
//     api: getDepartments,
//     color: themes.cardDepartment,
//     path: "/department",
//   },
//   {
//     title: "Roles",
//     api: getRoles,
//     color: themes.cardDonation,
//     path: "/roles",
//   },
//   {
//     title: "Office Branches",
//     api: getOfficeBranches,
//     color: themes.cardEvent,
//     path: "/office-branches",
//   },
//   {
//     title: "Employees",
//     api: getEmployees,
//     color: themes.cardContact,
//     path: "/employee",
//   },
// ];






// import { themes } from "./theme.config";
// import { getDepartments } from "../services/department.service";
// import { getRoles } from "../services/roles.service";
// import { getEmployees } from "../services/employee.service";
// import { getOfficeBranches } from "../services/officebranches.service";

// export const dashboardModules = [
//   {
//     title: "Departments",
//     api: getDepartments,
//     color: themes.cardDepartment,
//     path: "/department",
//     icon: "Building2",
//   },
//   {
//     title: "Roles",
//     api: getRoles,
//     color: themes.cardDonation,
//     path: "/roles",
//     icon: "Briefcase",
//   },
//   {
//     title: "Office Branches",
//     api: getOfficeBranches,
//     color: themes.cardEvent,
//     path: "/office-branches",
//     icon: "MapPin",
//   },
//   {
//     title: "Employees",
//     api: getEmployees,
//     color: themes.cardContact,
//     path: "/employee",
//     icon: "Users",
//   },
// ];









// import { themes } from "./theme.config";
// import { getDepartments } from "../services/department.service";
// import { getRoles } from "../services/roles.service";
// import { getEmployees } from "../services/employee.service";
// import { getOfficeBranches } from "../services/officebranches.service";

// export const dashboardModules = [
//   {
//     title: "Departments",
//     api: getDepartments,
//     color: themes.cardDepartment,
//     path: "/department",
//     icon: "Building2",
//     accentColor: "#4F46E5", // Premium indigo
//     gradient: "from-indigo-500 to-purple-600",
//   },
//   {
//     title: "Roles",
//     api: getRoles,
//     color: themes.cardDonation,
//     path: "/roles",
//     icon: "Briefcase",
//     accentColor: "#059669", // Premium emerald
//     gradient: "from-emerald-500 to-teal-600",
//   },
//   {
//     title: "Office Branches",
//     api: getOfficeBranches,
//     color: themes.cardEvent,
//     path: "/office-branches",
//     icon: "MapPin",
//     accentColor: "#DC2626", // Premium red
//     gradient: "from-red-500 to-orange-600",
//   },
//   {
//     title: "Employees",
//     api: getEmployees,
//     color: themes.cardContact,
//     path: "/employee",
//     icon: "Users",
//     accentColor: "#2563EB", // Premium blue
//     gradient: "from-blue-500 to-cyan-600",
//   },
// ];





import { themes } from "./theme.config";
import { getDepartments } from "../services/department.service";
import { getRoles } from "../services/roles.service";
import { getEmployees } from "../services/employee.service";
import { getOfficeBranches } from "../services/officebranches.service";

import { BarChart3 } from "lucide-react";
import {
  BuildingOffice2Icon,
  IdentificationIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export const dashboardModules = [
  {
    title: "Departments",
    api: getDepartments,
    color: themes.cardDepartment,
    path: "/department",
    icon: BuildingOffice2Icon,
  },
  {
    title: "Roles",
    api: getRoles,
    color: themes.cardDonation,
    path: "/role",
    icon: IdentificationIcon,
  },
  {
    title: "Office Branches",
    api: getOfficeBranches,
    color: themes.cardEvent,
    path: "/officebranches",
    icon: GlobeAltIcon,
  },
  {
    title: "Employees",
    api: getEmployees,
    color: themes.cardContact,
    path: "/employee",
    icon: UserGroupIcon,
  },
];
