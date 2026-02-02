import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import EmployeeSalaryRow from "../components/table/EmployeeSalaryRow";
import EmployeeSalaryViewCard from "../components/view/EmployeeSalaryViewCard";

import { getEmployees } from "../services/employee.service";
import axios from "axios";

const SALARY_API = "https://hogofilm.pythonanywhere.com/employee-salary/";

export default function EmployeeSalary() {
  const [salaryData, setSalaryData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchSalary = async () => {
    const res = await axios.get(SALARY_API);
    setSalaryData(res.data.data || []);
  };

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data.data || []);
  };

  useEffect(() => {
    fetchSalary();
    fetchEmployees();
  }, []);

  const onSubmit = async (data) => {
    data.employee_id = Number(data.employee_id);

    const exists = salaryData.find(s => s.employee_id === data.employee_id);

    if (!selectedItem && exists) {
      alert("Salary already exists for this employee");
      return;
    }

    selectedItem
      ? await axios.patch(`${SALARY_API}${selectedItem.id}/`, data)
      : await axios.post(SALARY_API, data);

    setMode("list");
    fetchSalary();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${SALARY_API}${id}/`);
    fetchSalary();
  };

  // LIST
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employee Salary" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Employee","Basic","Allowances","Deductions","Gross","Effective From","Action"]} />}>
          {salaryData.map(s => {
            const emp = employees.find(e => e.id === s.employee_id);

            return (
              <EmployeeSalaryRow
                key={s.id}
                row={s}
employeeName={
  emp
    ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
    : "—"
}
                onView={(r) => { setSelectedItem(r); setMode("view"); }}
                onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
                onDelete={(id) => handleDelete(id)}
              />
            );
          })}
        </Table>
      </PageContainer>
    );
  }

  // VIEW
  if (mode === "view" && selectedItem) {
    const emp = employees.find(e => e.id === selectedItem.employee_id);

    return (
      <EntityPageLayout title="Salary Details" showBack onBack={() => setMode("list")}>
        <EmployeeSalaryViewCard
          salary={selectedItem}
employeeName={
  emp
    ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
    : "Employee"
}
        />
      </EntityPageLayout>
    );
  }

  // FORM
  return (
    <EntityPageLayout title="Employee Salary" showBack onBack={() => setMode("list")}>
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
            options: employees.map(e => ({
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
