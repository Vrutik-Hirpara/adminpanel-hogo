

// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import EntityTableRow from "../components/table/EntityTableRow";
// import SearchBar from "../components/table/SearchBar";
// import { themes } from "../config/theme.config";

// import { formatDate } from "../utils/dateFormatter";

// import { EmployeeAPI, BranchAPI, DepartmentAPI, RolesAPI } from "../services";
// import api from "../services/api";

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// // import EmployeeViewCard from "../components/view/EmployeeViewCard";
// import EntityViewCard from "../components/view/EntityViewCard";

// import axios from "axios";
// import { useUser } from "../hooks/useUser";



// export default function Employee() {

//   const { employeeId, isHR } = useUser();

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [search, setSearch] = useState("");
//   const [branches, setBranches] = useState([]);


//   // FETCH EMPLOYEES
//  const fetchEmployees = async () => {
//   try {
//     let res;

//     if (isHR) {
//       res = await EmployeeAPI.getAll();   // HR → all
//       const data = res.data?.data || [];

//       const formatted = data.map(e => ({
//         id: e.id,
//         employee_code: e.employee_code,
//         first_name: e.first_name,
//         last_name: e.last_name,
//         date_of_birth: e.date_of_birth,
//         email: e.email,
//         phone: e.phone,
//         role_name: e.role_name || e.role?.name || "-",
//         office_branch_name: e.office_branch_name || e.branch?.name || "-",
//         joining_date: e.joining_date,
//         employment_type: e.employment_type,
//         status: e.status === "Active",
//         raw: e,
//       }));

//       setEmployees(formatted);
//     } else {
//       // 🔒 Only logged user
//       res = await api.get(`/employee/${employeeId}/`);
//       const e = res.data;

//       const formatted = [{
//         id: e.id,
//         employee_code: e.employee_code,
//         first_name: e.first_name,
//         last_name: e.last_name,
//         date_of_birth: e.date_of_birth,
//         email: e.email,
//         phone: e.phone,
//         role_name: e.role_name || "-",
//         office_branch_name: e.office_branch_name || "-",
//         joining_date: e.joining_date,
//         employment_type: e.employment_type,
//         status: e.status === "Active",
//         raw: e,
//       }];

//       setEmployees(formatted);
//     }
//   } catch (err) {
//     console.log("EMPLOYEE FETCH ERROR:", err);
//   }
// };

//   // FETCH DEPARTMENTS & ROLES
//   // const fetchMeta = async () => {
//   //   const deptRes = await axios.get(DEPT_API);
//   //   const roleRes = await axios.get(ROLE_API);
//   //   const branchRes = await BranchAPI.getAll();  // ⭐ CORRECT API NAME


//   //   setDepartments(deptRes.data.data || []);
//   //   setRoles(roleRes.data.data || []);
//   //   setBranches(branchRes.data.data || []);

//   // };
//   const fetchMeta = async () => {
//     const deptRes = await DepartmentAPI.getAll();
//     const roleRes = await RolesAPI.getAll();
//     const branchRes = await BranchAPI.getAll();

//     setDepartments(deptRes.data?.data || []);
//     setRoles(roleRes.data?.data || []);
//     setBranches(branchRes.data?.data || []);
//   };

//   useEffect(() => {
//     fetchEmployees();
//     fetchMeta();
//   }, [isHR, employeeId]);
//   const filteredEmployees = employees.filter(emp =>
//     `${emp.employee_code} ${emp.first_name} ${emp.last_name} ${emp.email} ${emp.phone} ${emp.role_name}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );
//   // STATUS TOGGLE
//   const handleStatusToggle = async (emp) => {
//     const newStatus = !emp.status;

//     setEmployees(prev =>
//       prev.map(e =>
//         e.id === emp.id
//           ? { ...e, status: newStatus, raw: { ...e.raw, status: newStatus ? "Active" : "Inactive" } }
//           : e
//       )
//     );

//     try {
//       await EmployeeAPI.update(emp.id, { status: newStatus ? "Active" : "Inactive" });
//     } catch {
//       fetchEmployees();
//     }
//   };

//   // CREATE / UPDATE
//   const onSubmit = async (data, methods) => {
//     try {
//       const payload = {
//         ...data,
//         department_id: Number(data.department_id),
//         role_id: Number(data.role_id),
//         office_branch_id: data.office_branch_id
//           ? Number(data.office_branch_id)
//           : null,
//         status: data.status,
//       };

//       if (selectedEmployee) {
//         delete payload.password;
//         await EmployeeAPI.update(selectedEmployee.id, payload);
//       } else {
//         await EmployeeAPI.create(payload);
//       }

//       setMode("list");
//       fetchEmployees();
//     }catch (error) {
//   console.log("SERVER ERROR:", error.response?.data);

//   const serverData = error.response?.data;

//   if (serverData?.email) {
//     methods.setError("email", {
//       type: "manual",
//       message: serverData.email[0] || "This email id already exists",
//     });
//   } else if (serverData?.detail) {
//     methods.setError("email", {
//       type: "manual",
//       message: serverData.detail,
//     });
//   } else {
//     methods.setError("email", {
//       type: "manual",
//       message: "This email id already exists",
//     });
//   }
// }


//   }
//   const employeeColumns = [
//     { key: "employee_code" },
//     { key: "office_branch_name" },   // ⭐ HERE

//     {
//       key: "name",
//       render: (row) => `${row.first_name} ${row.last_name}`,
//     },

//     {
//       key: "date_of_birth",
//       render: (row) => formatDate(row.date_of_birth),
//     },

//     { key: "phone" },
//     { key: "role_name" },
//     {
//       key: "status",
//       render: (row) => (
//         <button
//           onClick={() => handleStatusToggle(row)}
// className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500"
// style={{
//   backgroundColor: row.status ? themes.toggleOn : themes.toggleOff,
// }}

//         >
//           <span
//             className={`inline-block h-4 w-4 transform rounded-full shadow-md transition-all duration-500 ${row.status ? "translate-x-6" : "translate-x-1" }`}   style={{ backgroundColor: themes.textWhite }}

