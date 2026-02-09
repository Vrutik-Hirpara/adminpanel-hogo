
import {
  DepartmentAPI,
  RolesAPI,
  EmployeeAPI,
  BranchAPI,
  EmployeePersonalAPI,
  SalaryAPI,
  EmployeeDocsAPI,
  
LeaveBalanceAPI,
  UserAPI,
  LeadsAPI,
  VisitsAPI,
  HolidayAPI,
  ExpenseAPI,
  LeadFollowupsAPI,
} from "../services";

import {
  Briefcase,
  Building2,
  FileText,
  ShieldCheck,
  UserCircle2,
  Users,
  Wallet,
  UserPlus,
  MapPin,
  CalendarDays,
  ClipboardList,
  PhoneCall,
  Receipt,
} from "lucide-react";
import { themes } from "./theme.config";
import { followValue } from "framer-motion";
export const dashboardModules = [
  {
    title: "Departments",
    api: () => DepartmentAPI.getAll(),
    color: themes.cardDepartment,    path: "/department",
    icon: Building2,
  },
  {
    title: "Roles",
    api: () => RolesAPI.getAll(),
    color: themes.cardRole,    path: "/role",
    icon: ShieldCheck,
  },
  {
    title: "Office Branches",
    api: () => BranchAPI.getAll(),
    color: themes.cardOfficeBranch,    path: "/officebranches",
    icon: Briefcase,
  },
  {
    title: "Employees",
    api: () => EmployeeAPI.getAll(),
    color: themes.cardEmployee,    path: "/employee",
    icon: Users,
  },
  {
    title: "Personal Details",
    api: () => EmployeePersonalAPI.getAll(),
    color: themes.cardPersonalDetails,    path: "/employee-personal-details",
    icon: UserCircle2,
  },
  {
    title: "Employee Salary",
    api: () => SalaryAPI.getAll(),
    color: themes.cardSalary,    path: "/employee-salary",
    icon: Wallet,
  },
  {
    title: "Employee Documents",
    api: () => EmployeeDocsAPI.getAll(),
    color: themes.cardDocuments,    path: "/employee-documents",
    icon: FileText,
  },
  {
    title: "Users",
    api: () => UserAPI.getAll(),
    color: themes.cardUsers,    path: "/users",
    icon: Users,
  },

  // 🔥 NEW MODULES (Same icons as Sidebar)
  {
    title: "Leads",
    api: () => LeadsAPI.getAll(),
    color: themes.cardLeads,            path: "/leads",
    icon: UserPlus,
  },
  {
    title: "Visits",
    api: () => VisitsAPI.getAll(),
    color: themes.cardVisits,    path: "/visits",
    icon: MapPin,
  },
  {
    title: "Holiday",
    api: () => HolidayAPI.getAll(),
    color: themes.cardHoliday,    path: "/holiday",
    icon: CalendarDays,
  },
  {
    title: "Leave Balance",
    api: () => LeaveBalanceAPI.getAll(), // change if separate API exists
    color: themes.cardLeaveBalance,    path: "/leave-balance",
    icon: ClipboardList,
  },
    {
    title: "expense ",
    api: () => ExpenseAPI.getAll(), // change if separate API exists
    color: themes.cardLeaveBalance,    path: "/leave-balance",
    icon: Receipt,
  },
    {
    title: "lead-followups",
    api: () => LeadFollowupsAPI.getAll(), // change if separate API exists
    color: themes.cardLeaveBalance,    path: "/leave-balance",
    icon: PhoneCall,
  },
];
