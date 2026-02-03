
// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import TableRow from "../components/table/TableRow";

// import { getRoles, createRole, updateRole, deleteRole } from "../services/roles.service";

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import RoleViewCard from "../components/view/RoleViewCard";
// import EntityForm from "../components/form/EntityForm";

// export default function Roles() {
//   const [roles, setRoles] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedRole, setSelectedRole] = useState(null);

//   const fetchRoles = async () => {
//     const res = await getRoles();
//     // console.log("ROLES API:", res);
//     setRoles(res.data.data || res);   // 🔥 key fix
//   };
//   useEffect(() => { fetchRoles(); }, []);

//   const onSubmit = async (data) => {
//     const payload = { ...data, status: data.status === "Active" };
//     selectedRole ? await updateRole(selectedRole.id, payload) : await createRole(payload);
//     setMode("list");
//     fetchRoles();
//   };

//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Roles" />
//           <ActionButtons showAdd addText="+ Add Roles" onAdd={() => setMode("form")} />
//         </div>

//         <Table header={<TableHeader columns={["Name", "Description", "Status", "Action"]} />}>
//           {roles?.map?.(r => (

//             <TableRow
//               key={r.id}
//               row={{ ...r, status: r.status ? "Active" : "Inactive" }}
//               onView={() => { setSelectedRole(r); setMode("view"); }}
//               onEdit={() => { setSelectedRole(r); setMode("form"); }}
//               onDelete={() => deleteRole(r.id).then(fetchRoles)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   if (mode === "view" && selectedRole) {
//     return (
//       <EntityPageLayout title="Role Details" showBack onBack={() => setMode("list")}>
//         <RoleViewCard role={selectedRole} />
//       </EntityPageLayout>
//     );
//   }

//   return (
//     <EntityPageLayout title="Role Details" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedRole ? "Edit Role" : "Create Role"}
//         selectedItem={
//           selectedRole
//             ? { ...selectedRole, status: selectedRole.status ? "Active" : "Inactive" }
//             : null
//         }

//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           { label: "Role Name", name: "name", required: true },
//           {
//             label: "Status", name: "status", type: "select", options: [
//               { label: "Active", value: "Active" },
//               { label: "Inactive", value: "Inactive" }
//             ]
//           },
//           { label: "Description", name: "description", type: "textarea" },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }







// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import TableRow from "../components/table/TableRow";

// import { getRoles, createRole, updateRole, deleteRole } from "../services/roles.service";

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import RoleViewCard from "../components/view/RoleViewCard";
// import EntityForm from "../components/form/EntityForm";

// export default function Roles() {
//   const [roles, setRoles] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [loadingId, setLoadingId] = useState(null); // for toggle loading

//   const fetchRoles = async () => {
//     const res = await getRoles();
//     setRoles(res.data.data || res);
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   // 🔥 STATUS TOGGLE FUNCTION
//   const handleStatusToggle = async (role) => {
//     try {
//       setLoadingId(role.id);
//       const payload = { ...role, status: !role.status };
//       await updateRole(role.id, payload);
//       fetchRoles();
//     } catch (err) {
//       console.log("Status update failed", err);
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const onSubmit = async (data) => {
//     const payload = { ...data, status: data.status === "Active" };
//     selectedRole
//       ? await updateRole(selectedRole.id, payload)
//       : await createRole(payload);

//     setMode("list");
//     fetchRoles();
//   };

//   // ================= LIST PAGE =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Roles" />
//           <ActionButtons showAdd addText="+ Add Roles" onAdd={() => setMode("form")} />
//         </div>

//         <Table header={<TableHeader columns={["Name", "Description", "Status", "Action"]} />}>
//           {roles?.map?.((r) => (
//             <TableRow
//               key={r.id}
//               row={r}
//               loading={loadingId === r.id}
//               onToggleStatus={() => handleStatusToggle(r)}
//               onView={() => {
//                 setSelectedRole(r);
//                 setMode("view");
//               }}
//               onEdit={() => {
//                 setSelectedRole(r);
//                 setMode("form");
//               }}
//               onDelete={() => deleteRole(r.id).then(fetchRoles)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW PAGE =================
//   if (mode === "view" && selectedRole) {
//     return (
//       <EntityPageLayout title="Role Details" showBack onBack={() => setMode("list")}>
//         <RoleViewCard role={selectedRole} />
//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM PAGE =================
//   return (
//     <EntityPageLayout title="Role Details" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedRole ? "Edit Role" : "Create Role"}
//         selectedItem={
//           selectedRole
//             ? { ...selectedRole, status: selectedRole.status ? "Active" : "Inactive" }
//             : null
//         }
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           { label: "Role Name", name: "name", required: true },
//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Inactive", value: "Inactive" },
//             ],
//           },
//           { label: "Description", name: "description", type: "textarea" },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }









import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import TableRow from "../components/table/TableRow";

import { getRoles, createRole, updateRole, deleteRole } from "../services/roles.service";

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import RoleViewCard from "../components/view/RoleViewCard";
import EntityForm from "../components/form/EntityForm";
import RolesRow from "../components/table/RolesRow";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchRoles = async () => {
    const res = await getRoles();
    setRoles(res.data.data || res);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // 🔥 SMOOTH OPTIMISTIC STATUS TOGGLE
  const handleStatusToggle = async (role) => {
    const newStatus = !role.status;

    // Instant UI update
    setRoles((prev) =>
      prev.map((r) =>
        r.id === role.id ? { ...r, status: newStatus } : r
      )
    );

    try {
      await updateRole(role.id, { ...role, status: newStatus });
    } catch (error) {
      console.log("Status update failed, reverting...", error);

      // revert if API fails
      setRoles((prev) =>
        prev.map((r) =>
          r.id === role.id ? { ...r, status: !newStatus } : r
        )
      );
    }
  };

  const onSubmit = async (data) => {
    const payload = { ...data, status: data.status === "Active" };

    selectedRole
      ? await updateRole(selectedRole.id, payload)
      : await createRole(payload);

    setMode("list");
    fetchRoles();
  };

  // ================= LIST PAGE =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Roles" />
          <ActionButtons showAdd addText="+ Add " onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Name", "Description", "Status", "Action"]} />}>
          {roles?.map?.((r,index) => (
            <RolesRow
              key={r.id}
              row={r}
              index={index}
              onToggleStatus={handleStatusToggle}
              onView={(role) => {
                setSelectedRole(role);
                setMode("view");
              }}
              onEdit={(role) => {
                setSelectedRole(role);
                setMode("form");
              }}
              onDelete={(id) => deleteRole(id).then(fetchRoles)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
  if (mode === "view" && selectedRole) {
    return (
      <EntityPageLayout title="Role Details" showBack onBack={() => setMode("list")}>
        <RoleViewCard role={selectedRole} />
      </EntityPageLayout>
    );
  }

  // ================= FORM PAGE =================
  return (
    <EntityPageLayout title="Role Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedRole ? "Edit Role" : "Create Role"}
        selectedItem={
          selectedRole
            ? { ...selectedRole, status: selectedRole.status ? "Active" : "Inactive" }
            : null
        }
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          { label: "Role Name", name: "name", required: true },
          {
            label: "Status",
            name: "status",
            type: "select",
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },
          { label: "Description", name: "description", type: "textarea" },
        ]}
      />
    </EntityPageLayout>
  );
}
