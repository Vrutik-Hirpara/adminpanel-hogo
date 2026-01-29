
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

  const fetchDepartments = async () => setDepartments((await getDepartments()).data.data);
  useEffect(() => { fetchDepartments(); }, []);

  const onSubmit = async (data) => {
    selectedDept
      ? await updateDepartment(selectedDept.id, data)
      : await createDepartment(data);
    setMode("list");
    fetchDepartments();
  };

  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Department" />
          <ActionButtons showAdd addText="+ Add Department" onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Name","Description","Status","Action"]} />}>
          {departments.map(d => (
            <TableRow
              key={d.id}
              row={d}
              onView={() => { setSelectedDept(d); setMode("view"); }}
              onEdit={() => { setSelectedDept(d); setMode("form"); }}
              onDelete={() => deleteDepartment(d.id).then(fetchDepartments)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  if (mode === "view" && selectedDept) {
    return (
      <EntityPageLayout title="Department Details" showBack onBack={() => setMode("list")}>
        <DepartmentViewCard department={selectedDept} />
      </EntityPageLayout>
    );
  }

  return (
    <EntityPageLayout title="Department Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedDept ? "Edit Department" : "Create Department"}
        selectedItem={selectedDept}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          { label: "Department Name", name: "name", required: true },
          { label: "Status", name: "status", type: "select", options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" }
          ]},
          { label: "Description", name: "description", type: "textarea" },
        ]}
      />
    </EntityPageLayout>
  );
}
