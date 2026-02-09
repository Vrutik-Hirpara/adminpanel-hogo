import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";

import TableHeader from "../components/table/TableHeader";

import { DepartmentAPI } from "../services";

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
// import DepartmentViewCard from "../components/view/DepartmentViewCard";
import EntityViewCard from "../components/view/EntityViewCard";

import EntityTableRow from "../components/table/EntityTableRow";
import EntityForm from "../components/form/EntityForm";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedDept, setSelectedDept] = useState(null);

  // ✅ FETCH + convert "Active/Inactive" → boolean
  const fetchDepartments = async () => {
    const res = await DepartmentAPI.getAll();
    const data = res.data?.data || [];

    const formatted = data.map(d => ({
      ...d,
      status: d.status === "Active"
    }));

    setDepartments(formatted);
  };

  useEffect(() => { fetchDepartments(); }, []);

  // 🔥 SAME TOGGLE SYSTEM AS ROLES
  const handleStatusToggle = async (dept) => {
    const newStatus = !dept.status;

    // instant UI update
    setDepartments(prev =>
      prev.map(d => d.id === dept.id ? { ...d, status: newStatus } : d)
    );

    try {
      await DepartmentAPI.update(dept.id, {
        ...dept,
        status: newStatus ? "Active" : "Inactive" // boolean → string for API
      });
    } catch (error) {
      // revert if API fails
      setDepartments(prev =>
        prev.map(d => d.id === dept.id ? { ...d, status: !newStatus } : d)
      );
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      status:
        typeof data.status === "boolean"
          ? data.status
            ? "Active"
            : "Inactive"
          : data.status,
    };

    if (selectedDept) {
      await DepartmentAPI.update(selectedDept.id, payload);
    } else {
      await DepartmentAPI.create(payload);
    }

    setMode("list");
    fetchDepartments();
  };

  const departmentColumns = [
    { key: "name" },
    { key: "description" },
    {
      key: "status",
      render: (row) => (
        <button
          onClick={() => handleStatusToggle(row)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${row.status ? "bg-green-500" : "bg-gray-300"
            }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${row.status ? "translate-x-6" : ""
              }`}
          />
        </button>
      ),
    },
  ];
  const departmentFields = [
    { key: "name", label: "Department Name" },
    { key: "description", label: "Description" },
    {
      key: "status",
      label: "Status",
      format: (val) => (val ? "Active" : "Inactive"),
    },
    { key: "created_at", label: "Created at" },

  ];

  // ================= LIST PAGE =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Department" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Name", "Description", "Status", "Action"]} />}>
          {departments.map((dept, index) => (
            <EntityTableRow
              key={dept.id}
              row={dept}
              index={index}
              columns={departmentColumns}
              onView={(r) => {
                setSelectedDept(r);
                setMode("view");
              }}
              onEdit={(r) => {
                setSelectedDept(r);
                setMode("form");
              }}
              onDelete={(id) => DepartmentAPI.delete(id).then(fetchDepartments)}
            />
          ))}


        </Table>

      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
  if (mode === "view" && selectedDept) {
    return (
      <EntityPageLayout
        title="Department Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="Department"
          data={selectedDept}
          fields={departmentFields}
          api={DepartmentAPI}
          onUpdated={fetchDepartments}
          onDeleted={fetchDepartments}
          headerKeys={["name"]}   // ⭐ REQUIRED for red header

        />
      </EntityPageLayout>
    );
  }


  // ================= FORM PAGE =================
  return (
    <EntityPageLayout title="Department Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedDept ? "Edit Department" : "Create Department"}
        selectedItem={
          selectedDept
            ? { ...selectedDept, status: selectedDept.status ? "Active" : "Inactive" }
            : null
        }
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          { label: "Department Name", name: "name", required: true },
          {
            label: "Status",
            name: "status",
            type: "select",
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" }
            ]
          },
          { label: "Description", name: "description", type: "textarea" },
        ]}
      />
    </EntityPageLayout>
  );
}
