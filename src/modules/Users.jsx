
// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import EntityViewCard from "../components/view/EntityViewCard";
// import EntityTableRow from "../components/table/EntityTableRow";
// import { themes } from "../config/theme.config";

// import { EmployeeAPI, UserAPI } from "../services";
// import api from "../services/api";
// import SearchBar from "../components/table/SearchBar";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);
// const [search, setSearch] = useState("");

//   // ================= FETCH USERS =================
//   const fetchUsers = async () => {
//     const res = await api.get("users/");
//     const formatted = (res.data.data || res.data || []).map(u => ({
//       ...u,
//       status: u.is_active,
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
// const filteredUsers = users.filter(u =>
//   `${u.username}`
//     .toLowerCase()
//     .includes(search.toLowerCase())
// );

//   // ================= STATUS TOGGLE =================
//   const handleStatusToggle = async (user) => {
//     const newStatus = !user.status;

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
//     await UserAPI.delete(id);
//     fetchUsers();
//   };

// const userFields = [
//   { key: "username", label: "Username" },
//   {
//     key: "status",
//     label: "Status",
//     format: (v) => (v ? "Active" : "Inactive"),
//   },
//   { key: "employeeName", label: "Employee" },
// ];

// const userColumns = [
//   { key: "username" },
//   {
//     key: "status",
//     render: (row) => (
//       <button
//         onClick={() => handleStatusToggle(row)}
//    className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500"
// style={{
//   backgroundColor: row.status ? themes.toggleOn : themes.toggleOff,
// }}

//       >
//         <span
//           className={`inline-block h-4 w-4 transform rounded-full  transition-all duration-500 ${
//             row.status ? "translate-x-6" : "translate-x-1"
//           }`}   style={{ backgroundColor: themes.textWhite }}

//         />
//       </button>
//     ),
//   },
// ];

//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//       <div className="flex justify-between items-center mb-4">
//   <SectionTitle title="Users" />

//   <div className="flex gap-3">
//     <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
//     <ActionButtons showAdd addText="+ Add" onAdd={() => {
//       setSelectedItem(null);
//       setMode("form");
//     }} />
//   </div>
// </div>


//         <Table header={<TableHeader columns={["Name", "Status", "Action"]} />}>
// {filteredUsers.map((u, index) => (
//             <EntityTableRow
//               key={u.id}
//               row={u}
//               index={index}
//               columns={userColumns}
//               onView={(r) => { setSelectedItem(r); setMode("view"); }}
//               onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//               onDelete={handleDelete}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
// if (mode === "view" && selectedItem) {
//   const emp = employees.find(
//     e => e.id === (selectedItem.employee_id || selectedItem.employee)
//   );



//   const viewData = {
//     ...selectedItem,
//     employeeName: emp
//       ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
//       : "Employee",
//   };

//   return (
//     <EntityPageLayout
//       title="User Details"
//       showBack
//       onBack={() => setMode("list")}
//     >
//       <EntityViewCard
//         title="User"
//         data={viewData}
//         fields={userFields}
//         api={UserAPI}
//         onUpdated={fetchUsers}
//         onDeleted={fetchUsers}
//         headerKeys={["username"]}
//       />
//     </EntityPageLayout>
//   );
// }


//   // ================= FORM =================
//   return (
//     <EntityPageLayout title="User" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit User" : "Create User"}
//         selectedItem={
//           selectedItem
//             ? { ...selectedItem, status: selectedItem.is_active ? "Active" : "Inactive" }
//             : {}
//         }
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
          
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
//           { label: "Username", name: "username", required: true },
//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//                         required: true,

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
//     );
// }


import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import EntityViewCard from "../components/view/EntityViewCard";
import EntityTableRow from "../components/table/EntityTableRow";
import { themes } from "../config/theme.config";

import { EmployeeAPI, UserAPI } from "../services";
import api from "../services/api";
import SearchBar from "../components/table/SearchBar";