//           />
//         </button>
//       ),
//     },
//   ];
//   const employeeFields = [
//     { key: "employee_code", label: "Employee Code" },
//     { key: "first_name", label: "First Name" },
//     { key: "last_name", label: "Last Name" },
//     { key: "gender", label: "Gender" },
//     { key: "date_of_birth", label: "Date of Birth" },
//     { key: "email", label: "Email" },
//     { key: "phone", label: "Phone" },
//     { key: "office_branch_name", label: "Office Branch " },
//     { key: "department_name", label: "Department Name" },
//     { key: "role_name", label: "Role Name" },
//     { key: "joining_date", label: "Joining Date" },
//     { key: "employment_type", label: "Employee Type" },

//     { key: "status", label: "Status" }
//   ];


//   // LIST
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//           <SectionTitle title="Employees" />

//           <div className="flex items-center gap-3">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
// className="px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2"
// style={{
//   border: `1px solid ${themes.borderLight}`,
//   color: themes.textPrimary,
//   backgroundColor: themes.surfaceLight,
//   boxShadow: `0 0 0 2px ${themes.cardEmployee}`, // blue focus ring
// }}
//             />

//             <ActionButtons
//               showAdd
//               addText="+ Add"
//               onAdd={() => setMode("form")}
//             />
//           </div>
//         </div>

//         {/* <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Employees" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">

//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div> */}

//         <Table header={<TableHeader columns={["Code", "Branch", "Name", "DOB", "Phone", "Role", "Status", "Action"]} />}>
//           {filteredEmployees.map((emp, index) => (
//             <EntityTableRow
//               key={emp.id}
//               row={emp}
//               index={index}
//               columns={employeeColumns}
//               onView={(r) => { setSelectedEmployee(r.raw); setMode("view"); }}
//               onEdit={(r) => {
//                 const dept = departments.find(d => d.name === r.raw.department_name);
//                 const role = roles.find(r2 => r2.name === r.raw.role_name);

//                 setSelectedEmployee({
//                   ...r.raw,
//                   department_id: dept?.id,
//                   role_id: role?.id,
//                   office_branch_id: r.raw.office_branch_id || "", // ⭐ ADD

//                 });

//                 setMode("form");
//               }}
//               onDelete={(id) => EmployeeAPI.delete(id).then(fetchEmployees)}
//             />
//           ))}

//         </Table>
//       </PageContainer>
//     );
//   }

//   // // VIEW
//   // if (mode === "view" && selectedEmployee) {
//   //   return (
//   //     <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
//   //       <EntityViewCard employee={selectedEmployee} />
//   //     </EntityPageLayout>
//   //   );
//   // }
//   if (mode === "view" && selectedEmployee) {
//     return (
//       <EntityPageLayout
//         title="Employee Details"
//         showBack
//         onBack={() => setMode("list")}
//       >
//         <EntityViewCard
//           title="Employee"
//           data={selectedEmployee}        // ✅ correct prop
//           fields={employeeFields}       // ✅ required
//           api={EmployeeAPI}             // ✅ for edit/delete
//           onUpdated={fetchEmployees}
//           onDeleted={fetchEmployees}
//           headerKeys={["employee_code", "first_name", "last_name"]}   // ⭐ ADD THIS

//         />
//       </EntityPageLayout>
//     );
//   }

//   // FORM
//   return (
//     <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedEmployee ? "Edit Employee" : "Create Employee"}
//         selectedItem={
//           selectedEmployee
//             ? {
//               ...selectedEmployee,
//               status:
//                 selectedEmployee.status === true ||
//                   selectedEmployee.status === "Active"
//                   ? "Active"
//                   : "Inactive",
//             }
//             : null
//         }

//         onSubmit={onSubmit}
//         setMode={setMode}
//         //         fields={[
//         //   { label: "Employee Code", name: "employee_code", required: true },
//         //   { label: "First Name", name: "first_name", required: true },
//         //   { label: "Last Name", name: "last_name", required: true },

//         //   {
//         //     label: "Gender",
//         //     name: "gender",
//         //     type: "select",
//         //     required: true,
//         //     options: [
//         //       { label: "Male", value: "Male" },
//         //       { label: "Female", value: "Female" }
//         //     ]
//         //   },

//         //   {
//         //     label: "Office Branch",
//         //     name: "office_branch_id",
//         //     type: "select",
//         //     options: branches.map(b => ({
//         //       label: b.name,
//         //       value: b.id,
//         //     })),
//         //   },

//         //   { label: "Date of Birth", name: "date_of_birth", type: "date", required: true },
//         //   { label: "Email", name: "email", type: "email", required: true },
//         //   { label: "Phone", name: "phone", required: true },
//         //   { label: "Joining Date", name: "joining_date", type: "date", required: true },

//         //   {
//         //     label: "Department",
//         //     name: "department_id",
//         //     type: "select",
//         //     required: true,
//         //     options: departments.map(d => ({ label: d.name, value: d.id }))
//         //   },

//         //   {
//         //     label: "Role",
//         //     name: "role_id",
//         //     type: "select",
//         //     required: true,
//         //     options: roles.map(r => ({ label: r.name, value: r.id }))
//         //   },

//         //   {
//         //     label: "Employment Type",
//         //     name: "employment_type",
//         //     type: "select",
//         //     required: true,
//         //     options: [
//         //       { label: "Permanent", value: "Permanent" },
//         //       { label: "Contract", value: "Contract" },
//         //       { label: "Intern", value: "Intern" }
//         //     ]
//         //   },

//         //   {
//         //     label: "Status",
//         //     name: "status",
//         //     type: "select",
//         //     required: true,
//         //     options: [
//         //       { label: "Active", value: "Active" },
//         //       { label: "Inactive", value: "Inactive" }
//         //     ]
//         //   },

//         //   ...(selectedEmployee ? [] : [
//         //     { label: "Password", name: "password", type: "password", required: true }
//         //   ]),
//         // ]}

//         fields={[
//           { label: "Employee Code", name: "employee_code", required: true },

//           { label: "First Name", name: "first_name", required: true },

//           { label: "Last Name", name: "last_name", required: true },

