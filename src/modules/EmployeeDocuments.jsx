
import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import EntityTableRow from "../components/table/EntityTableRow";
import EntityViewCard from "../components/view/EntityViewCard";

import { EmployeeAPI, EmployeeDocsAPI } from "../services";

export default function EmployeeDocuments() {
  const [documents, setDocuments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // ================= FETCH DOCUMENTS =================
  const fetchDocuments = async (empList) => {
    const res = await EmployeeDocsAPI.getAll();
    const data = res.data?.data || [];

    const formatted = data.map(d => {
      const emp = empList.find(e => e.id === d.employee_id);

      return {
        ...d,
        employeeName: emp
          ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
          : d.employee_id,
      };
    });

    setDocuments(formatted);
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    const load = async () => {
      const resEmp = await EmployeeAPI.getAll();
      const empData = resEmp.data?.data || [];
      setEmployees(empData);

      await fetchDocuments(empData);
    };

    load();
  }, []);

  // ================= SAVE =================
  const onSubmit = async (data) => {
    try {
      const empIdNum = Number(data.employee_id);

      const alreadyExists = documents.some(doc => {
        if (selectedItem && doc.id === selectedItem.id) return false;
        return Number(doc.employee_id) === empIdNum;
      });

      if (alreadyExists) {
        alert("Documents already exist for this employee!");
        return;
      }

      const formData = new FormData();

      Object.keys(data).forEach(key => {
        const value = data[key];
        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else if (value !== "" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      selectedItem
        ? await EmployeeDocsAPI.update(selectedItem.id, formData)
        : await EmployeeDocsAPI.create(formData);

      alert("Saved successfully");
      setMode("list");
      fetchDocuments(employees);

    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err.message);
      alert("Save failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await EmployeeDocsAPI.delete(id);
    fetchDocuments(employees);
  };

  const documentColumns = [
    {
      key: "employeeName",
      render: (row) => row.employeeName,
    },
    { key: "pancard_number" },
    { key: "aadhar_number" },
    { key: "driving_license_number" },
    {
      key: "uploaded_at",
      render: (row) => row.uploaded_at?.slice(0, 10),
    },
  ];
  const documentFields = [
    { key: "employeeName", label: "Employee" },
    { key: "pancard_number", label: "PAN Number" },
    { key: "aadhar_number", label: "Aadhar Number" },
    { key: "driving_license_number", label: "Driving License Number" },

    { key: "photo", label: "Photo" },
    { key: "aadhar_front", label: "Aadhar Front" },
    { key: "aadhar_back", label: "Aadhar Back" },
    { key: "pan_card", label: "PAN Card" },
    { key: "driving_license_front", label: "DL Front" },
    { key: "driving_license_back", label: "DL Back" },

    { key: "uploaded_at", label: "Uploaded At", format: (v) => v?.slice(0, 10) },
  ];


  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employee Documents" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
        </div>

        <Table header={<TableHeader columns={["Employee", "PAN", "Aadhar", "DL", "Uploaded", "Action"]} />}>
          {documents.map((doc, index) => (
            <EntityTableRow
              key={doc.id}
              row={doc}
              index={index}
              columns={documentColumns}
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
    return (
      <EntityPageLayout
        title="Employee Documents"
        showBack
        onBack={() => setMode("list")}
      >
      <EntityViewCard
  title="Employee Documents"
  data={selectedItem}
  fields={documentFields}
  api={EmployeeDocsAPI}
  onUpdated={() => fetchDocuments(employees)}
  onDeleted={() => fetchDocuments(employees)}
  headerKeys={["employeeName"]}
/>


      </EntityPageLayout>
    );
  }

  // ================= FORM =================
  return (
    <EntityPageLayout title="Employee Documents" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Documents" : "Upload Documents"}
        selectedItem={selectedItem}
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
          { label: "PAN Number", name: "pancard_number" },
          { label: "Aadhar Number", name: "aadhar_number" },
          { label: "Driving License Number", name: "driving_license_number" },
          { label: "Photo", name: "photo", type: "file" },
          { label: "Aadhar Front", name: "aadhar_front", type: "file" },
          { label: "Aadhar Back", name: "aadhar_back", type: "file" },
          { label: "PAN Card", name: "pan_card", type: "file" },
          { label: "DL Front", name: "driving_license_front", type: "file" },
          { label: "DL Back", name: "driving_license_back", type: "file" },
        ]}
      />
    </EntityPageLayout>
  );
}