// ✅ IMPORT ROLE HOOK
import { useUser } from "../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";

export default function Users() {

  // 🔥 role based values
  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();

  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      let res;

      if (isHR) {
        // 👑 HR → all users
        res = await api.get("users/");
        const list = res.data?.data || res.data || [];

        const formatted = list.map(u => ({
          ...u,
          status: u.is_active,
        }));

        setUsers(formatted);

      } else {
        // 🔒 Non-HR → only own user
        res = await api.get("users/");
        const list = res.data?.data || res.data || [];

        const filtered = list.filter(
          u => Number(u.employee_id || u.employee) === Number(employeeId)
        );

        const formatted = filtered.map(u => ({
          ...u,
          status: u.is_active,
        }));

        setUsers(formatted);
      }

    } catch (err) {
      setError(parseBackendErrors(err));
      console.log("USER FETCH ERROR:", err);
    }
  };

  // ================= FETCH EMPLOYEES =================
  const fetchEmployees = async () => {
    try {
      const res = await EmployeeAPI.getAll();
      let list = res.data?.data || [];

      // 🔒 non-HR → only own employee
      if (!isHR) {
        list = list.filter(e => e.id === employeeId);
      }

      setEmployees(list);
    } catch (err) {
      setError(parseBackendErrors(err));
      console.log("EMPLOYEE FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEmployees();
  }, [isHR, employeeId]);

  // ================= SEARCH =================
  const filteredUsers = users.filter(u =>
    `${u.username}`.toLowerCase().includes(search.toLowerCase())
  );

  // ================= STATUS TOGGLE =================
  const handleStatusToggle = async (user) => {
    const newStatus = !user.status;

    setUsers(prev =>
      prev.map(u =>
        u.id === user.id ? { ...u, status: newStatus } : u
      )
    );

    try {
      const res = await api.patch(`users/${user.id}/`, { is_active: newStatus });
      setSuccess(res.data?.message || "Status updated successfully");
    } catch (error) {
      setError(parseBackendErrors(error));
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

      setSuccess("Saved successfully");
      setMode("list");
      fetchUsers();

    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await UserAPI.delete(id);
      setSuccess(res.data?.message || "Deleted successfully");
      fetchUsers();
    } catch (error) {
      setError(parseBackendErrors(error));
    }
  };

  // ================= VIEW FIELDS =================
  const userFields = [
    { key: "username", label: "Username" },
    {
      key: "status",
      label: "Status",
      format: (v) => (v ? "Active" : "Inactive"),
    },
    { key: "employeeName", label: "Employee" },
  ];

  // ================= TABLE COLUMNS =================
  const userColumns = [
    { key: "username" },
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
            className={`inline-block h-4 w-4 transform rounded-full transition-all duration-500 ${
              row.status ? "translate-x-6" : "translate-x-1"
            }`}
            style={{ backgroundColor: themes.textWhite }}
          />
        </button>
      ),
    },
  ];

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <SectionTitle title="Users" />

          <div className="flex flex-wrap gap-3 self-end">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search users..."
            />
{isHR && (
            <ActionButtons
              showAdd
              addText="+ Add"
              onAdd={() => {
                setSelectedItem(null);
                setMode("form");
              }}
            />
)}
          </div>
        </div>

        <Table header={<TableHeader columns={["Name", "Status", "Action"]} />}>
          {filteredUsers.map((u, index) => (
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

    const viewData = {
      ...selectedItem,
      employeeName: emp
        ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
        : "Employee",
    };

    return (
      <EntityPageLayout
        title="User Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="User"
          data={viewData}
          fields={userFields}
          api={UserAPI}
          onUpdated={fetchUsers}
          onDeleted={fetchUsers}
          headerKeys={["username"]}
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
            : {}
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
            required: true,
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },
          ...(selectedItem
            ? []
            : [{ label: "Password", name: "password", type: "password", required: true }]),
        ]}
      />
    </EntityPageLayout>
  );
}