//           {
//             label: "Gender",
//             name: "gender",
//             type: "select",
//             required: true,
//             options: [
//               { label: "Male", value: "Male" },
//               { label: "Female", value: "Female" }
//             ]
//           },

//           {
//             label: "Office Branch",
//             name: "office_branch_id",
//             type: "select",
//             options: branches.map(b => ({
//               label: b.name,
//               value: b.id,
//             })),
//           },

//           {
//             label: "Date of Birth",
//             name: "date_of_birth",
//             type: "date",
//             required: true
//           },

//           { label: "Email", name: "email", type: "email", required: true },

//           { label: "Phone", name: "phone", required: true },

//           {
//             label: "Joining Date",
//             name: "joining_date",
//             type: "date",
//             required: true
//           },

//           {
//             label: "Department",
//             name: "department_id",
//             type: "select",
//             required: true,
//             options: departments.map(d => ({ label: d.name, value: d.id }))
//           },

//           {
//             label: "Role",
//             name: "role_id",
//             type: "select",
//             required: true,
//             options: roles.map(r => ({ label: r.name, value: r.id }))
//           },

//           {
//             label: "Employment Type",
//             name: "employment_type",
//             type: "select",
//             required: true,
//             options: [
//               { label: "Permanent", value: "Permanent" },
//               { label: "Contract", value: "Contract" },
//               { label: "Intern", value: "Intern" }
//             ]
//           },

//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//             required: true,
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Inactive", value: "Inactive" }
//             ]
//           },

//           ...(selectedEmployee
//             ? []
//             : [{ label: "Password", name: "password", type: "password", required: true }]),
//         ]}


//       />
//     </EntityPageLayout>
//   );
// }





//aama perticular user no data aave chhe pan edit nathi thatu

// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import EntityTableRow from "../components/table/EntityTableRow";
// import { themes } from "../config/theme.config";
// import { formatDate } from "../utils/dateFormatter";

// import { EmployeeAPI, BranchAPI, DepartmentAPI, RolesAPI } from "../services";
// import api from "../services/api";

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import EntityViewCard from "../components/view/EntityViewCard";

// import { useUser } from "../hooks/useUser";

// export default function Employee() {
//   const { employeeId, isHR } = useUser();

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [search, setSearch] = useState("");
//   const [branches, setBranches] = useState([]);

//   // 🔥 FETCH EMPLOYEES (ROLE BASED)
//   const fetchEmployees = async () => {
//     try {
//       let formatted = [];

//       if (isHR) {
//         const res = await EmployeeAPI.getAll();
//         const data = res.data?.data || res.data || [];

//         formatted = data.map(e => ({
//           id: e.id,
//           employee_code: e.employee_code,
//           first_name: e.first_name,
//           last_name: e.last_name,
//           date_of_birth: e.date_of_birth,
//           email: e.email,
//           phone: e.phone,
//           role_name: e.role_name || e.role?.name || "-",
//           office_branch_name: e.office_branch_name || e.branch?.name || "-",
//           joining_date: e.joining_date,
//           employment_type: e.employment_type,
//           status: e.status === "Active",
//           raw: e,
//         }));
//       } else {
//         const res = await api.get(`/employee/${employeeId}/`);

//         // 🔥 FIX: handle both API formats
//         const e = res.data?.data || res.data;

//         formatted = [{
//           id: e.id,
//           employee_code: e.employee_code,
//           first_name: e.first_name,
//           last_name: e.last_name,
//           date_of_birth: e.date_of_birth,
//           email: e.email,
//           phone: e.phone,
//           role_name: e.role_name || e.role?.name || "-",
//           office_branch_name: e.office_branch_name || e.office_branch?.name || "-",
//           joining_date: e.joining_date,
//           employment_type: e.employment_type,
//           status: e.status === "Active",
//           raw: e,
//         }];
//       }

//       console.log("FINAL EMPLOYEE DATA:", formatted); // debug

//       setEmployees(formatted);
//     } catch (err) {
//       console.log("EMPLOYEE FETCH ERROR:", err);
//     }
//   };

//   // 🔥 FETCH META
//   const fetchMeta = async () => {
//     const deptRes = await DepartmentAPI.getAll();
//     const roleRes = await RolesAPI.getAll();
//     const branchRes = await BranchAPI.getAll();

//     setDepartments(deptRes.data?.data || []);
//     setRoles(roleRes.data?.data || []);
//     setBranches(branchRes.data?.data || []);
//   };

//   useEffect(() => {
//     fetchEmployees();
//     fetchMeta();
//   }, [isHR, employeeId]);

//   // 🔍 SEARCH
//   const filteredEmployees = employees.filter(emp =>
//     `${emp.employee_code} ${emp.first_name} ${emp.last_name} ${emp.email} ${emp.phone} ${emp.role_name}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // 🔁 STATUS TOGGLE
//   const handleStatusToggle = async (emp) => {
//     const newStatus = !emp.status;

//     setEmployees(prev =>
//       prev.map(e =>
//         e.id === emp.id
//           ? { ...e, status: newStatus, raw: { ...e.raw, status: newStatus ? "Active" : "Inactive" } }
//           : e
//       )
//     );

//     try {
//       await EmployeeAPI.update(emp.id, { status: newStatus ? "Active" : "Inactive" });
//     } catch {
//       fetchEmployees();
//     }
//   };

//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//           <SectionTitle title="Employees" />

//           <div className="flex items-center gap-3">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-3 py-2 rounded-lg w-64"
//               style={{ border: `1px solid ${themes.borderLight}` }}
//             />

//             <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//           </div>
//         </div>

//         <Table header={<TableHeader columns={["Code", "Branch", "Name", "DOB", "Phone", "Role", "Status", "Action"]} />}>

//           {filteredEmployees.map((emp, index) => (
//             <EntityTableRow
//               key={emp.id}
//               row={emp}
//               index={index}
//               columns={[
//                 { key: "employee_code" },
//                 { key: "office_branch_name" },
//                 { key: "name", render: (row) => `${row.first_name} ${row.last_name}` },
//                 { key: "date_of_birth", render: (row) => formatDate(row.date_of_birth) },
//                 { key: "phone" },
//                 { key: "role_name" },
//                 {
//                   key: "status",
//                   render: (row) => (
//                     <button onClick={() => handleStatusToggle(row)}>
//                       {row.status ? "Active" : "Inactive"}
//                     </button>
//                   ),
//                 },
//               ]}
//               onView={(r) => { setSelectedEmployee(r.raw); setMode("view"); }}
//               onEdit={(r) => { setSelectedEmployee(r.raw); setMode("form"); }}
//               onDelete={(id) => EmployeeAPI.delete(id).then(fetchEmployees)}
//             />
//           ))}

