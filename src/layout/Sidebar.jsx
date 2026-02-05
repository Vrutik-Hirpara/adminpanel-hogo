


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



// import { NavLink } from "react-router-dom";
// import { themes } from "../config/theme.config";
// import {
//   LayoutDashboard,
//   Users,
//   UserCircle2,
//   Building2,
//   Briefcase,
//   FileText,
//   Wallet,
//   ShieldCheck,
//   UserPlus,
//   MapPin,
//   CalendarDays,
//   ClipboardList
// } from "lucide-react";

// /* ✅ MENUS ARRAY MUST BE ABOVE COMPONENT */
// const menus = [
//   { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, color: "text-blue-500" },
//   { label: "Department", path: "/department", icon: Building2, color: "text-purple-500" },
//   { label: "Roles", path: "/role", icon: ShieldCheck, color: "text-green-500" },
//   { label: "Office Branches", path: "/officebranches", icon: Briefcase, color: "text-orange-500" },
//   { label: "Employee", path: "/employee", icon: Users, color: "text-blue-500" },
//   { label: "Personal Details", path: "/employee-personal-details", icon: UserCircle2, color: "text-indigo-500" },
//   { label: "Employee Salary", path: "/employee-salary", icon: Wallet, color: "text-emerald-500" },
//   { label: "Employee Documents", path: "/employee-documents", icon: FileText, color: "text-rose-500" },
//   { label: "Users", path: "/users", icon: Users, color: "text-cyan-500" },
//  {
//   label: "Leads",
//   path: "/leads",
//   icon: UserPlus,
//   color: "text-cyan-500"
// },
// {
//   label: "Visits",
//   path: "/visits",
//   icon: MapPin,
//   color: "text-emerald-500"
// },
// {
//   label: "Holiday",
//   path: "/holiday",
//   icon: CalendarDays,
//   color: "text-orange-500"
// },
// {
//   label: "Leave Balance",
//   path: "/leave-balance",
//   icon: ClipboardList,
//   color: "text-purple-500"
// },


// ];

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

// export default Sidebar;


// import { NavLink, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { themes } from "../config/theme.config";
// import {
//   LayoutDashboard,
//   Users,
//   UserCircle2,
//   Building2,
//   Briefcase,
//   FileText,
//   Wallet,
//   ShieldCheck,
//   UserPlus,
//   MapPin,
//   CalendarDays,
//   ClipboardList,
//   ChevronDown,
// } from "lucide-react";

// /* SAME MENUS BUT EMPLOYEE HAS CHILDREN */
// const menus = [
//   { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, color: "text-blue-500" },
//   { label: "Department", path: "/department", icon: Building2, color: "text-purple-500" },
//   { label: "Roles", path: "/role", icon: ShieldCheck, color: "text-green-500" },
//   { label: "Office Branches", path: "/officebranches", icon: Briefcase, color: "text-orange-500" },

//   {
//     label: "Employee",
//     icon: Users,
//     color: "text-blue-500",
//     children: [
//       { label: "Employee", path: "/employee", icon: Users, color: "text-blue-500" },
//       { label: "Personal Details", path: "/employee-personal-details", icon: UserCircle2, color: "text-indigo-500" },
//       { label: "Employee Salary", path: "/employee-salary", icon: Wallet, color: "text-emerald-500" },
//       { label: "Employee Documents", path: "/employee-documents", icon: FileText, color: "text-rose-500" },
//     ],
//   },

//   { label: "Users", path: "/users", icon: Users, color: "text-cyan-500" },
//   { label: "Leads", path: "/leads", icon: UserPlus, color: "text-cyan-500" },
//   { label: "Visits", path: "/visits", icon: MapPin, color: "text-emerald-500" },
//   { label: "Holiday", path: "/holiday", icon: CalendarDays, color: "text-orange-500" },
//   { label: "Leave Balance", path: "/leave-balance", icon: ClipboardList, color: "text-purple-500" },
// ];

// const Sidebar = () => {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();

//   // Auto open when on employee routes
//   useEffect(() => {
//     if (location.pathname.startsWith("/employee")) {
//       setOpen(true);
//     }
//   }, [location.pathname]);

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
//         {menus.map((menu, index) => {
//           const Icon = menu.icon;

