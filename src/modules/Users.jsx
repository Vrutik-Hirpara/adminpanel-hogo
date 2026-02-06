



// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import TableRow from "../components/table/TableRow"; // 🔥 SAME ROW AS ROLES

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import UsersViewCard from "../components/view/UserViewCard";

// import { EmployeeAPI, UserAPI } from "../services/apiService";
// import api from "../services/api";
// import EntityTableRow from "../components/table/EntityTableRow";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // ================= FETCH USERS =================
//   const fetchUsers = async () => {
//     const res = await api.get("users/");

//     // 🔥 MAP is_active → status (for reusable TableRow)
//     const formatted = (res.data.data || res.data || []).map(u => ({
//       ...u,
//       name: u.username,          // for table column
//       description: u.role,       // reuse column slot
//       status: u.is_active,       // 🔥 KEY PART
//       raw: u,
//     }));

//     setUsers(formatted);
//   };

//   const fetchEmployees = async () => {
//     const res = await EmployeeAPI.getAll();
//     setEmployees(res.data?.data || []);
//   };


//   useEffect(() => {
//     fetchUsers();
//     fetchEmployees();
//   }, []);

//   // ================= STATUS TOGGLE =================
//   const handleStatusToggle = async (user) => {
//     const newStatus = !user.status;

//     // Optimistic UI
//     setUsers(prev =>
//       prev.map(u =>
//         u.id === user.id ? { ...u, status: newStatus } : u
//       )
//     );

//     try {
//       await api.patch(`users/${user.id}/`, { is_active: newStatus });
//     } catch {
//       fetchUsers();
//     }
//   };

//   // ================= SAVE =================
//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         username: data.username,
//         employee_id: Number(data.employee_id),
//         role: data.role,
//         is_active: data.status === "Active",
//       };

//       if (selectedItem) {
//         await api.patch(`users/${selectedItem.id}/`, payload);
//       } else {
//         payload.password = data.password;
//         await api.post("users/", payload);
//       }

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
//   const userColumns = [
//     { key: "username" },
//     { key: "role" },
//     {
//       key: "status",
//       render: (row) => (
//         <button
//           onClick={() => handleStatusToggle(row)}
//           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 ${row.status ? "bg-green-500" : "bg-gray-400"
//             }`}
//         >
//           <span
//             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-500 ${row.status ? "translate-x-6" : "translate-x-1"
//               }`}
//           />
//         </button>
//       ),
//     },
//   ];

//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Users" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => {
//             setSelectedItem(null);
//             setMode("form");
//           }}
//           />
//         </div>

//         <Table
//           header={<TableHeader columns={["Name", "Role", "Status", "Action"]} />}
//         >
//           {users.map((u, index) => (
//             <EntityTableRow
//               key={u.id}
//               row={u}
//               index={index}
//               columns={userColumns}
//               onView={(r) => {
//                 setSelectedItem(r);
//                 setMode("view");
//               }}
//               onEdit={(r) => {
//                 setSelectedItem(r);
//                 setMode("form");
//               }}
//               onDelete={(id) => UserAPI.delete(id).then(fetchUsers)}
//             />
//           ))}

//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
//   if (mode === "view" && selectedItem) {
//     const emp = employees.find(
//       e => e.id === (selectedItem.employee_id || selectedItem.employee)
//     );

//     return (
//       <EntityPageLayout title="User Details" showBack onBack={() => setMode("list")}>
//         <UsersViewCard
//           user={selectedItem}
//           employeeName={
//             emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : "Employee"
//           }
//         />
//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM =================
//   return (
//     <EntityPageLayout title="User" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit User" : "Create User"}
//         selectedItem={
//           selectedItem
//             ? {
//               ...selectedItem,
//               status: selectedItem.is_active ? "Active" : "Inactive",
//             }
//             : { status: "Active" }   // 🔥 default for create
//         }

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
//             label: "Status",
//             name: "status",
//             type: "select",
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Inactive", value: "Inactive" },
//             ],
//           },

//           ...(selectedItem ? [] : [
//             { label: "Password", name: "password", type: "password", required: true }
//           ]),
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }
import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import UsersViewCard from "../components/view/UserViewCard";
import EntityTableRow from "../components/table/EntityTableRow";

import { EmployeeAPI, UserAPI } from "../services/apiService";
import api from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    const res = await api.get("users/");
    const formatted = (res.data.data || res.data || []).map(u => ({
      ...u,
      status: u.is_active,
    }));
    setUsers(formatted);
  };

  const fetchEmployees = async () => {
    const res = await EmployeeAPI.getAll();
    setEmployees(res.data?.data || []);
  };

  useEffect(() => {
    fetchUsers();
    fetchEmployees();
  }, []);

  // ================= STATUS TOGGLE =================
  const handleStatusToggle = async (user) => {
    const newStatus = !user.status;

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
    await UserAPI.delete(id);
    fetchUsers();
  };

  const userColumns = [
    { key: "username" },
    {
      key: "status",
      render: (row) => (
        <button
          onClick={() => handleStatusToggle(row)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 ${
            row.status ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-500 ${
              row.status ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      ),
    },
  ];

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Users" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => {
            setSelectedItem(null);
            setMode("form");
          }} />
        </div>

        <Table header={<TableHeader columns={["Name", "Status", "Action"]} />}>
          {users.map((u, index) => (
            <EntityTableRow
              key={u.id}
              row={u}
              index={index}
              columns={userColumns}
              onView={(r) => { setSelectedItem(r); setMode("view"); }}
              onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
              onDelete={handleDelete}
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

        {/* 🔥 PASSWORD MASK */}
        <div className="mt-6 px-6">
          <label className="block text-xs mb-1 text-gray-500">Password</label>
          <input
            type="password"
            value="********"
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
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
            ? { ...selectedItem, status: selectedItem.is_active ? "Active" : "Inactive" }
            : { status: "Active" }
        }
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          
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
          { label: "Username", name: "username", required: true },
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
