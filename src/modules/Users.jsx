// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import UserRow from "../components/table/UserRow";
// import UserViewCard from "../components/view/UserViewCard";

// import { getEmployees } from "../services/employee.service";
// import api from "../services/api";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // FETCH USERS
//   const fetchUsers = async () => {
//     const res = await api.get("users/");
//     setUsers(res.data.data || []);
//   };

//   // FETCH EMPLOYEES
//   const fetchEmployees = async () => {
//     const res = await getEmployees();
//     setEmployees(res.data.data || []);
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchEmployees();
//   }, []);

//   // CREATE / UPDATE
//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         ...data,
//         employee_id: Number(data.employee_id),
//         is_active: data.is_active === "true" || data.is_active === true,
//       };

//       const exists = users.find(u => u.employee_id === payload.employee_id);

//       if (!selectedItem && exists) {
//         alert("User already exists for this employee");
//         return;
//       }

//       selectedItem
//         ? await api.patch(`users/${selectedItem.id}/`, payload)
//         : await api.post("users/", payload);

//       alert("Saved successfully");
//       setMode("list");
//       fetchUsers();

//     } catch (err) {
//       console.error("SAVE ERROR:", err.response?.data || err.message);
//       alert("Save failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     await api.delete(`users/${id}/`);
//     fetchUsers();
//   };

//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Users" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//         </div>

//         <Table header={<TableHeader columns={["Username","Employee","Role","Active","Action"]} />}>
//           {users.map(u => {
//             const emp = employees.find(e => e.id === u.employee_id);

//             return (
//               <UserRow
//                 key={u.id}
//                 row={u}
//                 employeeName={emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : "—"}
//                 onView={(r) => { setSelectedItem(r); setMode("view"); }}
//                 onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//                 onDelete={(id) => handleDelete(id)}
//               />
//             );
//           })}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
//   if (mode === "view" && selectedItem) {
//     const emp = employees.find(e => e.id === selectedItem.employee_id);

//     return (
//       <EntityPageLayout title="User Details" showBack onBack={() => setMode("list")}>
//         <UserViewCard
//           user={selectedItem}
//           employeeName={emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : "Employee"}
//         />
//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM =================
//   return (
//     <EntityPageLayout title="User Details" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit User" : "Create User"}
//         selectedItem={selectedItem}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           { label: "Username", name: "username", required: true },

//           {
//             label: "Employee",
//             name: "employee_id",
//             type: "select",
//             required: true,
//             options: employees.map(e => ({
//               label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//           },

//           { label: "Role", name: "role" },

//           {
//             label: "Active Status",
//             name: "is_active",
//             type: "select",
//             options: [
//               { label: "Active", value: true },
//               { label: "Inactive", value: false }
//             ],
//           },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }



// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import UsersRow from "../components/table/UserRow";
// import UsersViewCard from "../components/view/UserViewCard";

// import { getEmployees } from "../services/employee.service";
// import api from "../services/api";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // FETCH USERS
//   const fetchUsers = async () => {
//     const res = await api.get("users/");
//     setUsers(res.data.data || []);
//   };

//   // FETCH EMPLOYEES (for dropdown)
//   const fetchEmployees = async () => {
//     const res = await getEmployees();
//     setEmployees(res.data.data || []);
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchEmployees();
//   }, []);

//   // SAVE (CREATE / UPDATE)
// const onSubmit = async (data) => {
//   try {
//     const payload = {
//       ...data,
//       employee_id: Number(data.employee_id),
//       is_active: data.is_active === "Active", // 🔥 string → boolean
//     };

//     if (selectedItem) {
//       delete payload.password;
//       await api.patch(`users/${selectedItem.id}/`, payload);
//     } else {
//       await api.post("users/", payload);
//     }

//     alert("Saved successfully");
//     setMode("list");
//     fetchUsers();
//   } catch (err) {
//     console.error("SAVE ERROR:", err.response?.data || err.message);
//     alert("Save failed");
//   }
// };


//   const handleDelete = async (id) => {
//     await api.delete(`users/${id}/`);
//     fetchUsers();
//   };




// const handleStatusToggle = async (user) => {
//   const newStatus = !user.is_active;

//   // 🔥 Optimistic UI update (same as Roles)
//   setUsers(prev =>
//     prev.map(u =>
//       u.id === user.id ? { ...u, is_active: newStatus } : u
//     )
//   );

//   try {
//     await api.patch(`users/${user.id}/`, { is_active: newStatus });
//   } catch (error) {
//     console.log("Status update failed, reverting...", error);

//     // revert like Roles page
//     setUsers(prev =>
//       prev.map(u =>
//         u.id === user.id ? { ...u, is_active: !newStatus } : u
//       )
//     );
//   }
// };

//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Users" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//         </div>

//         <Table
//           header={
//             <TableHeader columns={["Username", "Employee", "Role", "Status", "Action"]} />
//           }
//         >
//           {users.map((u) => {
//             const emp = employees.find(e => e.id === u.employee_id);

//             return (
//               <UsersRow
//                 key={u.id}
//                 row={u}
//                   onToggleStatus={handleStatusToggle}

