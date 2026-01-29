import { themes } from "./theme.config";
import { getDepartments } from "../services/department.service";
import { getRoles } from "../services/roles.service";
import { getOfficeBranches } from "../services/officebranches.service";

export const dashboardModules = [
  {
    title: "Departments",
    color: themes.cardDepartment,
    api: getDepartments,
  },
  {
    title: "Roles",
    color: themes.cardDonation,
    api: getRoles,
  },
  {
    title: "Office Branches",
    color: themes.cardEvent,
    api: getOfficeBranches,
  },
];