//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
//   if (mode === "view" && selectedEmployee) {
//     return (
//       <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
//         <EntityViewCard
//           title="Employee"
//           data={selectedEmployee}
//           fields={[
//             { key: "employee_code", label: "Code" },
//             { key: "first_name", label: "First Name" },
//             { key: "last_name", label: "Last Name" },
//             { key: "email", label: "Email" },
//             { key: "phone", label: "Phone" },
//             { key: "role_name", label: "Role" }
//           ]}
//           api={EmployeeAPI}
//           onUpdated={fetchEmployees}
//           onDeleted={fetchEmployees}
//         />
//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM =================
//   return (
//     <EntityPageLayout title="Employee Form" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedEmployee ? "Edit Employee" : "Create Employee"}
//         selectedItem={selectedEmployee}
//         onSubmit={async (data) => {
//           if (selectedEmployee) {
//             await EmployeeAPI.update(selectedEmployee.id, data);
//           } else {
//             await EmployeeAPI.create(data);
//           }
//           setMode("list");
//           fetchEmployees();
//         }}
//         setMode={setMode}
//       />
//     </EntityPageLayout>
//   );
// }

//perfect just change password aamanathi

// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import EntityTableRow from "../components/table/EntityTableRow";
// import SearchBar from "../components/table/SearchBar";
// import { themes } from "../config/theme.config";

// import { formatDate } from "../utils/dateFormatter";

// import { EmployeeAPI, BranchAPI, DepartmentAPI, RolesAPI } from "../services";
// import api from "../services/api";

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// // import EmployeeViewCard from "../components/view/EmployeeViewCard";
// import EntityViewCard from "../components/view/EntityViewCard";

// import axios from "axios";
// import { useUser } from "../hooks/useUser";



// export default function Employee() {

//   const { employeeId, isHR } = useUser();

//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [search, setSearch] = useState("");
//   const [branches, setBranches] = useState([]);


//   // FETCH EMPLOYEES
//   const fetchEmployees = async () => {
//     try {
//       let res;

//       if (isHR) {
//         res = await EmployeeAPI.getAll();   // HR → all
//         const data = res.data?.data || [];

//         const formatted = data.map(e => ({
//           id: e.id,
//           employee_code: e.employee_code,
//           first_name: e.first_name,
//           last_name: e.last_name,
//           date_of_birth: e.date_of_birth,
//           email: e.email,
//           phone: e.phone,
//           role_name: e.role_name || e.role?.name || "-",
//           office_branch_name: e.office_branch_name || e.branch?.name || "-",
//           joining_date: e.joining_date,
//           employment_type: e.employment_type,
//           status: e.status === "Active",
//           raw: e,
//         }));

//         setEmployees(formatted);
//       } else {
//         // 🔒 Only logged user
//         res = await api.get(`/employee/${employeeId}/`);
//         const e = res.data.data;

//         // Log the response to debug if needed
//         console.log("Single employee response:", e);

//         // Get branch name from the response - handle different possible structures
//         const branchName = e.office_branch?.name ||
//           e.branch?.name ||
//           e.office_branch_name ||
//           e.branch_name || "-";

//         const formatted = [{
//           id: e.id,
//           employee_code: e.employee_code,
//           first_name: e.first_name,
//           last_name: e.last_name,
//           date_of_birth: e.date_of_birth,
//           email: e.email,
//           phone: e.phone,
//           role_name: e.role_name || e.role?.name || "-",
//           office_branch_name: branchName,
//           joining_date: e.joining_date,
//           employment_type: e.employment_type,
//           status: e.status === "Active",
//           raw: e,
//         }];

//         setEmployees(formatted);
//       }
//     } catch (err) {
//       console.log("EMPLOYEE FETCH ERROR:", err);
//     }
//   };

//   // FETCH DEPARTMENTS & ROLES
//   const fetchMeta = async () => {
//     const deptRes = await DepartmentAPI.getAll();
//     const roleRes = await RolesAPI.getAll();
//     const branchRes = await BranchAPI.getAll();

//     setDepartments(deptRes.data?.data || []);
//     setRoles(roleRes.data?.data || []);
//     setBranches(branchRes.data?.data || []);
//   };

//   useEffect(() => {
//     fetchEmployees();
//     fetchMeta();
//   }, [isHR, employeeId]);

//   const filteredEmployees = employees.filter(emp =>
//     `${emp.employee_code} ${emp.first_name} ${emp.last_name} ${emp.email} ${emp.phone} ${emp.role_name}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // STATUS TOGGLE
//   const handleStatusToggle = async (emp) => {
//     const newStatus = !emp.status;

//     setEmployees(prev =>
//       prev.map(e =>
//         e.id === emp.id
//           ? { ...e, status: newStatus, raw: { ...e.raw, status: newStatus ? "Active" : "Inactive" } }
//           : e
//       )
//     );

//     try {
//       await EmployeeAPI.update(emp.id, { status: newStatus ? "Active" : "Inactive" });
//     } catch {
//       fetchEmployees();
//     }
//   };

//   // CREATE / UPDATE
//   const onSubmit = async (data, methods) => {
//     try {
//       const payload = {
//         ...data,
//         department_id: Number(data.department_id),
//         role_id: Number(data.role_id),
//         office_branch_id: data.office_branch_id
//           ? Number(data.office_branch_id)
//           : null,
//         status: data.status,
//       };

//       if (selectedEmployee) {
//         delete payload.password;
//         await EmployeeAPI.update(selectedEmployee.id, payload);
//       } else {
//         await EmployeeAPI.create(payload);
//       }

//       setMode("list");
//       fetchEmployees();
//     } catch (error) {
//       console.log("SERVER ERROR:", error.response?.data);

