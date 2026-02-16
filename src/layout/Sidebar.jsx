

import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserFromToken } from "../utils/auth";

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
  CalendarCheck,   // ⭐ better icon for Leave Balance
  PhoneCall,
  Receipt
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const user = getUserFromToken();

  // 🔥 ONLY ONE OPEN STATE
  const [openMenu, setOpenMenu] = useState(null);
  const isEmployee = user?.is_employee;
  console.log("USER:", user);
  console.log("isEmployee:", user?.is_employee);

  useEffect(() => {
    if (location.pathname.startsWith("/employee")) setOpenMenu("employee");
    else if (["/department", "/role", "/officebranches"].some(p => location.pathname.startsWith(p))) setOpenMenu("office");
    else if (["/leads", "/visits"].some(p => location.pathname.startsWith(p))) setOpenMenu("sales");
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
<Icon className="w-5 h-5" style={{ color }} />
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
<Icon className="w-5 h-5" style={{ color }} />
      {label}
    </NavLink>
  );

  return (
    <div
      className="w-56 h-screen px-3 py-5 overflow-y-auto flex-shrink-0"
      style={{ backgroundColor: themes.sidebar, fontFamily: themes.fontPrimary }}
    >

      <h4 className="text-lg font-semibold mb-5 pl-2" style={{ color: themes.textWhite }}>Employee Panel</h4>

      <ul className="space-y-1.5">

        <LinkItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" color={themes.cardEmployee} />

      {/* <Dropdown id="office" label="Office" icon={Briefcase} color={themes.cardDepartment}>

        
          <LinkItem to="/department" icon={Building2} label="Department" style={{ color: themes.cardDepartment }}
          />
          <LinkItem to="/role" icon={ShieldCheck} label="Roles" style={{ color: themes.cardRole }} />
          <LinkItem to="/officebranches" icon={Layers} label="Office Branches" style={{ color: themes.cardHoliday }} />
        </Dropdown> */}
        <Dropdown id="office" label="Office" icon={Briefcase} color={themes.cardDepartment}>
  <LinkItem to="/department" icon={Building2} label="Department" color={themes.cardDepartment} />
  <LinkItem to="/role" icon={ShieldCheck} label="Roles" color={themes.cardRole} />
  <LinkItem to="/officebranches" icon={Layers} label="Office Branches" color={themes.cardHoliday} />
</Dropdown>


        {/* <Dropdown id="employee" label="Employee" icon={Users} color={themes.cardEmployee}>
          <LinkItem to="/employee" icon={Users} label="Employee" color={themes.cardEmployee} />
          <LinkItem to="/users" icon={Users} label="Users" style={{ color: themes.cardUsers }} />

          <LinkItem to="/employee-personal-details" icon={UserCircle2} label="Personal Details" style={{ color: themes.cardPersonalDetails }} />
          <LinkItem to="/employee-salary" icon={Wallet} label="Employee Salary" style={{ color: themes.cardSalary }} />
          <LinkItem to="/employee-documents" icon={FileText} label="Employee Documents" style={{ color: themes.cardDocuments }} />
        </Dropdown> */}
        <Dropdown id="employee" label="Employee" icon={Users} color={themes.cardEmployee}>
  <LinkItem to="/employee" icon={Users} label="Employee" color={themes.cardEmployee} />
  <LinkItem to="/users" icon={Users} label="Users" color={themes.cardUsers} />

  <LinkItem to="/employee-personal-details" icon={UserCircle2} label="Personal Details" color={themes.cardPersonalDetails} />
  <LinkItem to="/employee-salary" icon={Wallet} label="Employee Salary" color={themes.cardSalary} />
  <LinkItem to="/employee-documents" icon={FileText} label="Employee Documents" color={themes.cardDocuments} />
</Dropdown>


        {/* <Dropdown id="sales" label="Sales" icon={TrendingUp} style={{ color: themes.cardUsers }}>
          <LinkItem to="/leads" icon={UserPlus} label="Leads" style={{ color: themes.cardUsers }} />
          <LinkItem to="/visits" icon={MapPin} label="Visits" style={{ color: themes.cardSalary }} />
        </Dropdown> */}
        <Dropdown id="sales" label="Sales" icon={TrendingUp} color={themes.cardUsers}>
  <LinkItem to="/leads" icon={UserPlus} label="Leads" color={themes.cardUsers} />
  <LinkItem to="/visits" icon={MapPin} label="Visits" color={themes.cardSalary} />
</Dropdown>


        {/* <Dropdown id="hr" label="HR" icon={UserCheck} style={{ color: themes.cardDepartment }}>
          <LinkItem to="/holiday" icon={CalendarDays} label="Holiday" style={{ color: themes.cardHoliday }} />
          <LinkItem to="/leave-balance" icon={CalendarCheck} label="Leave Balance" style={{ color: themes.cardDepartment }} />
          <LinkItem to="/leave-requests" icon={ClipboardList} label="Leave Request" style={{ color: themes.cardDepartment }} />
          <LinkItem to="/expense" icon={Receipt} label="Expense" style={{ color: themes.cardSalary }} />

        </Dropdown> */}
        <Dropdown id="hr" label="HR" icon={UserCheck} color={themes.cardDepartment}>
  <LinkItem to="/holiday" icon={CalendarDays} label="Holiday" color={themes.cardHoliday} />
  <LinkItem to="/leave-balance" icon={CalendarCheck} label="Leave Balance" color={themes.cardDepartment} />
  <LinkItem to="/leave-requests" icon={ClipboardList} label="Leave Request" color={themes.cardDepartment} />
  <LinkItem to="/expense" icon={Receipt} label="Expense" color={themes.cardSalary} />
</Dropdown>


        {/* <LinkItem to="/lead-followups" icon={PhoneCall} label="lead-followups" style={{ color: themes.cardUsers }}
 /> */}
 <LinkItem to="/lead-followups" icon={PhoneCall} label="lead-followups" color={themes.cardUsers} />


      </ul>
    </div>
  );
};

export default Sidebar;
