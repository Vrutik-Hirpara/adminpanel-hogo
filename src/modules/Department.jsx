import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import TableRow from "../components/table/TableRow";

import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../services/department.service";

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import DepartmentViewCard from "../components/view/DepartmentViewCard";
import EntityForm from "../components/form/EntityForm";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedDept, setSelectedDept] = useState(null);

  // ✅ FETCH + convert "Active/Inactive" → boolean
  const fetchDepartments = async () => {
    const res = await getDepartments();
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
      await updateDepartment(dept.id, {
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
    await updateDepartment(selectedDept.id, payload);
  } else {
    await createDepartment(payload);
  }

  setMode("list");
  fetchDepartments();
};


  // ================= LIST PAGE =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Department" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Name","Description","Status","Action"]} />}>
          {departments.map(d => (
            <TableRow
              key={d.id}
              row={d}
              onToggleStatus={handleStatusToggle}   // 🔥 CLICK STATUS FROM LIST
              onView={() => { setSelectedDept(d); setMode("view"); }}
              onEdit={() => { setSelectedDept(d); setMode("form"); }}
              onDelete={() => deleteDepartment(d.id).then(fetchDepartments)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
  if (mode === "view" && selectedDept) {
    return (
      <EntityPageLayout title="Department Details" showBack onBack={() => setMode("list")}>
        <DepartmentViewCard department={selectedDept} />
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
