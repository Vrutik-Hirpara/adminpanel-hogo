
// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import EntityTableRow from "../components/table/EntityTableRow";
// import EntityViewCard from "../components/view/EntityViewCard";
// import { formatDate } from "../utils/dateFormatter";
// import { themes } from "../config/theme.config";

// import { SalaryAPI, EmployeeAPI } from "../services";
// import SearchBar from "../components/table/SearchBar";

// export default function EmployeeSalary() {
//   const [salaryData, setSalaryData] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);
// const [search, setSearch] = useState("");

//   // ================= FETCH SALARY =================
//   const fetchSalary = async (empList) => {
//     const res = await SalaryAPI.getAll();
//     const data = res.data?.data || [];

//     const formatted = data.map((d) => {
//       const emp = empList.find((e) => e.id === d.employee_id);

//       return {
//         ...d,
//         employeeName: emp
//           ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
//           : d.employee_id,
//       };
//     });

//     setSalaryData(formatted);
//   };

//   // ================= LOAD DATA =================
//   useEffect(() => {
//     const load = async () => {
//       const resEmp = await EmployeeAPI.getAll();
//       const empData = resEmp.data?.data || [];
//       setEmployees(empData);

//       await fetchSalary(empData);
//     };

//     load();
//   }, []);
// const filteredSalary = salaryData.filter(s =>
//   `${s.employeeName} ${s.basic_salary} ${s.gross_salary}`
//     .toLowerCase()
//     .includes(search.toLowerCase())
// );

//   // ================= SAVE =================
//   const onSubmit = async (data) => {
//     data.employee_id = Number(data.employee_id);

//     const exists = salaryData.find(
//       (s) =>
//         s.employee_id === data.employee_id &&
//         (!selectedItem || s.id !== selectedItem.id)
//     );

//     // if (!selectedItem && exists) {
//     //   alert("Salary already exists for this employee");
//     //   return;
//     // }

//     selectedItem
//       ? await SalaryAPI.update(selectedItem.id, data)
//       : await SalaryAPI.create(data);

//     setMode("list");
//     fetchSalary(employees);
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     await SalaryAPI.delete(id);
//     fetchSalary(employees);
//   };

//   const salaryColumns = [
//     {
//       key: "employeeName",
//       render: (row) => row.employeeName,
//     },
//     { key: "basic_salary" },
//     { key: "alloances" },
//     { key: "deductions" },
//     {
//       key: "gross_salary",
//       render: (row) => (
//         <span className="font-semibold "style={{ color: themes.success }}>{row.gross_salary}</span>
//       ),
//     },
// {
//   key: "effective_from",
//   render: (row) => formatDate(row.effective_from),
// },
//   ];
// const salaryFields = [
//   { key: "employeeName", label: "Employee" },
//   { key: "basic_salary", label: "Basic Salary" },
//   { key: "alloances", label: "Allowances" },
//   { key: "deductions", label: "Deductions" },
//   { key: "gross_salary", label: "Gross Salary" },
//   { key: "effective_from", label: "Effective From",format: formatDate  },
// ];

//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//      <div className="flex justify-between items-center mb-4">
//   <SectionTitle title="Employee Salary" />

//   <div className="flex gap-3">
//     <SearchBar value={search} onChange={setSearch} placeholder="Search salary..." />
//     <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//   </div>
// </div>


//         <Table
//           header={
//             <TableHeader
//               columns={[
//                 "Employee",
//                 "Basic",
//                 "Allowances",
//                 "Deductions",
//                 "Gross",
//                 "Effective From",
//                 "Action",
//               ]}
//             />
//           }
//         >
// {filteredSalary.map((s, index) => (
//             <EntityTableRow
//               key={s.id}
//               row={s}
//               index={index}
//               columns={salaryColumns}
//               onView={(r) => {
//                 setSelectedItem(r);
//                 setMode("view");
//               }}
//               onEdit={(r) => {
//                 setSelectedItem(r);
//                 setMode("form");
//               }}
//               onDelete={(id) => handleDelete(id)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
//  if (mode === "view" && selectedItem) {
//   return (
//     <EntityPageLayout
//       title="Salary Details"
//       showBack
//       onBack={() => setMode("list")}
//     >
//       <EntityViewCard
//         title="Salary Details"
//         data={selectedItem}
//         fields={salaryFields}
//         api={SalaryAPI}
//         onUpdated={() => fetchSalary(employees)}
//         onDeleted={() => fetchSalary(employees)}
//         headerKeys={["employeeName"]}   // ⭐ red header shows employee
//       />
//     </EntityPageLayout>
//   );
// }


