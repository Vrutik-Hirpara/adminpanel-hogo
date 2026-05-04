
// import {
//   DepartmentAPI,
//   RolesAPI,
//   EmployeeAPI,
//   BranchAPI,
//   EmployeePersonalAPI,
//   SalaryAPI,
//   EmployeeDocsAPI,
  
// LeaveBalanceAPI,
//   UserAPI,
//   LeadsAPI,
//   VisitsAPI,
//   HolidayAPI,
//   ExpenseAPI,
//   LeadFollowupsAPI,
// } from "../services";

// import {
//   Briefcase,
//   Building2,
//   FileText,
//   ShieldCheck,
//   UserCircle2,
//   Users,
//   Wallet,
//   UserPlus,
//   MapPin,
//   CalendarDays,
//   ClipboardList,
//   PhoneCall,
//   Receipt,
// } from "lucide-react";
// import { themes } from "./theme.config";
// import { followValue } from "framer-motion";
// export const dashboardModules = [
//   {
//     title: "Departments",
//     api: () => DepartmentAPI.getAll(),
//     color: themes.cardDepartment,    path: "/department",
//     icon: Building2,
//   },
//   {
//     title: "Roles",
//     api: () => RolesAPI.getAll(),
//     color: themes.cardRole,    path: "/role",
//     icon: ShieldCheck,
//   },
//   {
//     title: "Office Branches",
//     api: () => BranchAPI.getAll(),
//     color: themes.cardHoliday,    path: "/officebranches",
//     icon: Briefcase,
//   },
//   {
//     title: "Employees",
//     api: () => EmployeeAPI.getAll(),
//     color: themes.cardEmployee,    path: "/employee",
//     icon: Users,
//   },
//     {
//     title: "Users",
//     api: () => UserAPI.getAll(),
//     color: themes.cardUsers,    path: "/users",
//     icon: Users,
//   },

//   {
//     title: "Personal Details",
//     api: () => EmployeePersonalAPI.getAll(),
//     color: themes.cardPersonalDetails,    path: "/employee-personal-details",
//     icon: UserCircle2,
//   },
//   {
//     title: "Employee Salary",
//     api: () => SalaryAPI.getAll(),
//     color: themes.cardSalary,    path: "/employee-salary",
//     icon: Wallet,
//   },
//   {
//     title: "Employee Documents",
//     api: () => EmployeeDocsAPI.getAll(),
//     color: themes.cardDocuments,    path: "/employee-documents",
//     icon: FileText,
//   },

//   // 🔥 NEW MODULES (Same icons as Sidebar)
//   {
//     title: "Leads",
//     api: () => LeadsAPI.getAll(),
//     color: themes.cardUsers,            path: "/leads",
//     icon: UserPlus,
//   },
//   {
//     title: "Visits",
//     api: () => VisitsAPI.getAll(),
//     color: themes.cardSalary,    path: "/visits",
//     icon: MapPin,
//   },
//   {
//     title: "Holiday",
//     api: () => HolidayAPI.getAll(),
//     color: themes.cardHoliday,    path: "/holiday",
//     icon: CalendarDays,
//   },
//   {
//     title: "Leave Balance",
//     api: () => LeaveBalanceAPI.getAll(), // change if separate API exists
//     color: themes.cardLeaveBalance,    path: "/leave-balance",
//     icon: ClipboardList,
//   },
//     {
//     title: "expense ",
//     api: () => ExpenseAPI.getAll(), // change if separate API exists
//     color: themes.cardLeaveBalance,    path: "/leave-balance",
//     icon: Receipt,
//   },
//     {
//     title: "lead-followups",
//     api: () => LeadFollowupsAPI.getAll(), // change if separate API exists
//     color: themes.cardLeaveBalance,    path: "/leave-balance",
//     icon: PhoneCall,
//   },
// ];

import axios from "axios";
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
  CalendarCheck,
} from "lucide-react";

import { themes } from "./theme.config";

