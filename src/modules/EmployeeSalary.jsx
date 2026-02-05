
import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import EntityTableRow from "../components/table/EntityTableRow";
import EmployeeSalaryViewCard from "../components/view/EmployeeSalaryViewCard";

import { SalaryAPI } from "../services/apiService";

export default function EmployeeSalary() {
  const [salaryData, setSalaryData] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // const fetchSalary = async () => {
  //   const res = await SalaryAPI.getAll();
  //   setSalaryData(res.data?.data || []);
  // };
  const fetchSalary = async () => {
    const res = await SalaryAPI.getAll();
    const data = res.data?.data || [];

    const formatted = data.map(d => ({
      ...d,
      employeeName: d.employee_name,  // backend field
    }));

    setSalaryData(formatted);
  };


  useEffect(() => {
    fetchSalary();
  }, []);

  const onSubmit = async (data) => {
    data.employee_id = Number(data.employee_id);

    const exists = salaryData.find(s => s.employee_id === data.employee_id);

    if (!selectedItem && exists) {
      alert("Salary already exists for this employee");
      return;
    }

    selectedItem
      ? await SalaryAPI.update(selectedItem.id, data)
      : await SalaryAPI.create(data);

    setMode("list");
    fetchSalary();
  };

  const handleDelete = async (id) => {
    await SalaryAPI.delete(id);
    fetchSalary();
  };
  const salaryColumns = [
    {
      key: "employeeName",
      render: (row) => row.employeeName,
    },
    { key: "basic_salary" },
    { key: "alloances" },
    { key: "deductions" },
    {
      key: "gross_salary",
      render: (row) => (
        <span className="font-semibold text-green-600">
          {row.gross_salary}
        </span>
      ),
    },
    { key: "effective_from" },
  ];

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employee Salary" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Employee ID", "Basic", "Allowances", "Deductions", "Gross", "Effective From", "Action"]} />}>
          {salaryData.map((s, index) => (
            <EntityTableRow
              key={s.id}
              row={s}
              index={index}
              columns={salaryColumns}
              onView={(r) => {
                setSelectedSalary(r);
                setMode("view");
              }}
              onEdit={(r) => {
                setSelectedSalary(r);
                setMode("form");
              }}
              onDelete={(id) => SalaryAPI.delete(id).then(fetchSalary)}
            />
          ))}

        </Table>
      </PageContainer>
    );
  }

  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
    return (
      <EntityPageLayout title="Salary Details" showBack onBack={() => setMode("list")}>
        <EmployeeSalaryViewCard
          salary={selectedItem}
          employeeName={selectedItem.employee_id}
        />
      </EntityPageLayout>
    );
  }

  // ================= FORM =================
  return (
    <EntityPageLayout title="Employee Salary" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Salary" : "Create Salary"}
        selectedItem={selectedItem}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Employee ID",
            name: "employee_id",
            type: "select",
            options: salaryData.map(s => ({
              label: s.employee_id,
              value: s.employee_id,
            })),
            required: true,
          },
          { label: "Basic Salary", name: "basic_salary", type: "number" },
          { label: "Allowances", name: "alloances", type: "number" },
          { label: "Deductions", name: "deductions", type: "number" },
          { label: "Gross Salary", name: "gross_salary", type: "number" },
          { label: "Effective From", name: "effective_from", type: "date" },
        ]}
      />
    </EntityPageLayout>
  );
}