//       const serverData = error.response?.data;

//       if (serverData?.email) {
//         methods.setError("email", {
//           type: "manual",
//           message: serverData.email[0] || "This email id already exists",
//         });
//       } else if (serverData?.detail) {
//         methods.setError("email", {
//           type: "manual",
//           message: serverData.detail,
//         });
//       } else {
//         methods.setError("email", {
//           type: "manual",
//           message: "This email id already exists",
//         });
//       }
//     }


//   }
//   const employeeColumns = [
//     { key: "employee_code" },
//     { key: "office_branch_name" },   // ⭐ HERE

//     {
//       key: "name",
//       render: (row) => `${row.first_name} ${row.last_name}`,
//     },

//     {
//       key: "date_of_birth",
//       render: (row) => formatDate(row.date_of_birth),
//     },

//     { key: "phone" },
//     { key: "role_name" },
//     {
//       key: "status",
//       render: (row) => (
//         <button
//           onClick={() => handleStatusToggle(row)}
//           className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500"
//           style={{
//             backgroundColor: row.status ? themes.toggleOn : themes.toggleOff,
//           }}

//         >
//           <span
//             className={`inline-block h-4 w-4 transform rounded-full shadow-md transition-all duration-500 ${row.status ? "translate-x-6" : "translate-x-1"}`} style={{ backgroundColor: themes.textWhite }}

//           />
//         </button>
//       ),
//     },
//   ];
//   const employeeFields = [
//     { key: "employee_code", label: "Employee Code" },
//     { key: "first_name", label: "First Name" },
//     { key: "last_name", label: "Last Name" },
//     { key: "gender", label: "Gender" },
//     { key: "date_of_birth", label: "Date of Birth" },
//     { key: "email", label: "Email" },
//     { key: "phone", label: "Phone" },
//     { key: "office_branch_name", label: "Office Branch " },
//     { key: "department_name", label: "Department Name" },
//     { key: "role_name", label: "Role Name" },
//     { key: "joining_date", label: "Joining Date" },
//     { key: "employment_type", label: "Employee Type" },

//     { key: "status", label: "Status" }
//   ];


//   // LIST
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//           <SectionTitle title="Employees" />

//           <div className="flex items-center gap-3">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2"
//               style={{
//                 border: `1px solid ${themes.borderLight}`,
//                 color: themes.textPrimary,
//                 backgroundColor: themes.surfaceLight,
//                 boxShadow: `0 0 0 2px ${themes.cardEmployee}`, // blue focus ring
//               }}
//             />

//             {/* <ActionButtons
//               showAdd
//               addText="+ Add"
//               onAdd={() => {
//                 setSelectedEmployee(null);   // ⭐ IMPORTANT RESET
//                 setMode("form");
//               }}
//             /> */}

//             {isHR && (
//               <ActionButtons
//                 showAdd
//                 addText="+ Add"
//                 onAdd={() => {
//                   setSelectedEmployee(null);   // ⭐ IMPORTANT RESET
//                   setMode("form");
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         <Table header={<TableHeader columns={["Code", "Branch", "Name", "DOB", "Phone", "Role", "Status", "Action"]} />}>
//           {filteredEmployees.map((emp, index) => (
//             <EntityTableRow
//               key={emp.id}
//               row={emp}
//               index={index}
//               columns={employeeColumns}
//               onView={(r) => { setSelectedEmployee(r.raw); setMode("view"); }}
//               onEdit={(r) => {
//                 const dept = departments.find(d => d.name === r.raw.department_name);
//                 const role = roles.find(r2 => r2.name === r.raw.role_name);

//                 setSelectedEmployee({
//                   ...r.raw,
//                   department_id: dept?.id,
//                   role_id: role?.id,
//                   office_branch_id: r.raw.office_branch_id || "", // ⭐ ADD
//                 });

//                 setMode("form");
//               }}
//               onDelete={(id) => EmployeeAPI.delete(id).then(fetchEmployees)}
//             />
//           ))}

//         </Table>
//       </PageContainer>
//     );
//   }

//   // VIEW
//   if (mode === "view" && selectedEmployee) {
//     return (
//       <EntityPageLayout
//         title="Employee Details"
//         showBack
//         onBack={() => setMode("list")}
//       >
//         <EntityViewCard
//           title="Employee"
//           data={selectedEmployee}        // ✅ correct prop
//           fields={employeeFields}       // ✅ required
//           api={EmployeeAPI}             // ✅ for edit/delete
//           onUpdated={fetchEmployees}
//           onDeleted={fetchEmployees}
//           headerKeys={["employee_code", "first_name", "last_name"]}   // ⭐ ADD THIS
//         />
//       </EntityPageLayout>
//     );
//   }

//   // FORM
//   return (
//     <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedEmployee ? "Edit Employee" : "Create Employee"}
//         selectedItem={
//           selectedEmployee
//             ? {
//               ...selectedEmployee,
//               status:
//                 selectedEmployee.status === true ||
//                   selectedEmployee.status === "Active"
//                   ? "Active"
//                   : "Inactive",
//             }
//             : null
//         }

//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           { label: "Employee Code", name: "employee_code", required: true },

//           { label: "First Name", name: "first_name", required: true },

//           { label: "Last Name", name: "last_name", required: true },

//           {
//             label: "Gender",
//             name: "gender",
//             type: "select",
//             required: true,
//             options: [
//               { label: "Male", value: "Male" },
//               { label: "Female", value: "Female" }
//             ]
//           },

//           {
//             label: "Office Branch",
//             name: "office_branch_id",
//             type: "select",
//             options: branches.map(b => ({
//               label: b.name,
//               value: b.id,
//             })),
//           },

//           {
//             label: "Date of Birth",
//             name: "date_of_birth",
//             type: "date",
//             required: true
//           },

//           { label: "Email", name: "email", type: "email", required: true },

//           { label: "Phone", name: "phone", required: true },

//           {
//             label: "Joining Date",
//             name: "joining_date",
//             type: "date",
//             required: true
//           },

//           {
//             label: "Department",
//             name: "department_id",
//             type: "select",
//             required: true,
//             options: departments.map(d => ({ label: d.name, value: d.id }))
//           },

