


// import { NavLink } from "react-router-dom";
// import { themes } from "../config/theme.config";

// const menus = [
//   { label: "Dashboard", path: "/dashboard", icon: "📊" },
//   { label: "Categories", path: "/categories", icon: "📂" },
//   { label: "Donations", path: "/donations", icon: "💝" },
//   { label: "Events", path: "/events", icon: "📅" },
//   { label: "Contact", path: "/contact", icon: "📨" },
// ];

// const Sidebar = () => {
//   return (
//     <div
//       className="w-64 min-h-screen p-6"
//       style={{
//         backgroundColor: themes.backgroundBlack,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       <h4
//         className="text-xl font-semibold mb-8"
//         style={{ color: themes.textWhite }}
//       >
//         Employee Panel
//       </h4>

//       <ul className="space-y-3">
//         {menus.map((menu) => (
//           <NavLink
//             key={menu.path}
//             to={menu.path}
//             className="block px-4 py-3 rounded-lg transition"
//             style={({ isActive }) => ({
//               backgroundColor: isActive ? themes.primary : "transparent",
//               color: isActive ? themes.textWhite : themes.textMuted,
//             })}
//           >
//             {menu.icon} {menu.label}
//           </NavLink>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


// import { NavLink } from "react-router-dom";
// import { themes } from "../config/theme.config";

// const menus = [
//   { label: "Dashboard", path: "/dashboard", icon: "📊" },
//   { label: "Department", path: "/department", icon: "📂" },
//   { label: "roles", path: "/role", icon: "💝" },
//   { label: "OfficeBranches", path: "/officebranches", icon: "📅" },
//   { label: "Contact", path: "/contact", icon: "📨" },
// ];

// const Sidebar = () => {
//   return (
//     <div
//       className="w-56 sm:w-64 min-h-screen p-4 sm:p-6"
//       style={{
//         backgroundColor: themes.backgroundBlack,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       <h4
//         className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8"
//         style={{ color: themes.textWhite }}
//       >
//         Employee Panel
//       </h4>

//       <ul className="space-y-2 sm:space-y-3">
//         {menus.map((menu) => (
//           <NavLink
//             key={menu.path}
//             to={menu.path}
//             className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition"
//             style={({ isActive }) => ({
//               backgroundColor: isActive ? themes.primary : "transparent",
//               color: isActive ? themes.textWhite : themes.textMuted,
//             })}
//           >
//             {menu.icon} {menu.label}
//           </NavLink>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;












// import { NavLink } from "react-router-dom";
// import { themes } from "../config/theme.config";
// import {
//   Squares2X2Icon,
//   BuildingOffice2Icon,
//   IdentificationIcon,
//   GlobeAltIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";

// import { BarChart3 } from "lucide-react";


// const menus = [
//   {
//     label: "Dashboard",
//     path: "/dashboard",
//     icon: BarChart3,
//     color: "text-blue-500",
//   },
//   {
//     label: "Department",
//     path: "/department",
//     icon: BuildingOffice2Icon,
//     color: "text-purple-500",
//   },
//   {
//     label: "Roles",
//     path: "/role",
//     icon: IdentificationIcon,
//     color: "text-green-500",
//   },
//   {
//     label: "Office Branches",
//     path: "/officebranches",
//     icon: GlobeAltIcon,
//     color: "text-orange-500",
//   },
//   // {
//   //   label: "Blogs",
//   //   path: "/blog",
//   //   icon: GlobeAltIcon,
//   //   color: "text-orange-500",
//   // },
//   {
//     label: "Employee",
//     path: "/employee",
//     icon: UserGroupIcon,
//     color: "text-blue-500",
//   },
//     {
//     label: "personal Employee Details",
//     path: "/employee-personal-details",
//     icon: UserGroupIcon,
//     color: "text-blue-500",
//   },
//       {
//     label: "Employee Salary",
//     path: "/employee-salary",
//     icon: UserGroupIcon,
//     color: "text-blue-500",
//   }
//   ,
//       {
//     label: "Employee Documents",
//     path: "/employee-documents",
//     icon: UserGroupIcon,
//     color: "text-blue-500",
//   }
// ,
//       {
//     label: "Users",
//     path: "/users",
//     icon: UserGroupIcon,
//     color: "text-blue-500",
//   }

// ];

// const Sidebar = () => {
//   return (
//     <div
//       className="w-56 sm:w-64 min-h-screen p-4 sm:p-6"
//       style={{
//         backgroundColor: themes.sidebar,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       <h4
//         className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8"
//         style={{ color: themes.textWhite }}
//       >
//         Employee Panel
//       </h4>

//       <ul className="space-y-2 sm:space-y-3">
//         {menus.map((menu) => {
//           const Icon = menu.icon;

//           return (
//             <NavLink
//               key={menu.path}
//               to={menu.path}
//               className="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition group"
//               style={({ isActive }) => ({
//                 backgroundColor: isActive ? themes.primary : "transparent",
//                 color: isActive ? themes.textWhite : themes.textMuted,
//               })}
//             >
//               <Icon
//                 className={`w-5 h-5 ${menu.color} group-hover:scale-110 transition`}
//               />
//               {menu.label}
//             </NavLink>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;