//                 employeeName={
//                   emp
//                     ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
//                     : "—"
//                 }
//                 onView={(r) => { setSelectedItem(r); setMode("view"); }}
//                 onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//                 onDelete={(id) => handleDelete(id)}
//               />
//             );
//           })}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
//   if (mode === "view" && selectedItem) {
//     const emp = employees.find(e => e.id === selectedItem.employee_id);

//     return (
//       <EntityPageLayout title="User Details" showBack onBack={() => setMode("list")}>
//         <UsersViewCard
//           user={selectedItem}
//           employeeName={
//             emp
//               ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
//               : "Employee"
//           }
//         />
//       </EntityPageLayout>
//     );
//   }




//   // ================= FORM =================
//   return (
// <EntityPageLayout title="User" showBack onBack={() => setMode("list")}>
//   <EntityForm
//     title={selectedItem ? "Edit User" : "Create User"}
//     selectedItem={
//       selectedItem
//         ? {
//             ...selectedItem,
//             is_active: selectedItem.is_active ? "Active" : "Inactive", // UI mate string
//           }
//         : null
//     }
//     onSubmit={onSubmit}
//     setMode={setMode}
//     fields={[
//       { label: "Username", name: "username", required: true },

//       {
//         label: "Employee",
//         name: "employee_id",
//         type: "select",
//         required: true,
//         options: employees.map(e => ({
//           label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
//           value: e.id,
//         })),
//       },

//       { label: "Role", name: "role" },

//       // 🔥 ROLE.JSX JEVO STATUS BUTTON
//       {
//         label: "Status",
//         name: "is_active",
//         type: "select",
//         options: [
//           { label: "Active", value: "Active" },
//           { label: "Inactive", value: "Inactive" },
//         ],
//       },

//       ...(selectedItem
//         ? []
//         : [
//             {
//               label: "Password",
//               name: "password",
//               type: "password",
//               required: true,
//             },
//           ]),
//     ]}
//   />
// </EntityPageLayout>

//   );
// }






import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import TableRow from "../components/table/TableRow"; // 🔥 SAME ROW AS ROLES

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import UsersViewCard from "../components/view/UserViewCard";

import { getEmployees } from "../services/employee.service";
import api from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    const res = await api.get("users/");

    // 🔥 MAP is_active → status (for reusable TableRow)
   const formatted = (res.data.data || res.data || []).map(u => ({
      ...u,
      name: u.username,          // for table column
      description: u.role,       // reuse column slot
      status: u.is_active,       // 🔥 KEY PART
      raw: u,
    }));

    setUsers(formatted);
  };

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data.data || []);
  };

  useEffect(() => {
    fetchUsers();
    fetchEmployees();
  }, []);

  // ================= STATUS TOGGLE =================
  const handleStatusToggle = async (user) => {
    const newStatus = !user.status;

    // Optimistic UI
    setUsers(prev =>
      prev.map(u =>
        u.id === user.id ? { ...u, status: newStatus } : u
      )
    );

    try {
      await api.patch(`users/${user.id}/`, { is_active: newStatus });
    } catch {
      fetchUsers();
    }
  };

  // ================= SAVE =================
const onSubmit = async (data) => {
  try {
    const payload = {
      username: data.username,
      employee_id: Number(data.employee_id),
      role: data.role,
      is_active: data.status === "Active",
    };

    if (selectedItem) {
      await api.patch(`users/${selectedItem.id}/`, payload);
    } else {
      payload.password = data.password;
      await api.post("users/", payload);
    }

    setMode("list");
    fetchUsers();
  } catch (err) {
    console.error("SAVE ERROR:", err.response?.data || err.message);
    alert("Save failed");
  }
};


  const handleDelete = async (id) => {
    await api.delete(`users/${id}/`);
    fetchUsers();
  };

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Users" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => {
  setSelectedItem(null);
  setMode("form");
}}
 />
        </div>

        <Table
          header={<TableHeader columns={["Name", "Role", "Status", "Action"]} />}
        >
          {users.map(u => (
            <TableRow
              key={u.id}
              row={u}
              onToggleStatus={handleStatusToggle}
              onView={(r) => { setSelectedItem(r.raw); setMode("view"); }}
              onEdit={(r) => { setSelectedItem(r.raw); setMode("form"); }}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
const emp = employees.find(
  e => e.id === (selectedItem.employee_id || selectedItem.employee)
);

    return (
      <EntityPageLayout title="User Details" showBack onBack={() => setMode("list")}>
        <UsersViewCard
          user={selectedItem}
          employeeName={
            emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : "Employee"
          }
        />
      </EntityPageLayout>
    );
  }

  // ================= FORM =================
  return (
    <EntityPageLayout title="User" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit User" : "Create User"}
    selectedItem={
  selectedItem
    ? {
        ...selectedItem,
        status: selectedItem.is_active ? "Active" : "Inactive",
      }
    : { status: "Active" }   // 🔥 default for create
}

        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          { label: "Username", name: "username", required: true },

          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            required: true,
            options: employees.map(e => ({
              label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
          },

          { label: "Role", name: "role" },

          {
            label: "Status",
            name: "status",
            type: "select",
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },

          ...(selectedItem ? [] : [
            { label: "Password", name: "password", type: "password", required: true }
          ]),
        ]}
      />
    </EntityPageLayout>
  );
}