//           {
//             label: "Role",
//             name: "role_id",
//             type: "select",
//             required: true,
//             options: roles.map(r => ({ label: r.name, value: r.id }))
//           },

//           {
//             label: "Employment Type",
//             name: "employment_type",
//             type: "select",
//             required: true,
//             options: [
//               { label: "Permanent", value: "Permanent" },
//               { label: "Contract", value: "Contract" },
//               { label: "Intern", value: "Intern" }
//             ]
//           },

//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//             required: true,
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Inactive", value: "Inactive" }
//             ]
//           },

//           ...(selectedEmployee
//             ? []
//             : [{ label: "Password", name: "password", type: "password", required: true }]),
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }




import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import EntityTableRow from "../components/table/EntityTableRow";
import SearchBar from "../components/table/SearchBar";
import { themes } from "../config/theme.config";

import { formatDate } from "../utils/dateFormatter";

import { EmployeeAPI, BranchAPI, DepartmentAPI, RolesAPI } from "../services";
import api from "../services/api";

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
// import EmployeeViewCard from "../components/view/EmployeeViewCard";
import EntityViewCard from "../components/view/EntityViewCard";

import axios from "axios";
import { useUser } from "../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors, parseBackendResponse } from "../utils/parseBackendErrors";

import EmployeeDocuments from "./EmployeeDocuments";
import EmployeePersonalDetails from "./EmployeePersonalDetails";
import EmployeeSalary from "./EmployeeSalary";
import Users from "./Users";
import LeaveBalance from "./LeaveBalance";
import LeaveRequests from "./LeaveRequests";
import EmployeeAttendance from "./EmployeeAttendance";
import SalaryPayout from "./SalaryPayout";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Pagination from "../components/common/Pagination";