// import { NavLink } from "react-router-dom";
// import { themes } from "../config/theme.config";
// import {
//   Squares2X2Icon,
//   BuildingOffice2Icon,
//   IdentificationIcon,
//   GlobeAltIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";
// import { BarChart3 } from "lucide-react";

// const menus = [
//   { label: "Dashboard", path: "/dashboard", icon: BarChart3, color: "text-blue-500" },
//   { label: "Department", path: "/department", icon: BuildingOffice2Icon, color: "text-purple-500" },
//   { label: "Roles", path: "/role", icon: IdentificationIcon, color: "text-green-500" },
//   { label: "Office Branches", path: "/officebranches", icon: GlobeAltIcon, color: "text-orange-500" },
//   { label: "Employee", path: "/employee", icon: UserGroupIcon, color: "text-blue-500" },
//   { label: "Personal Details", path: "/employee-personal-details", icon: UserGroupIcon, color: "text-blue-500" },
//   { label: "Employee Salary", path: "/employee-salary", icon: UserGroupIcon, color: "text-blue-500" },
//   { label: "Employee Documents", path: "/employee-documents", icon: UserGroupIcon, color: "text-blue-500" },
//   { label: "Users", path: "/users", icon: UserGroupIcon, color: "text-blue-500" },
// ];

// const Sidebar = () => {
//   return (
//     <div
//       className="w-52 sm:w-56 min-h-screen px-3 py-5"   // 🔥 width reduced + padding adjusted
//       style={{
//         backgroundColor: themes.sidebar,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       <h4
//         className="text-lg font-semibold mb-5 pl-2"
//         style={{ color: themes.textWhite }}
//       >
//         Employee Panel
//       </h4>

//       {/* 🔥 Reduced vertical gap */}
//       <ul className="space-y-1.5">
//         {menus.map((menu) => {
//           const Icon = menu.icon;

//           return (
//             <NavLink
//               key={menu.path}
//               to={menu.path}
//               className="flex items-center gap-3 px-3 py-2 rounded-md transition group text-sm"
//               style={({ isActive }) => ({
//                 backgroundColor: isActive ? themes.primary : "transparent",
//                 color: isActive ? themes.textWhite : themes.textMuted,
//               })}
//             >
//               <Icon
//                 className={`w-5 h-5 ${menu.color} group-hover:scale-110 transition`}
//               />
//               {menu.label}
//             </NavLink>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;






// import { themes } from "../config/theme.config";

// const Sidebar = () => {
//   return (
//     <div
//       className="w-56 h-screen px-3 py-5 overflow-hidden flex-shrink-0"
//       style={{
//         backgroundColor: themes.sidebar,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       <h4 className="text-lg font-semibold mb-5 pl-2 text-white">
//         Employee Panel
//       </h4>

//       <ul className="space-y-1.5">
//         {menus.map((menu) => {
//           const Icon = menu.icon;
//           return (
//             <NavLink
//               key={menu.path}
//               to={menu.path}
//               className="flex items-center gap-3 px-3 py-2 rounded-md transition group text-sm"
//               style={({ isActive }) => ({
//                 backgroundColor: isActive ? themes.primary : "transparent",
//                 color: isActive ? themes.textWhite : themes.textMuted,
//               })}
//             >
//               <Icon className={`w-5 h-5 ${menu.color}`} />
//               {menu.label}
//             </NavLink>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar



import { NavLink } from "react-router-dom";
import { themes } from "../config/theme.config";
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  Building2,
  Briefcase,
  FileText,
  Wallet,
  ShieldCheck
} from "lucide-react";

/* ✅ MENUS ARRAY MUST BE ABOVE COMPONENT */
const menus = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, color: "text-blue-500" },
  { label: "Department", path: "/department", icon: Building2, color: "text-purple-500" },
  { label: "Roles", path: "/role", icon: ShieldCheck, color: "text-green-500" },
  { label: "Office Branches", path: "/officebranches", icon: Briefcase, color: "text-orange-500" },
  { label: "Employee", path: "/employee", icon: Users, color: "text-blue-500" },
  { label: "Personal Details", path: "/employee-personal-details", icon: UserCircle2, color: "text-indigo-500" },
  { label: "Employee Salary", path: "/employee-salary", icon: Wallet, color: "text-emerald-500" },
  { label: "Employee Documents", path: "/employee-documents", icon: FileText, color: "text-rose-500" },
  { label: "Users", path: "/users", icon: Users, color: "text-cyan-500" },
  {
    label: "Leads",
    path: "/leads",
    icon: Users,
    color: "text-cyan-500"
  },
    {
    label: "Visits",
    path: "/visits",
    icon: Users,
    color: "text-cyan-500"
  },

];

const Sidebar = () => {
  return (
    <div
      className="w-56 h-screen px-3 py-5 overflow-hidden flex-shrink-0"
      style={{
        backgroundColor: themes.sidebar,
        fontFamily: themes.fontPrimary,
      }}
    >
      <h4 className="text-lg font-semibold mb-5 pl-2 text-white">
        Employee Panel
      </h4>

      <ul className="space-y-1.5">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className="flex items-center gap-3 px-3 py-2 rounded-md transition group text-sm"
              style={({ isActive }) => ({
                backgroundColor: isActive ? themes.primary : "transparent",
                color: isActive ? themes.textWhite : themes.textMuted,
              })}
            >
              <Icon className={`w-5 h-5 ${menu.color}`} />
              {menu.label}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
