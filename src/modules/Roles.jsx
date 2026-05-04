

import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import { RolesAPI } from "../services";

import { themes } from "../config/theme.config";
import { parseBackendErrors, parseBackendResponse } from "../utils/parseBackendErrors";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityViewCard from "../components/view/EntityViewCard";
import EntityForm from "../components/form/EntityForm";
import EntityTableRow from "../components/table/EntityTableRow";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Roles() {
  const { setError, setSuccess } = useOutletContext();
  const [roles, setRoles] = useState([]);

  const [mode, setMode] = useState("list");
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchRoles = async () => {
    setLoading(true); // 🔥 START
    try {
      const res = await RolesAPI.getAll();
      setRoles(res.data.data || res);
    }
    catch (error) {
      setError(parseBackendErrors(error));
    } finally {
      setLoading(false); // 🔥 END
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // 🔥 SMOOTH OPTIMISTIC STATUS TOGGLE
  // const handleStatusToggle = async (role) => {
  //   const newStatus = !role.status;

  //   // Instant UI update
  //   setRoles((prev) =>
  //     prev.map((r) =>
  //       r.id === role.id ? { ...r, status: newStatus } : r
  //     )
  //   );

  //   try {
  //     await RolesAPI.update(role.id, { ...role, status: newStatus });
  //     setSuccess(res.data?.message || "Status updated");

  //   } catch (error) {
  //     setError(parseBackendErrors(error));

  //     console.log("Status update failed, reverting...", error);

  //     // revert if API fails
  //     setRoles((prev) =>
  //       prev.map((r) =>
  //         r.id === role.id ? { ...r, status: !newStatus } : r
  //       )
  //     );
  //   }
  // };
  const handleStatusToggle = async (role) => {
    const newStatus = !role.status;
   setRoles((prev) =>
      prev.map((r) =>
        r.id === role.id ? { ...r, status: newStatus } : r
      )
    );
    try {
      const response = await RolesAPI.update(role.id, { ...role, status: newStatus });
      setSuccess(response.data?.message || "Status updated successfully");
      fetchRoles();
    } catch (error) {
      setError(parseBackendErrors(error));
        console.log("Status update failed, reverting...", error);
      // revert if API fails
      setRoles((prev) =>
        prev.map((r) =>
          r.id === role.id ? { ...r, status: !newStatus } : r
        )
      );
    }
  };
  // const onSubmit = async (data) => {
  //   const payload = { ...data, status: data.status === "Active" };

  //   selectedRole
  //     ? await RolesAPI.update(selectedRole.id, payload)
  //     : await RolesAPI.create(payload);

  //   setMode("list");
  //   fetchRoles();
  // };
  const onSubmit = async (data) => {
    const payload = { ...data, status: data.status === "Active" };

    try {
      let res;

      if (selectedRole) {
        res = await RolesAPI.update(selectedRole.id, payload);
      } else {
        res = await RolesAPI.create(payload);
      }

      setSuccess(res.data?.message || "Saved successfully");
      setMode("list");
      fetchRoles();
    } catch (error) {
      setError(parseBackendErrors(error));
    }
  };
  const roleColumns = [
    { key: "name" },
    {
      key: "description",
      render: (row) => row.description || "-",
    },
    {
      key: "status",
      render: (row) => (
        <button
                   onClick={() => handleStatusToggle(row)}

          className="relative w-12 h-6 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: row.status ? themes.toggleOn : themes.toggleOff,
          }}

        >
          <span
            className={`absolute top-1 left-1 w-4 h-4  rounded-full shadow transform transition-transform duration-300 ${row.status ? "translate-x-6" : ""
              }`} style={{ backgroundColor: themes.textWhite }}

          />
        </button>
      ),
    },
  ];
  const roleFields = [
    { key: "name", label: "Role Name" },
    { key: "description", label: "Description" },
    {
      key: "status",
      label: "Status",
      format: (v) => (v ? "Active" : "Inactive"),
    }
  ];

  // ================= LIST PAGE =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <SectionTitle title="Roles" />
          <ActionButtons showAdd addText="+ Add " onAdd={() => {
            setSelectedRole(null);   // ⭐ IMPORTANT RESET
            setMode("form");
          }} />
        </div>

        <Table header={<TableHeader columns={["Name", "Description", "Status", "Action"]} />}>
          {roles?.map?.((r, index) => (
            <EntityTableRow
              key={r.id}
              row={r}
              rowNumber={index + 1} 
              columns={roleColumns}
              onView={(role) => {
                setSelectedRole(role);
                setMode("view");
              }}
              onEdit={(role) => {
                setSelectedRole(role);
                setMode("form");
              }}
              // onDelete={(id) => RolesAPI.delete(id).then(fetchRoles)}
              onDelete={async (id) => {
                try {
                  const res = await RolesAPI.delete(id);
                  setSuccess(res.data?.message || "Deleted successfully");
                  fetchRoles();
                } catch (error) {
                  setError(parseBackendErrors(error));
                }
              }}
            />
          ))}

        </Table>
        {loading && <LoadingSpinner text="Loading Roles Details..." />}

      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
  if (mode === "view" && selectedRole) {
    return (
      <EntityPageLayout
        title="Role Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="Role"
          data={selectedRole}
          fields={roleFields}
          api={RolesAPI}
         onUpdated={fetchRoles}
          onDeleted={fetchRoles}
          headerKeys={["name"]}   // ⭐ Dynamic red header
        />
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
