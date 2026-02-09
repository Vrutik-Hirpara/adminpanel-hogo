
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

import { SalaryAPI, EmployeeAPI } from "../services";

export default function EmployeeSalary() {
  const [salaryData, setSalaryData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // ================= FETCH SALARY =================
  const fetchSalary = async (empList) => {
    const res = await SalaryAPI.getAll();
    const data = res.data?.data || [];

    const formatted = data.map((d) => {
      const emp = empList.find((e) => e.id === d.employee_id);

      return {
        ...d,
        employeeName: emp
          ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
          : d.employee_id,
      };
    });

    setSalaryData(formatted);
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    const load = async () => {
      const resEmp = await EmployeeAPI.getAll();
      const empData = resEmp.data?.data || [];
      setEmployees(empData);

      await fetchSalary(empData);
    };

    load();
  }, []);

  // ================= SAVE =================
  const onSubmit = async (data) => {
    data.employee_id = Number(data.employee_id);

    const exists = salaryData.find(
      (s) =>
        s.employee_id === data.employee_id &&
        (!selectedItem || s.id !== selectedItem.id)
    );

    if (!selectedItem && exists) {
      alert("Salary already exists for this employee");
      return;
    }

    selectedItem
      ? await SalaryAPI.update(selectedItem.id, data)
      : await SalaryAPI.create(data);

    setMode("list");
    fetchSalary(employees);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await SalaryAPI.delete(id);
    fetchSalary(employees);
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
        <span className="font-semibold text-green-600">{row.gross_salary}</span>
      ),
    },
    { key: "effective_from" },
  ];
const salaryFields = [
  { key: "employeeName", label: "Employee" },
  { key: "basic_salary", label: "Basic Salary" },
  { key: "alloances", label: "Allowances" },
  { key: "deductions", label: "Deductions" },
  { key: "gross_salary", label: "Gross Salary" },
  { key: "effective_from", label: "Effective From" },
];

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employee Salary" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table
          header={
            <TableHeader
              columns={[
                "Employee",
                "Basic",
                "Allowances",
                "Deductions",
                "Gross",
                "Effective From",
                "Action",
              ]}
            />
          }
        >
          {salaryData.map((s, index) => (
            <EntityTableRow
              key={s.id}
              row={s}
              index={index}
              columns={salaryColumns}
              onView={(r) => {
                setSelectedItem(r);
                setMode("view");
              }}
              onEdit={(r) => {
                setSelectedItem(r);
                setMode("form");
              }}
              onDelete={(id) => handleDelete(id)}
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
      title="Salary Details"
      showBack
      onBack={() => setMode("list")}
    >
      <EntityViewCard
        title="Salary Details"
        data={selectedItem}
        fields={salaryFields}
        api={SalaryAPI}
        onUpdated={() => fetchSalary(employees)}
        onDeleted={() => fetchSalary(employees)}
        headerKeys={["employeeName"]}   // ⭐ red header shows employee
      />
    </EntityPageLayout>
  );
}


  // ================= FORM =================
  return (
    <EntityPageLayout
      title="Employee Salary"
      showBack
      onBack={() => setMode("list")}
    >
      <EntityForm
        title={selectedItem ? "Edit Salary" : "Create Salary"}
        selectedItem={selectedItem}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            options: employees.map((e) => ({
              label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
              value: e.id,
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