export const dashboardModules = [
  {
    title: "Departments",
    api: () => DepartmentAPI.getAll(),
    color: themes.cardDepartment,
    path: "/department",
    icon: Building2,
  },
  {
    title: "Roles",
    api: () => RolesAPI.getAll(),
    color: themes.cardRole,
    path: "/role",
    icon: ShieldCheck,
  },
  {
    title: "Office Branches",
    api: () => BranchAPI.getAll(),
    color: themes.cardHoliday,
    path: "/officebranches",
    icon: Briefcase,
  },
  {
    title: "Employees",
    api: () => EmployeeAPI.getAll(),
    color: themes.cardEmployee,
    path: "/employee",
    icon: Users,
  },
  {
    title: "Users",
    api: () => UserAPI.getAll(),
    color: themes.cardUsers,
    path: "/users",
    icon: Users,
  },
  {
    title: "Personal Details",
    api: () => EmployeePersonalAPI.getAll(),
    color: themes.cardPersonalDetails,
    path: "/employee-personal-details",
    icon: UserCircle2,
  },
  {
    title: "Employee Salary",
    api: () => SalaryAPI.getAll(),
    color: themes.cardSalary,
    path: "/employee-salary",
    icon: Wallet,
  },
  {
    title: "Employee Documents",
    api: () => EmployeeDocsAPI.getAll(),
    color: themes.cardDocuments,
    path: "/employee-documents",
    icon: FileText,
  },
  // {
  //   title: "Leads",
  //   api: () => LeadsAPI.getAll(),
  //   color: themes.cardUsers,
  //   path: "/leads",
  //   icon: UserPlus,
  // },
  // {
  //   title: "Visits",
  //   api: () => VisitsAPI.getAll(),
  //   color: themes.cardSalary,
  //   path: "/visits",
  //   icon: MapPin,
  // },

{
  title: "Visits",
  api: (employeeId, leadId) => {
    // 🔥 priority: leadId hoy to ena thi fetch karo
    if (leadId) {
      return VisitsAPI.getByLeadId(leadId);
    }

    // fallback employee based
    if (employeeId) {
      return VisitsAPI.filter({ employee_id: employeeId });
    }

    return VisitsAPI.getAll();
  },
  path: "/visits",
  color: themes.cardUsers,
  icon: MapPin,
},

// {
//     title: "Leads",
//     api: (employeeId) => {
//         // 🔥 Non-HR mate: assigned_to=[employeeId] API
//         return axios.get(`https://hogofilm.pythonanywhere.com/leads/?assigned_to=${employeeId}`);
//     },
//     color: themes.cardUsers,
//     path: "/leads",
//     icon: UserPlus,
//     gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
//     accentColor: "blue",
// },
{
    title: "Leads",
    api: (isHR, employeeId) => {
        if (isHR) {
            return LeadsAPI.getAll();
        }
        return LeadsAPI.filter({ assigned_to: employeeId });
    },
    color: themes.cardUsers,
    path: "/leads",
    icon: UserPlus,
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    accentColor: "blue",
},
// {
//   title: "Today's Followups",
//   api: (employeeId) => {
//     if (!employeeId) {
//       return Promise.resolve({ data: { data: [] } });
//     }

//     return axios.get(
//       `${baseURL}/today-followups/${employeeId}/`
//     );
//   },
//   path: "/lead-followups",
//   color: "from-green-500 to-green-600",
//   icon: CalendarCheck,
//   gradient: "bg-gradient-to-br from-green-500 to-green-600",
//   accentColor: "green",
// },
{
  title: "Today's Followups",
  api: (employeeId) => {
    if (!employeeId) {
      return Promise.resolve({ data: { data: [] } });
    }

    return api.get(`/today-followups/${employeeId}/`);
  },
  path: "/lead-followups",
  color: "from-green-500 to-green-600",
  icon: CalendarCheck,
  gradient: "bg-gradient-to-br from-green-500 to-green-600",
  accentColor: "green",
},
  {
    title: "Holiday",
    api: () => HolidayAPI.getAll(),
    color: themes.cardHoliday,
    path: "/holiday",
    icon: CalendarDays,
  },
  {
    title: "Leave Balance",
    api: () => LeaveBalanceAPI.getAll(),
    color: themes.cardLeaveBalance,
    path: "/leave-balance",
    icon: ClipboardList,
  },
  {
    title: "Expenses",
    api: () => ExpenseAPI.getAll(),
    color: themes.cardLeaveBalance,
    path: "/expenses",        // ✅ FIXED
    icon: Receipt,
  },
  {
    title: "Lead Followups",
    api: () => LeadFollowupsAPI.getAll(),
    color: themes.cardLeaveBalance,
    path: "/leads",  // ✅ FIXED
    icon: PhoneCall,
  },
];