//           // 🔽 ONLY EMPLOYEE DROPDOWN
//           if (menu.children) {
//             return (
//               <div key={index}>
//                 <button
//                   onClick={() => setOpen(!open)}
//                   className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm"
//                   style={{
//                     color: themes.textMuted,
//                   }}
//                 >
//                   <div className="flex items-center gap-3">
//                     <Icon className={`w-5 h-5 ${menu.color}`} />
//                     {menu.label}
//                   </div>
//                   <ChevronDown
//                     className={`w-4 h-4 transition-transform ${
//                       open ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {open && (
//                   <div className="ml-6 space-y-1">
//                     {menu.children.map((sub) => {
//                       const SubIcon = sub.icon;
//                       return (
//                         <NavLink
//                           key={sub.path}
//                           to={sub.path}
//                           className="flex items-center gap-3 px-3 py-2 rounded-md text-sm"
//                           style={({ isActive }) => ({
//                             backgroundColor: isActive ? themes.primary : "transparent",
//                             color: isActive ? themes.textWhite : themes.textMuted,
//                           })}
//                         >
//                           <SubIcon className={`w-5 h-5 ${sub.color}`} />
//                           {sub.label}
//                         </NavLink>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           }

//           // 🔹 OTHER MENUS UNTOUCHED
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

// export default Sidebar;
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { themes } from "../config/theme.config";
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  Building2,
  Briefcase,
  FileText,
  Wallet,
  ShieldCheck,
  UserPlus,
  MapPin,
  CalendarDays,
  ClipboardList,
  ChevronDown,
  TrendingUp,
  UserCheck,
  Layers,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const [openEmployee, setOpenEmployee] = useState(false);
  const [openOffice, setOpenOffice] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openHR, setOpenHR] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/employee")) setOpenEmployee(true);
    if (["/department", "/role", "/officebranches"].some(p => location.pathname.startsWith(p))) setOpenOffice(true);
    if (["/leads", "/users"].some(p => location.pathname.startsWith(p))) setOpenSales(true);
    if (["/holiday", "/leave-balance"].some(p => location.pathname.startsWith(p))) setOpenHR(true);
  }, [location.pathname]);

  const Dropdown = ({ label, icon: Icon, color, open, setOpen, children }) => (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm"
        style={{ color: themes.textMuted }}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${color}`} />
          {label}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && <div className="ml-6 space-y-1">{children}</div>}
    </div>
  );

  const LinkItem = ({ to, icon: Icon, label, color }) => (
    <NavLink
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm"
      style={({ isActive }) => ({
        backgroundColor: isActive ? themes.primary : "transparent",
        color: isActive ? themes.textWhite : themes.textMuted,
      })}
    >
      <Icon className={`w-5 h-5 ${color}`} />
      {label}
    </NavLink>
  );

  return (
    <div
      className="w-56 h-screen px-3 py-5 overflow-hidden flex-shrink-0"
      style={{ backgroundColor: themes.sidebar, fontFamily: themes.fontPrimary }}
    >
      <h4 className="text-lg font-semibold mb-5 pl-2 text-white">Employee Panel</h4>

      <ul className="space-y-1.5">

        <LinkItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" color="text-blue-500" />

        {/* OFFICE */}
        <Dropdown label="Office" icon={Briefcase} color="text-purple-500" open={openOffice} setOpen={setOpenOffice}>
          <LinkItem to="/department" icon={Building2} label="Department" color="text-purple-500" />
          <LinkItem to="/role" icon={ShieldCheck} label="Roles" color="text-green-500" />
          <LinkItem to="/officebranches" icon={Layers} label="Office Branches" color="text-orange-500" />
        </Dropdown>

        {/* EMPLOYEE */}
        <Dropdown label="Employee" icon={Users} color="text-blue-500" open={openEmployee} setOpen={setOpenEmployee}>
          <LinkItem to="/employee" icon={Users} label="Employee" color="text-blue-500" />
          <LinkItem to="/employee-personal-details" icon={UserCircle2} label="Personal Details" color="text-indigo-500" />
          <LinkItem to="/employee-salary" icon={Wallet} label="Employee Salary" color="text-emerald-500" />
          <LinkItem to="/employee-documents" icon={FileText} label="Employee Documents" color="text-rose-500" />
        </Dropdown>

        {/* SALES */}
        <Dropdown label="Sales" icon={TrendingUp} color="text-cyan-500" open={openSales} setOpen={setOpenSales}>
          <LinkItem to="/leads" icon={UserPlus} label="Leads" color="text-cyan-500" />
          <LinkItem to="/users" icon={Users} label="Users" color="text-cyan-500" />
          <LinkItem to="/visits" icon={MapPin} label="Visits" color="text-emerald-500" />
        </Dropdown>

        {/* HR */}
        <Dropdown label="HR" icon={UserCheck} color="text-purple-500" open={openHR} setOpen={setOpenHR}>
          <LinkItem to="/holiday" icon={CalendarDays} label="Holiday" color="text-orange-500" />
          <LinkItem to="/leave-balance" icon={ClipboardList} label="Leave Balance" color="text-purple-500" />
        </Dropdown>

      </ul>
    </div>
  );
};

export default Sidebar;