//   // ================= FORM =================
//   return (
//     <EntityPageLayout
//       title="Employee Salary"
//       showBack
//       onBack={() => setMode("list")}
//     >
//       <EntityForm
//         title={selectedItem ? "Edit Salary" : "Create Salary"}
//         selectedItem={selectedItem}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           {
//             label: "Employee",
//             name: "employee_id",
//             type: "select",
//             options: employees.map((e) => ({
//               label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//             required: true,
//           },
//           { label: "Basic Salary", name: "basic_salary", type: "number",required: true, },
//           { label: "Allowances", name: "alloances", type: "number",required: true, },
//           { label: "Deductions", name: "deductions", type: "number",required: true, },
//           { label: "Gross Salary", name: "gross_salary", type: "number",required: true, },
//           { label: "Effective From", name: "effective_from", type: "date",required: true, },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }
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
import { formatDate } from "../utils/dateFormatter";
import { themes } from "../config/theme.config";

import { SalaryAPI, EmployeeAPI } from "../services";
import SearchBar from "../components/table/SearchBar";

// 🔥 role hook
import { useUser } from "../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";

export default function EmployeeSalary() {
  const { setError, setSuccess } = useOutletContext();

  const { employeeId, isHR } = useUser();

  const [salaryData, setSalaryData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  // ================= FETCH SALARY =================
  const fetchSalary = async (empList) => {
    try {
      const res = await SalaryAPI.getAll();
      let data = res.data?.data || [];

      // 🔒 non HR → only own salary
      if (!isHR) {
        data = data.filter(s => Number(s.employee_id) === Number(employeeId));
      }

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
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    const load = async () => {
      try {
        const resEmp = await EmployeeAPI.getAll();
        let empData = resEmp.data?.data || [];

        // 🔒 non HR → only own employee in dropdown
        if (!isHR) {
          empData = empData.filter(e => e.id === employeeId);
        }

        setEmployees(empData);

        await fetchSalary(empData);
      } catch (err) {
        setError(parseBackendErrors(err));
      }
    };

    load();
  }, [isHR, employeeId]);

  // ================= SEARCH =================
  const filteredSalary = salaryData.filter(s =>
    `${s.employeeName} ${s.basic_salary} ${s.gross_salary}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= SAVE =================
  const onSubmit = async (data) => {
    try {
      data.employee_id = Number(data.employee_id);

      if (selectedItem) {
        const res = await SalaryAPI.update(selectedItem.id, data);
        setSuccess(res.data?.message || "Saved successfully");
      } else {
        const res = await SalaryAPI.create(data);
        setSuccess(res.data?.message || "Saved successfully");
      }

      setMode("list");
      fetchSalary(employees);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const res = await SalaryAPI.delete(id);
      setSuccess(res.data?.message || "Deleted successfully");
      fetchSalary(employees);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  // ================= TABLE =================
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
        <span className="font-semibold" style={{ color: themes.success }}>
          {row.gross_salary}
        </span>
      ),
    },
    {
      key: "effective_from",
      render: (row) => formatDate(row.effective_from),
    },
  ];

  const salaryFields = [
    { key: "employeeName", label: "Employee" },
    { key: "basic_salary", label: "Basic Salary" },
    { key: "alloances", label: "Allowances" },
    { key: "deductions", label: "Deductions" },
    { key: "gross_salary", label: "Gross Salary" },
    { key: "effective_from", label: "Effective From", format: formatDate },
  ];

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <SectionTitle title="Employee Salary" />

          <div className="flex flex-wrap gap-3 self-end">
            <SearchBar value={search} onChange={setSearch} placeholder="Search salary..." />

            {isHR &&(
            <ActionButtons showAdd addText="+ Add" onAdd={() => {
              setSelectedItem(null);   // ⭐ IMPORTANT RESET
              setMode("form");
            }} />
          )}
          </div>
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
          {filteredSalary.map((s, index) => (
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
          headerKeys={["employeeName"]}
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
          { label: "Basic Salary", name: "basic_salary", type: "number", required: true },
          { label: "Allowances", name: "alloances", type: "number", required: true },
          { label: "Deductions", name: "deductions", type: "number", required: true },
          // { label: "Gross Salary", name: "gross_salary", type: "number", required: true },
          { label: "Effective From", name: "effective_from", type: "date", required: true },
        ]}
      />
    </EntityPageLayout>
  );
}