
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
//   TrendingUp,
//   UserCheck,
//   Layers,
// } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();

//   const [openEmployee, setOpenEmployee] = useState(false);
//   const [openOffice, setOpenOffice] = useState(false);
//   const [openSales, setOpenSales] = useState(false);
//   const [openHR, setOpenHR] = useState(false);

//   useEffect(() => {
//     if (location.pathname.startsWith("/employee")) setOpenEmployee(true);
//     if (["/department", "/role", "/officebranches"].some(p => location.pathname.startsWith(p))) setOpenOffice(true);
//     if (["/leads", "/users"].some(p => location.pathname.startsWith(p))) setOpenSales(true);
//     if (["/holiday", "/leave-balance"].some(p => location.pathname.startsWith(p))) setOpenHR(true);
//   }, [location.pathname]);

//   const Dropdown = ({ label, icon: Icon, color, open, setOpen, children }) => (
//     <div>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm"
//         style={{ color: themes.textMuted }}
//       >
//         <div className="flex items-center gap-3">
//           <Icon className={`w-5 h-5 ${color}`} />
//           {label}
//         </div>
//         <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>

//       {open && <div className="ml-6 space-y-1">{children}</div>}
//     </div>
//   );

//   const LinkItem = ({ to, icon: Icon, label, color }) => (
//     <NavLink
//       to={to}
//       className="flex items-center gap-3 px-3 py-2 rounded-md text-sm"
//       style={({ isActive }) => ({
//         backgroundColor: isActive ? themes.primary : "transparent",
//         color: isActive ? themes.textWhite : themes.textMuted,
//       })}
//     >
//       <Icon className={`w-5 h-5 ${color}`} />
//       {label}
//     </NavLink>
//   );

//   return (
//     <div
//       className="w-56 h-screen px-3 py-5 overflow-hidden flex-shrink-0"
//       style={{ backgroundColor: themes.sidebar, fontFamily: themes.fontPrimary }}
//     >
//       <h4 className="text-lg font-semibold mb-5 pl-2 text-white">Employee Panel</h4>

//       <ul className="space-y-1.5">

//         <LinkItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" color="text-blue-500" />

//         {/* OFFICE */}
//         <Dropdown label="Office" icon={Briefcase} color="text-purple-500" open={openOffice} setOpen={setOpenOffice}>
//           <LinkItem to="/department" icon={Building2} label="Department" color="text-purple-500" />
//           <LinkItem to="/role" icon={ShieldCheck} label="Roles" color="text-green-500" />
//           <LinkItem to="/officebranches" icon={Layers} label="Office Branches" color="text-orange-500" />
//         </Dropdown>

//         {/* EMPLOYEE */}
//         <Dropdown label="Employee" icon={Users} color="text-blue-500" open={openEmployee} setOpen={setOpenEmployee}>
//           <LinkItem to="/employee" icon={Users} label="Employee" color="text-blue-500" />
//           <LinkItem to="/employee-personal-details" icon={UserCircle2} label="Personal Details" color="text-indigo-500" />
//           <LinkItem to="/employee-salary" icon={Wallet} label="Employee Salary" color="text-emerald-500" />
//           <LinkItem to="/employee-documents" icon={FileText} label="Employee Documents" color="text-rose-500" />
//         </Dropdown>

//         {/* SALES */}
//         <Dropdown label="Sales" icon={TrendingUp} color="text-cyan-500" open={openSales} setOpen={setOpenSales}>
//           <LinkItem to="/leads" icon={UserPlus} label="Leads" color="text-cyan-500" />
//           <LinkItem to="/users" icon={Users} label="Users" color="text-cyan-500" />
//           <LinkItem to="/visits" icon={MapPin} label="Visits" color="text-emerald-500" />
//         </Dropdown>

//         {/* HR */}
//         <Dropdown label="HR" icon={UserCheck} color="text-purple-500" open={openHR} setOpen={setOpenHR}>
//           <LinkItem to="/holiday" icon={CalendarDays} label="Holiday" color="text-orange-500" />
//           <LinkItem to="/leave-balance" icon={ClipboardList} label="Leave Balance" color="text-purple-500" />
//           <LinkItem to="/leave-requests" icon={ClipboardList} label="Leave Request" color="text-purple-500" />

//         </Dropdown>

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
  CalendarCheck   // ⭐ better icon for Leave Balance
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  // 🔥 ONLY ONE OPEN STATE
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (location.pathname.startsWith("/employee")) setOpenMenu("employee");
    else if (["/department", "/role", "/officebranches"].some(p => location.pathname.startsWith(p))) setOpenMenu("office");
    else if (["/leads", "/users", "/visits"].some(p => location.pathname.startsWith(p))) setOpenMenu("sales");
    else if (["/holiday", "/leave-balance", "/leave-requests"].some(p => location.pathname.startsWith(p))) setOpenMenu("hr");
  }, [location.pathname]);

  const Dropdown = ({ id, label, icon: Icon, color, children }) => {
    const open = openMenu === id;

    return (
      <div>
        <button
          onClick={() => setOpenMenu(open ? null : id)}   // 🔥 close others
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
  };

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
    <div className="w-56 h-screen px-3 py-5 overflow-hidden flex-shrink-0"
      style={{ backgroundColor: themes.sidebar, fontFamily: themes.fontPrimary }}
    >
      <h4 className="text-lg font-semibold mb-5 pl-2 text-white">Employee Panel</h4>

      <ul className="space-y-1.5">

        <LinkItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" color="text-blue-500" />

        {/* OFFICE */}
        <Dropdown id="office" label="Office" icon={Briefcase} color="text-purple-500">
          <LinkItem to="/department" icon={Building2} label="Department" color="text-purple-500" />
          <LinkItem to="/role" icon={ShieldCheck} label="Roles" color="text-green-500" />
          <LinkItem to="/officebranches" icon={Layers} label="Office Branches" color="text-orange-500" />
        </Dropdown>

        {/* EMPLOYEE */}
        <Dropdown id="employee" label="Employee" icon={Users} color="text-blue-500">
          <LinkItem to="/employee" icon={Users} label="Employee" color="text-blue-500" />
          <LinkItem to="/employee-personal-details" icon={UserCircle2} label="Personal Details" color="text-indigo-500" />
          <LinkItem to="/employee-salary" icon={Wallet} label="Employee Salary" color="text-emerald-500" />
          <LinkItem to="/employee-documents" icon={FileText} label="Employee Documents" color="text-rose-500" />
        </Dropdown>

        {/* SALES */}
        <Dropdown id="sales" label="Sales" icon={TrendingUp} color="text-cyan-500">
          <LinkItem to="/leads" icon={UserPlus} label="Leads" color="text-cyan-500" />
          <LinkItem to="/users" icon={Users} label="Users" color="text-cyan-500" />
          <LinkItem to="/visits" icon={MapPin} label="Visits" color="text-emerald-500" />
        </Dropdown>

        {/* HR */}
        <Dropdown id="hr" label="HR" icon={UserCheck} color="text-purple-500">
          <LinkItem to="/holiday" icon={CalendarDays} label="Holiday" color="text-orange-500" />
          <LinkItem to="/leave-balance" icon={CalendarCheck} label="Leave Balance" color="text-purple-500" />
          <LinkItem to="/leave-requests" icon={ClipboardList} label="Leave Request" color="text-purple-500" />
        </Dropdown>

      </ul>
    </div>
  );
};

export default Sidebar;
