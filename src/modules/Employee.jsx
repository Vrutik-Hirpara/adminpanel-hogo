// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import EmployeeTableRow from "../components/table/EmployeeTableRow";

// import {
//   getEmployees,
//   createEmployee,
//   updateEmployee,
//   deleteEmployee,
// } from "../services/employee.service";

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import EmployeeViewCard from "../components/view/EmployeeViewCard";

// export default function Employee() {
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   // ✅ FETCH + map fields correctly
//   const fetchEmployees = async () => {
//     const res = await getEmployees();
//     const data = res.data?.data || [];

//     const formatted = data.map(e => ({
//       id: e.id,
//       employee_code: e.employee_code,
//       first_name: e.first_name,
//       last_name: e.last_name,
//       gender: e.gender,
//       date_of_birth: e.date_of_birth,
//       email: e.email,
//       phone: e.phone,
//       joining_date: e.joining_date,
//       employment_type: e.employment_type,
//       status: e.status === "Active",
//       raw: e, // preserve original for edit/view
//     }));

//     setEmployees(formatted);
//   };

//   useEffect(() => { fetchEmployees(); }, []);

//   // 🔥 STATUS TOGGLE
//   const handleStatusToggle = async (emp) => {
//     const newStatus = !emp.status;

//     setEmployees(prev =>
//       prev.map(e => e.id === emp.id ? { ...e, status: newStatus } : e)
//     );

//     try {
//       await updateEmployee(emp.id, {
//         ...emp.raw,
//         status: newStatus ? "Active" : "Inactive",
//       });
//     } catch {
//       setEmployees(prev =>
//         prev.map(e => e.id === emp.id ? { ...e, status: !newStatus } : e)
//       );
//     }
//   };

// const onSubmit = async (data) => {
//   const payload = {
//     ...data,
//     status: data.status,   // already "Active" or "Inactive"
//   };

//   if (selectedEmployee) {
//     await updateEmployee(selectedEmployee.id, payload);
//   } else {
//     await createEmployee(payload);
//   }

//   setMode("list");
//   fetchEmployees();
// };


//   // ================= LIST PAGE =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Employees" />
//           <ActionButtons showAdd addText="+ Add Employee" onAdd={() => setMode("form")} />
//         </div>

//       <Table
//   header={
//     <TableHeader
//       columns={[
//         "Code",
//         "First Name",
//         "Last Name",
//         "Gender",
//         "DOB",
//         "Email",
//         "Phone",
//         "Joining",
//         "Type",
//         "Status",
//         "Action",
//       ]}
//     />
//   }
// >

//           {employees.map(emp => (
//             <EmployeeTableRow
//   key={emp.id}
//   row={emp}
//   columns={[
//     { key: "employee_code" },
//     { key: "first_name" },
//     { key: "last_name" },
//     { key: "gender" },
//     { key: "date_of_birth" },
//     { key: "email" },
//     { key: "phone" },
//     { key: "joining_date" },
//     { key: "employment_type" },
//   ]}
//   onToggleStatus={handleStatusToggle}
//   onView={(r) => setSelectedEmployee(r.raw)}
//   onEdit={(r) => setSelectedEmployee(r.raw)}
//   onDelete={(id) => deleteEmployee(id)}
// />

//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
//   if (mode === "view" && selectedEmployee) {
//     return (
//       <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
//         <EmployeeViewCard employee={selectedEmployee} />
//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM =================
//   return (
//     <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedEmployee ? "Edit Employee" : "Create Employee"}
//         selectedItem={selectedEmployee}
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
//             options: [
//               { label: "Male", value: "Male" },
//               { label: "Female", value: "Female" }
//             ]
//           },
//           { label: "Date of Birth", name: "date_of_birth", type: "date" },
//           { label: "Email", name: "email", type: "email" },
//           { label: "Phone", name: "phone" },
//           { label: "Joining Date", name: "joining_date", type: "date" },
//           {
//             label: "Employment Type",
//             name: "employment_type",
//             type: "select",
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
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Inactive", value: "Inactive" }
//             ]
//           },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }



import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import EmployeeTableRow from "../components/table/EmployeeTableRow";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employee.service";

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import EmployeeViewCard from "../components/view/EmployeeViewCard";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // FETCH
  const fetchEmployees = async () => {
    const res = await getEmployees();
    const data = res.data?.data || [];

    const formatted = data.map(e => ({
      id: e.id,
      employee_code: e.employee_code,
      first_name: e.first_name,
      last_name: e.last_name,
      gender: e.gender,
      date_of_birth: e.date_of_birth,
      email: e.email,
      phone: e.phone,
      joining_date: e.joining_date,
      employment_type: e.employment_type,
      status: e.status === "Active",
      raw: e,
    }));

    setEmployees(formatted);
  };

  useEffect(() => { fetchEmployees(); }, []);

  // STATUS TOGGLE (already correct)
const handleStatusToggle = async (emp) => {
  const newStatus = !emp.status;

  // Optimistic UI update
  setEmployees(prev =>
    prev.map(e =>
      e.id === emp.id
        ? {
            ...e,
            status: newStatus,
            raw: {
              ...e.raw,
              status: newStatus ? "Active" : "Inactive", // 🔥 sync raw
            },
          }
        : e
    )
  );

  try {
    await updateEmployee(emp.id, {
      status: newStatus ? "Active" : "Inactive",
    });
  } catch {
    // revert
    setEmployees(prev =>
      prev.map(e =>
        e.id === emp.id
          ? {
              ...e,
              status: !newStatus,
              raw: {
                ...e.raw,
                status: !newStatus ? "Active" : "Inactive",
              },
            }
          : e
      )
    );
  }
};



  // 🔥 ONLY FIX: CREATE / UPDATE PAYLOAD
const onSubmit = async (data) => {
  try {
    const payload = {
      ...data,
      department_id: data.department_id
        ? Number(data.department_id)
        : 6,  // 🔥 default
      role_id: data.role_id
        ? Number(data.role_id)
        : 2,  // 🔥 default
      status: data.status,
    };

    // remove password on edit
    if (selectedEmployee) {
      delete payload.password;
      await updateEmployee(selectedEmployee.id, payload);
    } else {
      await createEmployee(payload);
    }

    setMode("list");
    fetchEmployees();
  } catch (error) {
    console.error("Employee Save Error:", error.response?.data);
  }
};


  // LIST PAGE
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employees" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table
          header={
            <TableHeader
              columns={[
                "Code",
                "First Name",
                "Last Name",
                // "Gender",
                "DOB",
                "Email",
                "Phone",
                "Joining",
                // "Type",
                "Status",
                "Action",
              ]}
            />
          }
        >
          {employees.map(emp => (
            <EmployeeTableRow
              key={emp.id}
              row={emp}
              onToggleStatus={handleStatusToggle}
              onView={(r) => { setSelectedEmployee(r.raw); setMode("view"); }}
              onEdit={(r) => { setSelectedEmployee(r.raw); setMode("form"); }}
              onDelete={(id) => deleteEmployee(id).then(fetchEmployees)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  // VIEW
  if (mode === "view" && selectedEmployee) {
    return (
      <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
        <EmployeeViewCard employee={selectedEmployee} />
      </EntityPageLayout>
    );
  }

  // FORM
  return (
    <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedEmployee ? "Edit Employee" : "Create Employee"}
        selectedItem={selectedEmployee}
        onSubmit={onSubmit}
        setMode={setMode}
   fields={[
  { label: "Employee Code", name: "employee_code", required: true },
  { label: "First Name", name: "first_name", required: true },
  { label: "Last Name", name: "last_name", required: true },

  {
    label: "Gender",
    name: "gender",
    type: "select",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ]
  },

  { label: "Date of Birth", name: "date_of_birth", type: "date" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone", name: "phone" },
  { label: "Joining Date", name: "joining_date", type: "date" },

  {
    label: "Employment Type",
    name: "employment_type",
    type: "select",
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
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" }
    ]
  },

  // 🔥 SHOW ONLY WHEN CREATING
  ...(selectedEmployee
    ? []
    : [
        {
          label: "Password",
          name: "password",
          type: "password",
          required: true,
        },
      ]),
]}

      />
    </EntityPageLayout>
  );
}
