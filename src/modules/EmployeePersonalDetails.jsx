
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

import { EmployeeAPI,EmployeePersonalAPI } from "../services";
import SearchBar from "../components/table/SearchBar";

// import {  } from "../services";

export default function EmployeePersonalDetails() {
  const [details, setDetails] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
const [search, setSearch] = useState("");



const fetchDetails = async () => {
  const res = await EmployeePersonalAPI.getAll();
  const data = res.data?.data || [];

  const formatted = data.map(d => {
    const emp = employees.find(e => e.id === d.employee_id);

    return {
      ...d,
      employeeName: emp
        ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
        : "—",
    };
  });

  setDetails(formatted);
};

  const fetchEmployees = async () => {
    const res = await EmployeeAPI.getAll();
    setEmployees(res.data.data || []);
  };


useEffect(() => {
  const load = async () => {
    const resEmp = await EmployeeAPI.getAll();
    const empData = resEmp.data.data || [];
    setEmployees(empData);
  };

  load();
}, []);
useEffect(() => {
  if (employees.length > 0) {
    fetchDetails();
  }
}, [employees]);
const filteredDetails = details.filter(d =>
  `${d.employeeName} ${d.father_name} ${d.mother_name} ${d.emergency_contact_phone}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

  // ================= SAVE =================
  const onSubmit = async (data) => {
    try {
      const payload = { ...data, employee_id: Number(data.employee_id), marital_status: data.marital_status?.toLowerCase(), };

      // 🔥 UNIQUE CHECK
      const exists = details.find(
        d =>
          d.employee_id === payload.employee_id &&
          (!selectedItem || d.id !== selectedItem.id)
      );

      if (exists) {
        alert("This employee already has personal details!");
        return;
      }

      if (selectedItem) {
        await EmployeePersonalAPI.update(selectedItem.id, payload);
      } else {
        await EmployeePersonalAPI.create(payload);
      }

      alert("Saved successfully");
      setMode("list");
      fetchDetails();

    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err.message);
      alert("Save failed — check console");
    }
  };


  // ================= DELETE =================
  const handleDelete = async (id) => {
    await EmployeePersonalAPI.delete(id);
    fetchDetails();
  };
  const personalColumns = [
    {
      key: "employeeName",
      render: (row) => row.employeeName,   // we inject this while mapping
    },
    { key: "father_name" },
    { key: "mother_name" },
    { key: "marital_status" },
    { key: "emergency_contact_phone" },
  ];
const personalFields = [
  { key: "employeeName", label: "Employee" },
  { key: "father_name", label: "Father Name" },
  { key: "mother_name", label: "Mother Name" },
  { key: "marital_status", label: "Marital Status" },
  { key: "spouse_name", label: "Spouse Name" },
  { key: "address", label: "Address" },
  { key: "emergency_contact_name", label: "Emergency Contact Name" },
  { key: "emergency_contact_phone", label: "Emergency Contact Phone" },
];

  // ================= LIST PAGE =================
  if (mode === "list") {
    return (
      <PageContainer>
       <div className="flex justify-between items-center mb-4">
  <SectionTitle title="Employee Personal Details" />

  <div className="flex gap-3">
    <SearchBar value={search} onChange={setSearch} placeholder="Search details..." />
    <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
  </div>
</div>


        <Table
          header={
            <TableHeader
              columns={[
                "Employee",
                "Father Name",
                "Mother Name",
                "Marital Status",
                "Emergency Contact",
                "Action",
              ]}
            />
          }
        >
{filteredDetails.map((d, index) => (
            <EntityTableRow
              key={d.id}
              row={d}
              index={index}
              columns={personalColumns}
              onView={(r) => {
                setSelectedItem(r);
                setMode("view");
              }}
              onEdit={(r) => {
                setSelectedItem(r);
                setMode("form");
              }}
              onDelete={(id) =>
                EmployeePersonalAPI.delete(id).then(fetchDetails)
              }
            />
          ))}

        </Table>
      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
if (mode === "view" && selectedItem) {
  return (
    <EntityPageLayout
      title="Personal Details"
      showBack
      onBack={() => setMode("list")}
    >
      <EntityViewCard
        title="Personal Details"
        data={selectedItem}
        fields={personalFields}
        api={EmployeePersonalAPI}
        onUpdated={fetchDetails}
        onDeleted={fetchDetails}
        headerKeys={["employeeName"]}   // ⭐ red header shows employee
      />
    </EntityPageLayout>
  );
}


  // ================= FORM PAGE =================
  return (
    <EntityPageLayout title="Employee Personal Dfetails" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Personal Details" : "Create Personal Details"}
        selectedItem={
          selectedItem
            ? {
              ...selectedItem,
              marital_status:
                (selectedItem.marital_status ||
                  selectedItem.maritalStatus ||
                  "")
                  .toString()
                  .trim()
                  .toLowerCase() === "married"
                  ? "married"
                  : (selectedItem.marital_status ||
                    selectedItem.maritalStatus ||
                    "")
                    .toString()
                    .trim()
                    .toLowerCase() === "single"
                    ? "single"
                    : "",

            }
            : null
        }
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            options: employees.map(e => ({
              label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
            required: true,
          },
          { label: "Father Name", name: "father_name" },
          { label: "Mother Name", name: "mother_name" },
          {
            label: "Marital Status",
            name: "marital_status",
            type: "select",
            required:true,
            options: [
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
            ],
          },
          { label: "Spouse Name", name: "spouse_name" },
          { label: "Address", name: "address", type: "textarea" },
          { label: "Emergency Contact Name", name: "emergency_contact_name" },
          { label: "Emergency Contact Phone", name: "emergency_contact_phone" },
        ]}
      />
    </EntityPageLayout>
  );
}
