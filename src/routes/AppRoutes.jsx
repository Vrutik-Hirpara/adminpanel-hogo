// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "../layout/Layout";
// import Dashboard from "../modules/Dashboard";
// import Department from "../modules/Department";
// import CarsList from "../modules/CarsList";
// import Roles from "../modules/Roles";
// import OfficeBranches from "../modules/OfficeBranches";
// import Login from "../pages/Login";
// import ProtectedRoute from "./ProtectedRoute";

// export default function AppRoutes() {
//   return (
//     <Routes>

//            {/* 🔐 AUTH ROUTES */}
//       <Route path="/login" element={<Login />} />


//       {/* Redirect */}
//       <Route path="/" element={<Navigate to="/login" />} />

//       {/* Layout wrapper */}
//       <Route element={<Layout />}>
// <Route
//   path="/dashboard"
//   element={
//     <ProtectedRoute>
//       <Dashboard />
//     </ProtectedRoute>
//   }
// />

//         <Route path="/department" element={<Department />} />
//         <Route path="/department/new" element={<Department />} />
//         <Route path="/department/edit/:id" element={<Department />} />
//         <Route path="/list" element={<CarsList />} />
//         <Route path="/role" element={<Roles />} />
//         <Route path="/officebranches" element={<OfficeBranches />} />





//       </Route>
//     </Routes>
//   );
// }







import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Dashboard from "../modules/Dashboard";
import Department from "../modules/Department";
// import CarsList from "../modules/CarsList";
import Roles from "../modules/Roles";
import OfficeBranches from "../modules/OfficeBranches";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
// import Blogs from "../modules/Blogs";
import Employee from "../modules/Employee";
import EmployeePersonalDetails from "../modules/EmployeePersonalDetails";
import EmployeeSalary from "../modules/EmployeeSalary";
import EmployeeDocuments from "../modules/EmployeeDocuments";
import Users from "../modules/Users";
import Leads from "../modules/Leads";
import Visit from "../modules/Visit";
import Holiday from "../modules/Holiday";
import LeaveBalance from "../modules/LeaveBalance";
import LeaveRequests from "../modules/LeaveRequests";
import Expenses from "../modules/Expenses";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🔓 PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 🔒 PROTECTED LAYOUT WRAPPER */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/department" element={<Department />} />
        <Route path="/department/new" element={<Department />} />
        <Route path="/department/edit/:id" element={<Department />} />

        {/* <Route path="/list" element={<CarsList />} /> */}

        <Route path="/role" element={<Roles />} />

        <Route path="/officebranches" element={<OfficeBranches />} />
        {/* <Route path="/blog" element={<Blogs />} /> */}

        <Route path="/employee" element={<Employee />} />
        <Route path="/employee-personal-details" element={<EmployeePersonalDetails />} />
        <Route path="/employee-salary" element={<EmployeeSalary />} />
        
        <Route path="/employee-documents" element={<EmployeeDocuments />} />
        <Route path="/users" element={<Users />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/visits" element={<Visit />} />
        <Route path="/holiday" element={<Holiday />} />
        <Route path="/leave-balance" element={<LeaveBalance />} />
        <Route path="/leave-requests" element={<LeaveRequests />} />
        <Route path="/expense" element={<Expenses />} />

      </Route>

      {/* 🚫 Any unknown route */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}
