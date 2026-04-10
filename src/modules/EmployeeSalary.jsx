
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

// // 🔥 role hook
// import { useUser } from "../hooks/useUser";
// import { useOutletContext } from "react-router-dom";
// import { parseBackendErrors } from "../utils/parseBackendErrors";
// import LoadingSpinner from "../components/common/LoadingSpinner";

// export default function EmployeeSalary({ employeeFilterId, asSubcomponent }) {
//   const { setError, setSuccess } = useOutletContext();

//   const { employeeId, isHR } = useUser();

//   const [salaryData, setSalaryData] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(false);
//   // ================= FETCH SALARY =================
//   const fetchSalary = async (empList) => {
//     setLoading(true); // 🔥 START
//     try {
//       let res;

//       if (statusFilter === "all") {
//         res = await SalaryAPI.getAll();
//       } else {
//         res = await SalaryAPI.filter({ status: statusFilter }); // only true/false
//       }
//       console.log("Status Filter:", statusFilter);
//       let data = res.data?.data || res.data || [];

//       console.log("API DATA:", data);

//       if (!isHR) {
//         data = data.filter(s => Number(s.employee_id) === Number(employeeId));
//       }

//       if (employeeFilterId) {
//         data = data.filter(s => Number(s.employee_id) === Number(employeeFilterId));
//       }

//       const formatted = data.map((d) => {
//         const emp = empList.find((e) => e.id === d.employee_id);

//         return {
//           ...d,
//           employeeName: emp
//             ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
//             : d.employee_id,
//         };
//       });

//       setSalaryData(formatted);
//     } catch (err) {
//       setError(parseBackendErrors(err));
//     } finally {
//       setLoading(false); // 🔥 END
//     }
//   };

//   // ================= LOAD DATA =================
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const resEmp = await EmployeeAPI.getAll();
//         let empData = resEmp.data?.data || [];

//         // 🔒 non HR → only own employee in dropdown
//         if (!isHR) {
//           empData = empData.filter(e => e.id === employeeId);
//         }

//         setEmployees(empData);

//         await fetchSalary(empData);
//       } catch (err) {
//         setError(parseBackendErrors(err));
//       }
//     };

//     load();
//   }, [isHR, employeeId]);
//   useEffect(() => {
//     if (employees.length > 0) {
//       fetchSalary(employees);
//     }
//   }, [statusFilter]);
//   // ================= SEARCH =================
//   const filteredSalary = salaryData.filter(s =>
//     `${s.employeeName} ${s.basic_salary} ${s.gross_salary}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   // ================= SAVE =================
//   const onSubmit = async (data) => {
//     try {
//       data.employee_id = Number(data.employee_id);

//       if (selectedItem) {
//         const res = await SalaryAPI.update(selectedItem.id, data);
//         setSuccess(res.data?.message || "Saved successfully");
//       } else {
//         const res = await SalaryAPI.create(data);
//         setSuccess(res.data?.message || "Saved successfully");
//       }