export default function Employee() {
  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();


  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
  });

  const [tabActions, setTabActions] = useState(null);


  const fetchEmployees = async () => {
    setLoading(true); // 🔥 START
    try {
      let res;
      if (isHR) {
        res = await EmployeeAPI.getAll({ page: pagination.currentPage });   // HR → all
        const parsed = parseBackendResponse(res);  // ✅ ADD THIS
        const data = parsed.success ? (parsed.data || []) : [];  // ✅ CHANGE
        
        // Handle pagination data if available
        if (res.data && res.data.total_pages) {
          setPagination(prev => ({
            ...prev,
            totalPages: res.data.total_pages,
            totalCount: res.data.count || data.length
          }));
        }

        const formatted = data.map(e => ({


          id: e.id,
          employee_code: e.employee_code,
          first_name: e.first_name,
          last_name: e.last_name,
          date_of_birth: e.date_of_birth,
          email: e.email,
          phone: e.phone,
          role_name: e.role_name || e.role?.name || "-",
          office_branch_name: e.office_branch_name || e.branch?.name || "-",
          joining_date: e.joining_date,
          employment_type: e.employment_type,
          status: e.status === "Active",
          raw: e,
        }));
        setEmployees(formatted);
      } else {
        // 🔒 Only logged user
        res = await EmployeeAPI.getById(employeeId);
        const parsed = parseBackendResponse(res);  // ✅ ADD THIS
        const e = parsed.success ? parsed.data : null;  // ✅ CHANGE
        if (!e) throw new Error("No employee data");
        // Log the response to debug if needed
        console.log("Single employee response:", e);
        // Get branch name from the response - handle different possible structures
        const branchName = e.office_branch?.name ||
          e.branch?.name ||
          e.office_branch_name ||
          e.branch_name || "-";
        const formatted = [{
          id: e.id,
          employee_code: e.employee_code,
          first_name: e.first_name,
          last_name: e.last_name,
          date_of_birth: e.date_of_birth,
          email: e.email,
          phone: e.phone,
          role_name: e.role_name || e.role?.name || "-",
          office_branch_name: branchName,
          joining_date: e.joining_date,
          employment_type: e.employment_type,
          status: e.status === "Active",
          raw: e,
        }];
        setEmployees(formatted);
        if (formatted.length > 0) {
          setSelectedEmployee(formatted[0].raw);
          setMode("view");
        }
      }
    } catch (err) {
      setError(parseBackendErrors(err));
      console.log("EMPLOYEE FETCH ERROR:", err);
    }
    finally {
      setLoading(false); // 🔥 END

    };
  }
  const refreshEmployees = () => {
    fetchEmployees();
  };
  const handleGlobalEdit = () => {
    if (activeTab === "profile") {
      setMode("form");
    } else if (tabActions?.onEdit) {
      tabActions.onEdit();
    }
  };

  const handleGlobalDelete = async () => {
    if (activeTab === "profile") {
      if (window.confirm("Delete this employee?")) {
        try {
          const res = await EmployeeAPI.delete(selectedEmployee.id);
          const parsed = parseBackendResponse(res);  // ✅ ADD THIS
          setSuccess(parsed.message || "Deleted successfully");  // ✅ CHANGE
          fetchEmployees();

          setMode("list");
        } catch (error) {
          setError(parseBackendErrors(error));
        }
      }
    } else if (tabActions?.onDelete) {
      if (window.confirm("Delete this record?")) {
        tabActions.onDelete();
      }
    }
  };

  // FETCH DEPARTMENTS & ROLES
  const fetchMeta = async () => {
    const deptRes = await DepartmentAPI.getAll();
    const roleRes = await RolesAPI.getAll();
    const branchRes = await BranchAPI.getAll();
    const parsedDept = parseBackendResponse(deptRes);  // ✅ ADD
    const parsedRole = parseBackendResponse(roleRes);  // ✅ ADD
    const parsedBranch = parseBackendResponse(branchRes);  // ✅ ADD

    setDepartments(parsedDept.success ? (parsedDept.data || []) : []);
    setRoles(parsedRole.success ? (parsedRole.data || []) : []);
    setBranches(parsedBranch.success ? (parsedBranch.data || []) : []);
  };
  useEffect(() => {
    fetchEmployees();
    fetchMeta();
  }, [isHR, employeeId, pagination.currentPage]);
  const filteredEmployees = employees.filter(emp =>
    `${emp.employee_code} ${emp.first_name} ${emp.last_name} ${emp.email} ${emp.phone} ${emp.role_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  // STATUS TOGGLE
  const handleStatusToggle = async (emp) => {
    const newStatus = !emp.status;

    setEmployees(prev =>
      prev.map(e =>
        e.id === emp.id
          ? { ...e, status: newStatus, raw: { ...e.raw, status: newStatus ? "Active" : "Inactive" } }
          : e
      )
    );

    try {
      const res = await EmployeeAPI.update(emp.id, { status: newStatus ? "Active" : "Inactive" });
      const parsed = parseBackendResponse(res);

      setSuccess(
        parsed.success
          ? parsed.message
          : res?.data?.message || "Status updated successfully"
      );
      refreshEmployees();
    } catch (error) {
      setError(parseBackendErrors(error));
      fetchEmployees();

    }
  };

  // CREATE / UPDATE
  const onSubmit = async (data, methods) => {
    try {
      const payload = {
        ...data,
        department_id: Number(data.department_id),
        role_id: Number(data.role_id),
        office_branch_id: data.office_branch_id
          ? Number(data.office_branch_id)
          : null,
        status: data.status,
      };
      let res;
      if (selectedEmployee) {
        delete payload.password;
        res = await EmployeeAPI.update(selectedEmployee.id, payload);  // ✅ CHANGE
      } else {
        res = await EmployeeAPI.create(payload);  // ✅ CHANGE
      }

      const parsed = parseBackendResponse(res);

      // ✅ Force success if API didn't throw error
      if (parsed.success) {
        setSuccess(parsed.message || "Saved successfully");
      } else {
        // 🔥 fallback: still treat as success if API returned message
        setSuccess(res?.data?.message || "Saved successfully");
      }
      setMode("list");
      fetchEmployees();
    } catch (error) {
      setError(parseBackendErrors(error));
    }


  }
  const employeeColumns = [
    { key: "employee_code" },
    { key: "office_branch_name" },   // ⭐ HERE

    {
      key: "name",
      render: (row) => `${row.first_name} ${row.last_name}`,
    },

    {
      key: "date_of_birth",
      render: (row) => formatDate(row.date_of_birth),
    },

    { key: "phone" },
    { key: "role_name" },
    {
      key: "status",
      render: (row) => (
        <button
          onClick={() => handleStatusToggle(row)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500"
          style={{
            backgroundColor: row.status ? themes.toggleOn : themes.toggleOff,
          }}

        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full shadow-md transition-all duration-500 ${row.status ? "translate-x-6" : "translate-x-1"}`} style={{ backgroundColor: themes.textWhite }}

          />
        </button>
      ),
    },
  ];
  const employeeFields = [
    { key: "employee_code", label: "Employee Code" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "gender", label: "Gender" },
    { key: "date_of_birth", label: "Date of Birth" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "office_branch_name", label: "Office Branch " },
    { key: "department_name", label: "Department Name" },
    { key: "role_name", label: "Role Name" },
    { key: "joining_date", label: "Joining Date" },
    { key: "employment_type", label: "Employee Type" },

    { key: "status", label: "Status" }
  ];


  // LIST
  if (mode === "list") {
    if (!isHR && employees.length > 0) {
      setSelectedEmployee(employees[0].raw);
      setMode("view");
      return null;
    }

    return (
      <PageContainer>
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <SectionTitle title="Employees" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">


          

            {isHR && (
              <ActionButtons
                showAdd
                addText="+ Add"
                onAdd={() => {
                  setSelectedEmployee(null);  
                  setMode("form");
                }}
              />
            )}
          </div>
        </div> */}
        <div className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-4 mb-4">

          {/* LEFT: Title + Search */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-3">

            <div>
              <SectionTitle title="Employees" />
            </div>

            <div>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

          </div>

        </div>

        {/* RIGHT: Add Button (SEPARATE — SAME AS USERS) */}
        <div className="flex flex-wrap gap-3 self-end ml-auto mb-2">

          {isHR && (
            <ActionButtons
              showAdd
              addText="+ Add"
              onAdd={() => {
                setSelectedEmployee(null);
                setMode("form");
              }}
            />
          )}

        </div>
        <Table header={<TableHeader columns={["Code", "Branch", "Name", "DOB", "Phone", "Role", "Status", "Action"]} />}>
          {filteredEmployees.map((emp, index) => (
            <EntityTableRow
              key={emp.id}
              row={emp}
              rowNumber={(Number(pagination.currentPage) - 1) * 10 + index + 1}
              columns={employeeColumns}
              onView={(r) => { setSelectedEmployee(r.raw); setMode("view"); }}
              onEdit={(r) => {
                const dept = departments.find(d => d.name === r.raw.department_name);
                const role = roles.find(r2 => r2.name === r.raw.role_name);

                setSelectedEmployee({
                  ...r.raw,
                  department_id: dept?.id,
                  role_id: role?.id,
                  office_branch_id: r.raw.office_branch_id || "", // ⭐ ADD
                });

                setMode("form");
              }}
              onDelete={async (id) => {
                try {
                  const res = await EmployeeAPI.delete(id);
                  const parsed = parseBackendResponse(res);
                  setSuccess(parsed.success
                    ? parsed.message
                    : res?.data?.message || "Deleted successfully"
                  );
                  fetchEmployees();
                } catch (error) {
                  setError(parseBackendErrors(error));
                }
              }}
            />
          ))}

        </Table>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
        />
      </PageContainer>
    );
  }

  // VIEW
  if (mode === "view" && selectedEmployee) {
    return (
      <EntityPageLayout
        title="Employee Details"
        showBack={isHR}
        onBack={() => { setMode("list"); setActiveTab("profile"); }}
      >
        <div className="w-full bg-white rounded-lg shadow overflow-hidden">
          {/* Custom Red Header */}
          <div className="bg-red-600 p-6 flex flex-col md:flex-row justify-between md:items-start text-white">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded text-xs font-bold ${selectedEmployee.status === 'Active' || selectedEmployee.status === true ? 'bg-green-100 text-green-700' : 'bg-white text-red-600'}`}>
                  {selectedEmployee.status === 'Active' || selectedEmployee.status === true ? 'Active' : 'Inactive'}
                </span>
                <span className="bg-white text-gray-800 px-3 py-1 rounded text-xs font-bold">{selectedEmployee.employee_code}</span>
              </div>
              <div className="flex flex-col gap-1 opacity-90 text-sm font-medium tracking-wide">
                <span>{selectedEmployee.email}</span>
                <span>{selectedEmployee.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-6 md:mt-0 self-end">
              {(activeTab === "profile" || tabActions?.onEdit) && (
                <button onClick={handleGlobalEdit} className="border border-white/90 text-white px-5 py-2 rounded hover:bg-white hover:text-red-600 transition flex items-center text-sm font-semibold">
                  Edit
                </button>
              )}
              {(activeTab === "profile" || tabActions?.onDelete) && (
                <button onClick={handleGlobalDelete} className="border border-white/90 text-white px-5 py-2 rounded hover:bg-white hover:text-red-600 transition flex items-center text-sm font-semibold">
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b flex overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-red-400">
            {[
              { id: "profile", label: "EMPLOYEE PROFILE" },
              { id: "documents", label: "DOCUMENTS" },
              { id: "personal", label: "PERSONAL DETAILS" },
              { id: "salary", label: "SALARY" },
              { id: "users", label: "USERS" },
              { id: "leave_balance", label: "LEAVE BALANCE" },
              { id: "leave_requests", label: "LEAVE REQUESTS" },
              { id: "attendance", label: "ATTENDANCE" },
              { id: "salary_payout", label: "SALARY PAYOUT" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-bold whitespace-nowrap border-b-2 ${activeTab === tab.id ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-0 bg-[#f9fafb]">
            {activeTab === "profile" && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-5 rounded-lg border">
                  {employeeFields.map(f => (
                    <div key={f.key}>
                      <p className="text-xs text-gray-500 mb-1">{f.label}</p>
                      <div className="p-2 border rounded text-gray-800 font-medium bg-gray-50">
                        {["date_of_birth", "joining_date"].includes(f.key)
                          ? formatDate(selectedEmployee[f.key])
                          : selectedEmployee[f.key] || "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "documents" && <EmployeeDocuments employeeFilterId={selectedEmployee.id} asSubcomponent setTabActions={setTabActions} />}
            {activeTab === "personal" && <EmployeePersonalDetails employeeFilterId={selectedEmployee.id} asSubcomponent setTabActions={setTabActions} />}
            {activeTab === "salary" && <EmployeeSalary employeeFilterId={selectedEmployee.id} asSubcomponent setTabActions={setTabActions} />}
            {activeTab === "users" && <Users employeeFilterId={selectedEmployee.id} asSubcomponent setTabActions={setTabActions} />}
            {activeTab === "leave_balance" && <LeaveBalance employeeFilterId={selectedEmployee.id} asSubcomponent setTabActions={setTabActions} />}
            {activeTab === "leave_requests" && <LeaveRequests employeeFilterId={selectedEmployee.id} asSubcomponent setTabActions={setTabActions} />}
            {activeTab === "attendance" && <EmployeeAttendance employeeFilterId={selectedEmployee.id} asSubcomponent setTabActions={setTabActions} />}
            {activeTab === "salary_payout" && <SalaryPayout employeeFilterId={selectedEmployee.id} asSubcomponent setTabActions={setTabActions} />}
          </div>
        </div>
      </EntityPageLayout>
    );
  }

  // FORM
  return (
    <EntityPageLayout
      title="Employee Details"
      showBack={isHR}
      onBack={() => setMode(isHR ? "list" : "view")}
    >
      <EntityForm
        title={selectedEmployee ? "Edit Employee" : "Create Employee"}
        selectedItem={
          selectedEmployee
            ? {
              ...selectedEmployee,
              date_of_birth: selectedEmployee.date_of_birth?.split("T")[0],
              joining_date: selectedEmployee.joining_date?.split("T")[0],
              status:
                selectedEmployee.status === true ||
                  selectedEmployee.status === "Active"
                  ? "Active"
                  : "Inactive",
            }
            : null
        }

        onSubmit={onSubmit}
        setMode={setMode}
        onCancel={() => setMode(isHR ? "list" : "view")}
        fields={[
          { label: "Employee Code", name: "employee_code", required: true },

          { label: "First Name", name: "first_name", required: true },

          { label: "Last Name", name: "last_name", required: true },

          {
            label: "Gender",
            name: "gender",
            type: "select",
            required: true,
            options: [
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" }
            ]
          },

          {
            label: "Office Branch",
            name: "office_branch_id",
            type: "select",
            options: branches.map(b => ({
              label: b.name,
              value: b.id,
            })),
          },

          {
            "label": "Date of Birth",
            "name": "date_of_birth",
            "type": "date",
            "required": true,
            "dateFormat": "DD/MM/YYYY",
            "placeholder": "dd/mm/yyyy"
          },

          { label: "Email", name: "email", type: "email", required: true },

          { label: "Phone", name: "phone", required: true },

          {
            label: "Joining Date",
            name: "joining_date",
            type: "date",
            required: true
          },

          {
            label: "Department",
            name: "department_id",
            type: "select",
            required: true,
            options: departments.map(d => ({ label: d.name, value: d.id }))
          },

          {
            label: "Role",
            name: "role_id",
            type: "select",
            required: true,
            options: roles.map(r => ({ label: r.name, value: r.id }))
          },

          {
            label: "Employment Type",
            name: "employment_type",
            type: "select",
            required: true,
            options: [
              { label: "Permanent", value: "Permanent" },
              { label: "Contract", value: "Contract" },
              { label: "Intern", value: "Intern" }
            ]
          },

          {
            label: "Status",
            name: "status",
            type: "select",
            required: true,
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" }
            ]
          },

          ...(isHR
            ? (
              selectedEmployee
                ? []
                : [{ label: "Password", name: "password", type: "password", required: true }]
            )
            : [
              {
                label: "Change Password",
                name: "change_password",
                type: "password",
                required: false,
              }
            ]),
        ]}
      />
    </EntityPageLayout>
  );
}