//       setMode("list");
//       fetchSalary(employees);
//     } catch (err) {
//       setError(parseBackendErrors(err));
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     try {
//       const res = await SalaryAPI.delete(id);
//       setSuccess(res.data?.message || "Deleted successfully");
//       fetchSalary(employees);
//     } catch (err) {
//       setError(parseBackendErrors(err));
//     }
//   };

//   // ================= TABLE =================
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
//         <span className="font-semibold" style={{ color: themes.success }}>
//           {row.gross_salary}
//         </span>
//       ),
//     },
//     {
//       key: "effective_from",
//       render: (row) => formatDate(row.effective_from),
//     },
//   ];

//   const salaryFields = [
//     { key: "employeeName", label: "Employee" },
//     { key: "basic_salary", label: "Basic Salary" },
//     { key: "alloances", label: "Allowances" },
//     { key: "deductions", label: "Deductions" },
//     { key: "gross_salary", label: "Gross Salary" },
//     { key: "effective_from", label: "Effective From", format: formatDate },
//   ];

//   // ================= LIST =================
//   if (mode === "list") {
//     const listContent = (
//       <>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//           <SectionTitle title="EMPLOYEE SALARY" />
//           {/* <div className="flex gap-3 mb-6">
//             <button
//               onClick={() => setStatusFilter("all")}
//               className={`
//       px-6 py-2 rounded-lg font-medium transition-all duration-200
//       ${statusFilter === "all"
//                   ? "bg-[var(--primary)] text-white shadow-md"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
//     `}
//             >
//               All
//             </button>
//             <button
//               onClick={() => setStatusFilter("true")}
//               className={`
//       px-6 py-2 rounded-lg font-medium transition-all duration-200
//       ${statusFilter === "true"
//                   ? "bg-[var(--primary)] text-white shadow-md"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
//     `}
//             >
//               True
//             </button>
//             <button
//               onClick={() => setStatusFilter("false")}
//               className={`
//       px-6 py-2 rounded-lg font-medium transition-all duration-200
//       ${statusFilter === "false"
//                   ? "bg-[var(--primary)] text-white shadow-md"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
//     `}
//             >
//               False
//             </button>
//           </div> */}
//           <div className="flex gap-3 mb-6">
//             {["all", "true", "false"].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setStatusFilter(filter)}
//                 className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${statusFilter === filter ? "bg-[var(--primary)] text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>
//           <div className="flex flex-wrap gap-3 self-end ml-auto">
//             <SearchBar value={search} onChange={setSearch} placeholder="Search salary..." />

//             {isHR && (
//               <ActionButtons showAdd addText="+ Add" onAdd={() => {
//                 setSelectedItem(null);   // ⭐ IMPORTANT RESET
//                 setMode("form");
//               }} />
//             )}
//           </div>
//         </div>

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
//           {filteredSalary.map((s, index) => (
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
//         {loading && <LoadingSpinner text="Loading Employee Salary Details..." />}
//       </>
//     );

//     if (asSubcomponent) {
//       return <div className="w-full bg-white rounded-lg p-5 shadow-sm">{listContent}</div>;
//     }

//     return <PageContainer>{listContent}</PageContainer>;
//   }

//   // ================= VIEW =================
//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout
//         title="Salary Details"
//         showBack
//         onBack={() => setMode("list")}
//       >
//         <EntityViewCard
//           title="Salary Details"
//           data={selectedItem}
//           fields={salaryFields}
//           api={SalaryAPI}
//           onUpdated={() => fetchSalary(employees)}
//           onDeleted={() => fetchSalary(employees)}
//           headerKeys={["employeeName"]}
//         />
//       </EntityPageLayout>
//     );
//   }

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
//             disabled: !!employeeFilterId,
//             defaultValue: employeeFilterId || "",
//           },
//           { label: "Basic Salary", name: "basic_salary", type: "number", required: true },
//           { label: "Allowances", name: "alloances", type: "number", required: true },
//           { label: "Deductions", name: "deductions", type: "number", required: true },
//           // { label: "Gross Salary", name: "gross_salary", type: "number", required: true },
//           { label: "Effective From", name: "effective_from", type: "date", required: true },
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
import { useUser } from "../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function EmployeeSalary({ employeeFilterId, asSubcomponent }) {
  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();

  const [allSalaryData, setAllSalaryData] = useState([]); // 🔥 Store all data
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // ================= FETCH ALL SALARY =================
  const fetchAllSalary = async (empList) => {
    setLoading(true);
    try {
      const res = await SalaryAPI.getAll();
      let data = res.data?.data || res.data || [];

      if (!isHR) {
        data = data.filter(s => Number(s.employee_id) === Number(employeeId));
      }

      if (employeeFilterId) {
        data = data.filter(s => Number(s.employee_id) === Number(employeeFilterId));
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

      setAllSalaryData(formatted);
    } catch (err) {
      setError(parseBackendErrors(err));
    } finally {
      setLoading(false);
    }
  };

  // ================= APPLY FILTERS (Status + Search) =================
  const getFilteredData = () => {
    let filtered = [...allSalaryData];
    
    // 🔥 Apply status filter locally
    if (statusFilter === "true") {
      filtered = filtered.filter(item => item.status === 1 || item.status === true);
    } else if (statusFilter === "false") {
      filtered = filtered.filter(item => item.status === 0 || item.status === false);
    }
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(s =>
        `${s.employeeName} ${s.basic_salary} ${s.gross_salary}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }
    
    return filtered;
  };

  const salaryData = getFilteredData();

  // ================= TOGGLE STATUS =================
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 || currentStatus === true ? 0 : 1;
      
      const res = await SalaryAPI.update(id, { status: newStatus });
      setSuccess(res.data?.message || "Status updated successfully");
      
      // 🔥 Update local state
      setAllSalaryData(prevData =>
        prevData.map(item =>
          item.id === id
            ? { ...item, status: newStatus }
            : item
        )
      );
      
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

        if (!isHR) {
          empData = empData.filter(e => e.id === employeeId);
        }

        setEmployees(empData);
        await fetchAllSalary(empData);
      } catch (err) {
        setError(parseBackendErrors(err));
      }
    };

    load();
  }, [isHR, employeeId]);

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
      await fetchAllSalary(employees);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const res = await SalaryAPI.delete(id);
      setSuccess(res.data?.message || "Deleted successfully");
      await fetchAllSalary(employees);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  // ================= TABLE COLUMNS =================
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
    ...(isHR ? [{
      key: "status",
      render: (row) => {
        const isActive = row.status === 1 || row.status === true;
        return (
          <button
            onClick={() => handleToggleStatus(row.id, isActive)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive 
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200" 
                : "bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200"
            }`}
          >
            {isActive ? "✓ Active" : "✗ Inactive"}
          </button>
        );
      },
    }] : []),
  ];

  const salaryFields = [
    { key: "employeeName", label: "Employee" },
    { key: "basic_salary", label: "Basic Salary" },
    { key: "alloances", label: "Allowances" },
    { key: "deductions", label: "Deductions" },
    { key: "gross_salary", label: "Gross Salary" },
    { key: "effective_from", label: "Effective From", format: formatDate },
    ...(isHR ? [{ key: "status", label: "Status", format: (v) => v ? "Active" : "Inactive" }] : []),
  ];

  const tableHeaders = [
    "Employee",
    "Basic",
    "Allowances",
    "Deductions",
    "Gross",
    "Effective From",
    ...(isHR ? ["Status"] : []),
    "Action",
  ];

  // ================= LIST =================
  if (mode === "list") {
    const listContent = (
      <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <SectionTitle title="EMPLOYEE SALARY" />
          
          {/* 🔥 FILTER BUTTONS - Local filtering */}
          {isHR && (
            <div className="flex gap-3">
              {["all", "true", "false"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    console.log("Filter clicked:", filter);
                    setStatusFilter(filter);
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                    statusFilter === filter 
                      ? "bg-[var(--primary)] text-white shadow-md" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter === "all" ? "All" : filter === "true" ? "Active" : "Inactive"}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex flex-wrap gap-3 self-end ml-auto">
            <SearchBar value={search} onChange={setSearch} placeholder="Search salary..." />
            {isHR && (
              <ActionButtons showAdd addText="+ Add" onAdd={() => {
                setSelectedItem(null);
                setMode("form");
              }} />
            )}
          </div>
        </div>

        {/* Show record count */}
        <div className="mb-2 text-sm text-gray-500">
          Showing {salaryData.length} of {allSalaryData.length} records
        </div>

        <Table header={<TableHeader columns={tableHeaders} />}>
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
        {loading && <LoadingSpinner text="Loading Employee Salary Details..." />}
      </>
    );

    if (asSubcomponent) {
      return <div className="w-full bg-white rounded-lg p-5 shadow-sm">{listContent}</div>;
    }
    return <PageContainer>{listContent}</PageContainer>;
  }

  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
    return (
      <EntityPageLayout title="Salary Details" showBack onBack={() => setMode("list")}>
        <EntityViewCard
          title="Salary Details"
          data={selectedItem}
          fields={salaryFields}
          api={SalaryAPI}
          onUpdated={() => fetchAllSalary(employees)}
          onDeleted={() => fetchAllSalary(employees)}
          headerKeys={["employeeName"]}
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
            label: "Employee",
            name: "employee_id",
            type: "select",
            options: employees.map((e) => ({
              label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
            required: true,
            disabled: !!employeeFilterId,
            defaultValue: employeeFilterId || "",
          },
          { label: "Basic Salary", name: "basic_salary", type: "number", required: true },
          { label: "Allowances", name: "alloances", type: "number", required: true },
          { label: "Deductions", name: "deductions", type: "number", required: true },
          { label: "Effective From", name: "effective_from", type: "date", required: true },
          ...(isHR && selectedItem ? [{
            label: "Status",
            name: "status",
            type: "select",
            options: [
              { label: "Active", value: 1 },
              { label: "Inactive", value: 0 },
            ],
          }] : []),
        ]}
      />
    </EntityPageLayout>
  );
}