
// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import SectionTitle from "../components/form/SectionTitle";
// import ActionButtons from "../components/form/ActionButton";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityViewCard from "../components/view/EntityViewCard";
// import EntityForm from "../components/form/EntityForm";
// import TableActions from "../components/table/TableActions";
// import { themes } from "../config/theme.config";
// import api from "../services/api";
// import { useUser } from "../hooks/useUser";

// export default function SalaryPayout() {
//   const { employeeId, isHR } = useUser();
//   const [salaryData, setSalaryData] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedSalary, setSelectedSalary] = useState(null);
//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   // Month options
//   const months = [
//     { value: 1, label: "January" },
//     { value: 2, label: "February" },
//     { value: 3, label: "March" },
//     { value: 4, label: "April" },
//     { value: 5, label: "May" },
//     { value: 6, label: "June" },
//     { value: 7, label: "July" },
//     { value: 8, label: "August" },
//     { value: 9, label: "September" },
//     { value: 10, label: "October" },
//     { value: 11, label: "November" },
//     { value: 12, label: "December" },
//   ];

//   // Year options
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let i = currentYear - 5; i <= currentYear + 2; i++) {
//     years.push({ value: i, label: i.toString() });
//   }

//   // Fetch salary data
//   const fetchSalaryData = async () => {
//     try {
//       let url = "salary-payment/";
//       const params = new URLSearchParams();

//       if (!isHR && employeeId) {
//         params.append("employee", employeeId);
//       }

//       if (selectedMonth) {
//         params.append("month", selectedMonth);
//       }

//       if (selectedYear) {
//         params.append("year", selectedYear);
//       }

//       if (params.toString()) {
//         url += `?${params.toString()}`;
//       }

//       const response = await api.get(url);

//       if (response.data.success) {
//         setSalaryData(response.data.data || []);
//       } else {
//         setSalaryData([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch salary data:", err);
//       setSalaryData([]);
//     }
//   };

//   useEffect(() => {
//     fetchSalaryData();
//   }, [isHR, employeeId, selectedMonth, selectedYear]);

//   // Handle Edit
//   const handleEdit = (salary) => {
//     setSelectedSalary(salary);
//     setMode("form");
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this salary record?")) {
//       try {
//         await api.delete(`salary-payment/${id}/`);
//         fetchSalaryData();
//         alert("Salary record deleted successfully");
//       } catch (err) {
//         console.error("Failed to delete:", err);
//         alert("Failed to delete salary record");
//       }
//     }
//   };

//   // Handle Submit (Create/Update)
//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         ...data,
//         month: parseInt(data.month),
//         year: parseInt(data.year),
//         present_days: parseInt(data.present_days) || 0,
//         paid_leave_days: parseInt(data.paid_leave_days) || 0,
//         unpaid_leave_days: parseInt(data.unpaid_leave_days) || 0,
//         holidays: parseInt(data.holidays) || 0,
//         half_days: parseInt(data.half_days) || 0,
//         weekly_offs: parseInt(data.weekly_offs) || 0,
//         absent_days: parseInt(data.absent_days) || 0,
//         gross_salary: parseFloat(data.gross_salary) || 0,
//         deductions: parseFloat(data.deductions) || 0,
//         net_salary: parseFloat(data.net_salary) || 0,
//       };

//       if (selectedSalary) {
//         await api.put(`salary-payment/${selectedSalary.id}/`, payload);
//         alert("Salary record updated successfully");
//       } else {
//         await api.post("salary-payment/", payload);
//         alert("Salary record created successfully");
//       }

//       setMode("list");
//       fetchSalaryData();
//     } catch (err) {
//       console.error("Failed to save:", err);
//       alert("Failed to save salary record");
//     }
//   };

//   // Filter Modal Component
//   const FilterModal = () => {
//     if (!showFilterModal) return null;

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
//         <div className="bg-white rounded-lg shadow-2xl w-96 border border-[var(--border-black-200)] transform transition-all overflow-hidden">
//           <div style={{ backgroundColor: themes.primary }} className="px-6 py-4">
//             <h3 className="text-lg font-semibold text-white">Filter Salary Data</h3>
//           </div>

//           <div className="p-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Months</option>
//                   {months.map((month) => (
//                     <option key={month.value} value={month.value}>
//                       {month.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Years</option>
//                   {years.map((year) => (
//                     <option key={year.value} value={year.value}>
//                       {year.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   onClick={() => setShowFilterModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     fetchSalaryData();
//                     setShowFilterModal(false);
//                   }}
//                   style={{ backgroundColor: themes.primary }}
//                   className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
//                 >
//                   Apply Filter
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const salaryFields = [
//     { key: "employee_name", label: "Employee" },
//     { key: "month_year", label: "Month / Year" },
//     { key: "present_days", label: "Present Days" },
//     { key: "paid_leave_days", label: "Paid Leave Days" },
//     { key: "unpaid_leave_days", label: "Unpaid Leave Days" },
//     { key: "holidays", label: "Holidays" },
//     { key: "half_days", label: "Half Days" },
//     { key: "weekly_offs", label: "Weekly Offs" },
//     { key: "absent_days", label: "Absent Days" },
//     { key: "gross_salary", label: "Gross Salary" },
//     { key: "deductions", label: "Deductions" },
//     { key: "net_salary", label: "Net Salary" },
//     { key: "generated_at", label: "Generated At" },
//   ];

//   const formFields = [
//     { label: "Employee ID", name: "employee", type: "number", required: true },
//     {
//       label: "Month",
//       name: "month",
//       type: "select",
//       required: true,
//       options: months.map(m => ({ label: m.label, value: m.value }))
//     },
//     { label: "Year", name: "year", type: "number", required: true },
//     { label: "Present Days", name: "present_days", type: "number" },
//     { label: "Paid Leave Days", name: "paid_leave_days", type: "number" },
//     { label: "Unpaid Leave Days", name: "unpaid_leave_days", type: "number" },
//     { label: "Holidays", name: "holidays", type: "number" },
//     { label: "Half Days", name: "half_days", type: "number" },
//     { label: "Weekly Offs", name: "weekly_offs", type: "number" },
//     { label: "Absent Days", name: "absent_days", type: "number" },
//     { label: "Gross Salary", name: "gross_salary", type: "number", step: "0.01" },
//     { label: "Deductions", name: "deductions", type: "number", step: "0.01" },
//     { label: "Net Salary", name: "net_salary", type: "number", step: "0.01" },
//   ];

//   // ================= LIST PAGE =================
//   if (mode === "list") {
//     return (
//       <>
//         <PageContainer>
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//             <SectionTitle title="Salary Payout" />
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => setShowFilterModal(true)}
//                 className="px-4 py-2 rounded text-sm font-semibold flex items-center gap-2"
//                 style={{
//                   backgroundColor: themes.primary,
//                   color: themes.textWhite,
//                 }}
//               >
//                 <span>📅</span> Filter
//               </button>
//               {isHR && (
//                 <ActionButtons
//                   showAdd
//                   addText="+ Add"
//                   onAdd={() => {
//                     setSelectedSalary(null);
//                     setMode("form");
//                   }}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Table with Red Header and Action Column */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 {/* Red Header */}
//                 <thead>
//                   <tr style={{ backgroundColor: themes.primary, color: themes.textWhite }}>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-12">No</th>
//                     <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[150px]">Employee</th>
//                     <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[110px]">Month/Year</th>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-20">Present</th>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-24">Paid Leave</th>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-24">Unpaid Leave</th>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-20">Holidays</th>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-20">Half Day</th>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-24">Weekly Off</th>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-20">Absent</th>
//                     <th className="px-4 py-3 text-right font-semibold whitespace-nowrap min-w-[120px]">Gross Salary</th>
//                     <th className="px-4 py-3 text-right font-semibold whitespace-nowrap min-w-[120px]">Deductions</th>
//                     <th className="px-4 py-3 text-right font-semibold whitespace-nowrap min-w-[120px]">Net Salary</th>
//                     <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-24">Action</th>
//                    </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {salaryData.map((salary, idx) => (
//                     <tr key={salary.id} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 text-center text-sm">{idx + 1}</td>
//                       <td className="px-4 py-3 text-sm">{salary.employee_name || "-"}</td>
//                       <td className="px-4 py-3 text-sm">
//                         {months.find(m => m.value === salary.month)?.label} {salary.year}
//                       </td>
//                       <td className="px-4 py-3 text-center text-sm">{salary.present_days || 0}</td>
//                       <td className="px-4 py-3 text-center text-sm">{salary.paid_leave_days || 0}</td>
//                       <td className="px-4 py-3 text-center text-sm">{salary.unpaid_leave_days || 0}</td>
//                       <td className="px-4 py-3 text-center text-sm">{salary.holidays || 0}</td>
//                       <td className="px-4 py-3 text-center text-sm">{salary.half_days || 0}</td>
//                       <td className="px-4 py-3 text-center text-sm">{salary.weekly_offs || 0}</td>
//                       <td className="px-4 py-3 text-center text-sm">{salary.absent_days || 0}</td>
//                       <td className="px-4 py-3 text-right text-sm">
//                         ₹{parseFloat(salary.gross_salary).toLocaleString('en-IN')}
//                       </td>
//                       <td className="px-4 py-3 text-right text-sm">
//                         ₹{parseFloat(salary.deductions).toLocaleString('en-IN')}
//                       </td>
//                       <td className="px-4 py-3 text-right text-sm font-semibold" style={{ color: themes.success }}>
//                         ₹{parseFloat(salary.net_salary).toLocaleString('en-IN')}
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <TableActions
//                           onView={() => {
//                             setSelectedSalary(salary);
//                             setMode("view");
//                           }}
//                           onEdit={isHR ? () => handleEdit(salary) : null}
//                           onDelete={isHR ? () => handleDelete(salary.id) : null}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {salaryData.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500">No salary data found for selected filters</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </PageContainer>
//         <FilterModal />
//       </>
//     );
//   }

//   // ================= VIEW PAGE =================
//   if (mode === "view" && selectedSalary) {
//     const viewData = {
//       ...selectedSalary,
//       month_year: `${months.find(m => m.value === selectedSalary.month)?.label} ${selectedSalary.year}`,
//       gross_salary: `₹${parseFloat(selectedSalary.gross_salary).toLocaleString('en-IN')}`,
//       deductions: `₹${parseFloat(selectedSalary.deductions).toLocaleString('en-IN')}`,
//       net_salary: `₹${parseFloat(selectedSalary.net_salary).toLocaleString('en-IN')}`,
//       generated_at: new Date(selectedSalary.generated_at).toLocaleString(),
//     };

//     return (
//       <>
//         <EntityPageLayout
//           title="Salary Details"
//           showBack
//           onBack={() => setMode("list")}
//         >
//           <EntityViewCard
//             title="Salary Information"
//             data={viewData}
//             fields={salaryFields}
//             api={null}
//             onUpdated={null}
//             onDeleted={null}
//             headerKeys={["employee_name", "month_year"]}
//           />
//         </EntityPageLayout>
//         <FilterModal />
//       </>
//     );
//   }

//   // ================= FORM PAGE =================
//   if (mode === "form") {
//     return (
//       <>
//         <EntityPageLayout
//           title={selectedSalary ? "Edit Salary" : "Add Salary"}
//           showBack
//           onBack={() => setMode("list")}
//         >
//           <EntityForm
//             title={selectedSalary ? "Edit Salary Record" : "Create Salary Record"}
//             selectedItem={selectedSalary}
//             onSubmit={onSubmit}
//             setMode={setMode}
//             fields={formFields}
//           />
//         </EntityPageLayout>
//         <FilterModal />
//       </>
//     );
//   }

//   // ================= DEFAULT RETURN =================
//   return (
//     <>
//       <PageContainer>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//           <SectionTitle title="Salary Payout" />
//           <div className="flex gap-2">
//             <button
//               onClick={() => setShowFilterModal(true)}
//               className="px-4 py-2 rounded text-sm font-semibold flex items-center gap-2"
//               style={{
//                 backgroundColor: themes.primary,
//                 color: themes.textWhite,
//               }}
//             >
//               <span>📅</span> Filter
//             </button>
//             {isHR && (
//               <ActionButtons
//                 showAdd
//                 addText="+ Add"
//                 onAdd={() => {
//                   setSelectedSalary(null);
//                   setMode("form");
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead>
//                 <tr style={{ backgroundColor: themes.primary, color: themes.textWhite }}>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-12">No</th>
//                   <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[150px]">Employee</th>
//                   <th className="px-4 py-3 text-left font-semibold whitespace-nowrap min-w-[110px]">Month/Year</th>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-20">Present</th>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-24">Paid Leave</th>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-24">Unpaid Leave</th>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-20">Holidays</th>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-20">Half Day</th>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-24">Weekly Off</th>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-20">Absent</th>
//                   <th className="px-4 py-3 text-right font-semibold whitespace-nowrap min-w-[120px]">Gross Salary</th>
//                   <th className="px-4 py-3 text-right font-semibold whitespace-nowrap min-w-[120px]">Deductions</th>
//                   <th className="px-4 py-3 text-right font-semibold whitespace-nowrap min-w-[120px]">Net Salary</th>
//                   <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-24">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {salaryData.map((salary, idx) => (
//                   <tr key={salary.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3 text-center text-sm">{idx + 1}</td>
//                     <td className="px-4 py-3 text-sm">{salary.employee_name || "-"}</td>
//                     <td className="px-4 py-3 text-sm">
//                       {months.find(m => m.value === salary.month)?.label} {salary.year}
//                     </td>
//                     <td className="px-4 py-3 text-center text-sm">{salary.present_days || 0}</td>
//                     <td className="px-4 py-3 text-center text-sm">{salary.paid_leave_days || 0}</td>
//                     <td className="px-4 py-3 text-center text-sm">{salary.unpaid_leave_days || 0}</td>
//                     <td className="px-4 py-3 text-center text-sm">{salary.holidays || 0}</td>
//                     <td className="px-4 py-3 text-center text-sm">{salary.half_days || 0}</td>
//                     <td className="px-4 py-3 text-center text-sm">{salary.weekly_offs || 0}</td>
//                     <td className="px-4 py-3 text-center text-sm">{salary.absent_days || 0}</td>
//                     <td className="px-4 py-3 text-right text-sm">
//                       ₹{parseFloat(salary.gross_salary).toLocaleString('en-IN')}
//                     </td>
//                     <td className="px-4 py-3 text-right text-sm">
//                       ₹{parseFloat(salary.deductions).toLocaleString('en-IN')}
//                     </td>
//                     <td className="px-4 py-3 text-right text-sm font-semibold" style={{ color: themes.success }}>
//                       ₹{parseFloat(salary.net_salary).toLocaleString('en-IN')}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <TableActions
//                         onView={() => {
//                           setSelectedSalary(salary);
//                           setMode("view");
//                         }}
//                         onEdit={isHR ? () => handleEdit(salary) : null}
//                         onDelete={isHR ? () => handleDelete(salary.id) : null}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {salaryData.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500">No salary data found for selected filters</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </PageContainer>
//       <FilterModal />
//     </>
//   );
// }


// import { EmployeeAPI, SalaryPaymentAPI } from "../services";
// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import EntityTableRow from "../components/table/EntityTableRow";
// import SectionTitle from "../components/form/SectionTitle";
// import ActionButtons from "../components/form/ActionButton";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityViewCard from "../components/view/EntityViewCard";
// import EntityForm from "../components/form/EntityForm";
// import { themes } from "../config/theme.config";
// import api from "../services/api";
// import { useUser } from "../hooks/useUser";
// import { EmployeeAPI } from "../services";

//     const { employeeId, isHR } = useUser();
//     const [salaryData, setSalaryData] = useState([]);
//     const [mode, setMode] = useState("list");
//     const [selectedSalary, setSelectedSalary] = useState(null);
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const [employees, setEmployees] = useState([]);
//     const [tempMonth, setTempMonth] = useState(selectedMonth);
//     const [tempYear, setTempYear] = useState(selectedYear);
//     // Month options
//     const months = [
//         { value: 1, label: "January" },
//         { value: 2, label: "February" },
//         { value: 3, label: "March" },
//         { value: 4, label: "April" },
//         { value: 5, label: "May" },
//         { value: 6, label: "June" },
//         { value: 7, label: "July" },
//         { value: 8, label: "August" },
//         { value: 9, label: "September" },
//         { value: 10, label: "October" },
//         { value: 11, label: "November" },
//         { value: 12, label: "December" },
//     ];
//     const fetchEmployees = async () => {
//         try {
//             const res = await EmployeeAPI.getAll();
//             setEmployees(res.data?.data || res.data || []);
//         } catch (err) {
//             console.error("Failed to fetch employees", err);
//         }
//     };
//     // Year options
//     const currentYear = new Date().getFullYear();

//     const years = [
//         { value: currentYear, label: currentYear.toString() },
//         { value: currentYear - 1, label: (currentYear - 1).toString() }
//     ];

//     const fetchSalaryData = async (monthParam, yearParam) => {
//         try {
//             const month = monthParam ?? selectedMonth;
//             const year = yearParam ?? selectedYear;

//             const params = {};

//             if (!isHR && employeeId) {
//                 params.employee = employeeId;
//             }
//             if (employeeFilterId) {
//                 params.employee = employeeFilterId;
//             }

//             if (month) params.month = month;
//             if (year) params.year = year;
// 
//             const response = await SalaryPaymentAPI.filter(params);

//             if (response.data?.success) {
//                 setSalaryData(response.data.data || []);
//             } else {
//                 setSalaryData(response.data || []);
//             }
//         } catch (err) {
//             console.error("Failed to fetch salary data:", err);
//             setSalaryData([]);
//         }
//     };

//     useEffect(() => {
//         fetchSalaryData();
//         fetchEmployees();
//     }, [isHR,]);




//     // Handle Submit (Create/Update)
//     const onSubmit = async (data) => {
//         try {
//             const payload = {
//                 ...data,
//                 month: parseInt(data.month),
//                 year: parseInt(data.year),
//                 present_days: parseInt(data.present_days) || 0,
//                 paid_leave_days: parseInt(data.paid_leave_days) || 0,
//                 unpaid_leave_days: parseInt(data.unpaid_leave_days) || 0,
//                 holidays: parseInt(data.holidays) || 0,
//                 half_days: parseInt(data.half_days) || 0,
//                 weekly_offs: parseInt(data.weekly_offs) || 0,
//                 absent_days: parseInt(data.absent_days) || 0,
//                 gross_salary: parseFloat(data.gross_salary) || 0,
//                 deductions: parseFloat(data.deductions) || 0,
//                 net_salary: parseFloat(data.net_salary) || 0,
//             };

//             if (selectedSalary) {
//                 await SalaryPaymentAPI.update(selectedSalary.id, payload);
//                 alert("Salary record updated successfully");
//             } else {
//                 await api.post("salary-payment/", payload);
//                 alert("Salary record created successfully");
//             }

//             setMode("list");
//             fetchSalaryData();
//         } catch (err) {
//             console.error("Failed to save:", err);
//             alert("Failed to save salary record");
//         }
//     };

//     // Filter Modal Component
//     const FilterModal = () => {
//         if (!showFilterModal) return null;

//         return (
//             <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
//                 <div className="bg-white rounded-lg shadow-2xl w-96 border border-[var(--border-black-200)] transform transition-all overflow-hidden">
//                     <div style={{ backgroundColor: themes.primary }} className="px-6 py-4">
//                         <h3 className="text-lg font-semibold text-white">Filter Salary Data</h3>
//                     </div>

//                     <div className="p-6">
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//                                 <select
//                                     value={tempMonth}
//                                     onChange={(e) => setTempMonth(parseInt(e.target.value))}
//                                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 >
//                                     <option value="">All Months</option>
//                                     {months.map((month) => (
//                                         <option key={month.value} value={month.value}>
//                                             {month.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//                                 <select
//                                     value={tempYear}
//                                     onChange={(e) => setTempYear(parseInt(e.target.value))}
//                                 >
//                                     <option value="">All Years</option>
//                                     {years.map((year) => (
//                                         <option key={year.value} value={year.value}>
//                                             {year.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="flex justify-end gap-2 mt-4">
//                                 <button
//                                     onClick={() => setShowFilterModal(false)}
//                                     className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         setSelectedMonth(tempMonth);
//                                         setSelectedYear(tempYear);
//                                         fetchSalaryData(tempMonth, tempYear);
//                                         setShowFilterModal(false);
//                                     }}
//                                     style={{ backgroundColor: themes.primary }}
//                                     className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
//                                 >
//                                     Apply Filter
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     // Table columns configuration
//     const salaryColumns = [
//         {
//             render: (row) => (
//                 <div className="min-w-[150px]">{row.employee_name || "-"}</div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="min-w-[110px]">
//                     {months.find(m => m.value === row.month)?.label} {row.year}
//                 </div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="text-center min-w-[70px]">{row.present_days || 0}</div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="text-center min-w-[70px]">{row.paid_leave_days || 0}</div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="text-center min-w-[70px]">{row.unpaid_leave_days || 0}</div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="text-center min-w-[70px]">{row.holidays || 0}</div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="text-center min-w-[70px]">{row.half_days || 0}</div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="text-center min-w-[70px]">{row.weekly_offs || 0}</div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="text-center min-w-[70px]">{row.absent_days || 0}</div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="min-w-[120px]">
//                     ₹{parseFloat(row.gross_salary).toLocaleString('en-IN')}
//                 </div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="min-w-[120px]">
//                     ₹{parseFloat(row.deductions).toLocaleString('en-IN')}
//                 </div>
//             ),
//         },
//         {
//             render: (row) => (
//                 <div className="min-w-[120px] font-semibold" style={{ color: themes.success }}>
//                     ₹{parseFloat(row.net_salary).toLocaleString('en-IN')}
//                 </div>
//             ),
//         },
//     ];

//     // View fields configuration
//     const salaryFields = [
//         { key: "employee_name", label: "Employee" },
//         { key: "month_year", label: "Month / Year" },
//         { key: "present_days", label: "Present Days" },
//         { key: "paid_leave_days", label: "Paid Leave Days" },
//         { key: "unpaid_leave_days", label: "Unpaid Leave Days" },
//         { key: "holidays", label: "Holidays" },
//         { key: "half_days", label: "Half Days" },
//         { key: "weekly_offs", label: "Weekly Offs" },
//         { key: "absent_days", label: "Absent Days" },
//         { key: "gross_salary", label: "Gross Salary" },
//         { key: "deductions", label: "Deductions" },
//         { key: "net_salary", label: "Net Salary" },
//         { key: "generated_at", label: "Generated At" },
//     ];

//     // Form fields configuration
//     const formFields = [
//         {
//             label: "Employee",
//             name: "employee",
//             type: "select",
//             required: true,
//             options: employees.map(emp => ({
//                 label: `${emp.first_name} ${emp.last_name}`,
//                 value: emp.id
//             }))
//         },
//         {
//             label: "Month",
//             name: "month",
//             type: "select",
//             required: true,
//             options: months.map(m => ({ label: m.label, value: m.value }))
//         },
//         { label: "Year", name: "year", type: "select", required: true, options: years },
//         { label: "Present Days", name: "present_days", type: "number" },
//         { label: "Paid Leave Days", name: "paid_leave_days", type: "number" },
//         { label: "Unpaid Leave Days", name: "unpaid_leave_days", type: "number" },
//         { label: "Holidays", name: "holidays", type: "number" },
//         { label: "Half Days", name: "half_days", type: "number" },
//         { label: "Weekly Offs", name: "weekly_offs", type: "number" },
//         { label: "Absent Days", name: "absent_days", type: "number" },
//         { label: "Gross Salary", name: "gross_salary", type: "number", step: "0.01", min: "0" },
//         { label: "Deductions", name: "deductions", type: "number", step: "0.01", min: "0" },
//         { label: "Net Salary", name: "net_salary", type: "number", step: "0.01", min: "0" },
//     ];

//     // ================= LIST PAGE =================
//     if (mode === "list") {
//         return (
//             <>
//                 <PageContainer>
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//                         <SectionTitle title="Salary Payout" />
//                         <div className="flex flex-wrap gap-2">
//                             <button
//                                 onClick={() => setShowFilterModal(true)}
//                                 className="px-4 py-2 rounded text-sm font-semibold flex items-center gap-2"
//                                 style={{
//                                     backgroundColor: themes.primary,
//                                     color: themes.textWhite,
//                                 }}
//                             >
//                                 <span>📅</span> Filter
//                             </button>

//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg shadow overflow-hidden">
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full">
//                                 <TableHeader
//                                     columns={[
//                                         "Employee",
//                                         "Month/Year",
//                                         "Present",
//                                         "Paid Leave",
//                                         "Unpaid Leave",
//                                         "Holidays",
//                                         "Half Day",
//                                         "Weekly Off",
//                                         "Absent",
//                                         "Gross Salary",
//                                         "Deductions",
//                                         "Net Salary",
//                                         "Action"
//                                     ]}
//                                 />
//                                 <tbody className="divide-y divide-gray-200">
//                                     {salaryData.map((salary, idx) => (
//                                         <EntityTableRow
//                                             key={salary.id}
//                                             row={salary}
//                                             index={idx}
//                                             columns={salaryColumns}
//                                             onView={() => {
//                                                 setSelectedSalary(salary);
//                                                 setMode("view");
//                                             }}
//                                         // onEdit={isHR ? () => handleEdit(salary) : null}
//                                         // onDelete={isHR ? () => handleDelete(salary.id) : null}
//                                         />
//                                     ))}
//                                 </tbody>
//                             </table>

//                             {salaryData.length === 0 && (
//                                 <div className="text-center py-12">
//                                     <p className="text-gray-500">No salary data found for selected filters</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </PageContainer>
//                 <FilterModal />
//             </>
//         );
//     }

//     // ================= VIEW PAGE =================
//     if (mode === "view" && selectedSalary) {
//         const viewData = {
//             ...selectedSalary,
//             month_year: `${months.find(m => m.value === selectedSalary.month)?.label} ${selectedSalary.year}`,
//             gross_salary: `₹${parseFloat(selectedSalary.gross_salary).toLocaleString('en-IN')}`,
//             deductions: `₹${parseFloat(selectedSalary.deductions).toLocaleString('en-IN')}`,
//             net_salary: `₹${parseFloat(selectedSalary.net_salary).toLocaleString('en-IN')}`,
//             generated_at: new Date(selectedSalary.generated_at).toLocaleString(),
//         };

//         return (
//             <>
//                 <EntityPageLayout
//                     title="Salary Details"
//                     showBack
//                     onBack={() => setMode("list")}
//                 >
//                     <EntityViewCard
//                         title="Salary Information"
//                         data={viewData}
//                         fields={salaryFields}
//                         api={null}
//                         onUpdated={null}
//                         onDeleted={null}
//                         headerKeys={["employee_name", "month_year"]}
//                     />
//                 </EntityPageLayout>
//                 <FilterModal />
//             </>
//         );
//     }

//     // ================= FORM PAGE =================
//     if (mode === "form") {
//         return (
//             <>
//                 <EntityPageLayout
//                     title={selectedSalary ? "Edit Salary" : "Add Salary"}
//                     showBack
//                     onBack={() => setMode("list")}
//                 >
//                     <EntityForm
//                         title={selectedSalary ? "Edit Salary Record" : "Create Salary Record"}
//                         selectedItem={selectedSalary}
//                         onSubmit={onSubmit}
//                         setMode={setMode}
//                         fields={formFields}
//                     />
//                 </EntityPageLayout>
//                 <FilterModal />
//             </>
//         );
//     }

//     return null;
// }

import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import TableHeader from "../components/table/TableHeader";
import EntityTableRow from "../components/table/EntityTableRow";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityViewCard from "../components/view/EntityViewCard";
import { themes } from "../config/theme.config";
import { SalaryPaymentAPI } from "../services";
import { useUser } from "../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function SalaryPayout({ employeeFilterId, asSubcomponent }) {
  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();

  const [salaryData, setSalaryData] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [mode, setMode] = useState("list");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [tempMonth, setTempMonth] = useState(selectedMonth);
  const [tempYear, setTempYear] = useState(selectedYear);
  const [loading, setLoading] = useState(false);
  // Month options
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  // Year options
  const currentYear = new Date().getFullYear();
  const years = [
    { value: currentYear, label: currentYear.toString() },
    { value: currentYear - 1, label: (currentYear - 1).toString() }
  ];

  // Fetch salary data
  const fetchSalaryData = async (monthParam, yearParam) => {
    setLoading(true); // 🔥 START 
    try {
      const month = monthParam ?? selectedMonth;
      const year = yearParam ?? selectedYear;
      const params = {};

      if (!isHR && employeeId) {
        params.employee = employeeId;
      }
      if (employeeFilterId) {
        params.employee = employeeFilterId;
      }
      if (month) params.month = month;
      if (year) params.year = year;

      const response = await SalaryPaymentAPI.filter(params);

      if (response.data?.success) {
        setSalaryData(response.data.data || []);
      } else {
        setSalaryData(response.data || []);
      }
    } catch (err) {
      setError(parseBackendErrors(err));
      console.error("Failed to fetch salary data:", err);
      setSalaryData([]);
    } finally {
      setLoading(false); // 🔥 END 
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, [isHR, employeeId]);

  // Filter Modal Component
  const FilterModal = () => {
    if (!showFilterModal) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
        <div className="bg-white rounded-lg shadow-2xl w-96 border border-[var(--border-black-200)] transform transition-all overflow-hidden">
          <div style={{ backgroundColor: themes.primary }} className="px-6 py-4">
            <h3 className="text-lg font-semibold text-white">Filter Salary Data</h3>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  value={tempMonth}
                  onChange={(e) => setTempMonth(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Months</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={tempYear}
                  onChange={(e) => setTempYear(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSelectedMonth(tempMonth);
                    setSelectedYear(tempYear);
                    fetchSalaryData(tempMonth, tempYear);
                    setShowFilterModal(false);
                  }}
                  style={{ backgroundColor: themes.primary }}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Table columns configuration - VIEW ONLY (no actions)
  const salaryColumns = [
    ...(isHR ? [{
      render: (row) => (
        <div className="min-w-[150px]">{row.employee_name || "-"}</div>
      ),
    }] : []),
    {
      render: (row) => (
        <div className="min-w-[110px]">
          {months.find(m => m.value === row.month)?.label} {row.year}
        </div>
      ),
    },
    {
      render: (row) => (
        <div className="text-center min-w-[70px]">{row.present_days || 0}</div>
      ),
    },
    {
      render: (row) => (
        <div className="text-center min-w-[70px]">{row.paid_leave_days || 0}</div>
      ),
    },
    {
      render: (row) => (
        <div className="text-center min-w-[70px]">{row.unpaid_leave_days || 0}</div>
      ),
    },
    {
      render: (row) => (
        <div className="text-center min-w-[70px]">{row.holidays || 0}</div>
      ),
    },
    {
      render: (row) => (
        <div className="text-center min-w-[70px]">{row.half_days || 0}</div>
      ),
    },
    {
      render: (row) => (
        <div className="text-center min-w-[70px]">{row.weekly_offs || 0}</div>
      ),
    },
    {
      render: (row) => (
        <div className="text-center min-w-[70px]">{row.absent_days || 0}</div>
      ),
    },
    {
      render: (row) => (
        <div className="min-w-[120px]">
          ₹{parseFloat(row.gross_salary).toLocaleString('en-IN')}
        </div>
      ),
    },
    {
      render: (row) => (
        <div className="min-w-[120px]">
          ₹{parseFloat(row.deductions).toLocaleString('en-IN')}
        </div>
      ),
    },
    {
      render: (row) => (
        <div className="min-w-[120px] font-semibold" style={{ color: themes.success }}>
          ₹{parseFloat(row.net_salary).toLocaleString('en-IN')}
        </div>
      ),
    },
  ];

  // View fields configuration
  const salaryFields = [
    { key: "employee_name", label: "Employee" },
    { key: "month_year", label: "Month / Year" },
    { key: "present_days", label: "Present Days" },
    { key: "paid_leave_days", label: "Paid Leave Days" },
    { key: "unpaid_leave_days", label: "Unpaid Leave Days" },
    { key: "holidays", label: "Holidays" },
    { key: "half_days", label: "Half Days" },
    { key: "weekly_offs", label: "Weekly Offs" },
    { key: "absent_days", label: "Absent Days" },
    { key: "gross_salary", label: "Gross Salary" },
    { key: "deductions", label: "Deductions" },
    { key: "net_salary", label: "Net Salary" },
    { key: "generated_at", label: "Generated At" },
  ];

  // ================= LIST PAGE (VIEW ONLY) =================
  if (mode === "list") {
    const listContent = (
      <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          {!asSubcomponent && <SectionTitle title="SALARY PAYOUT" />}
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 ml-auto"
            style={{
              backgroundColor: themes.primary,
              color: themes.textWhite,
            }}
          >
            <span>📅</span> Filter
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <TableHeader
                columns={[
                  ...(isHR ? ["Employee"] : []),
                  "Month/Year",
                  "Present",
                  "Paid Leave",
                  "Unpaid Leave",
                  "Holidays",
                  "Half Day",
                  "Weekly Off",
                  "Absent",
                  "Gross Salary",
                  "Deductions",
                  "Net Salary",
                  "Action"
                ]}
              />

              <tbody className="divide-y divide-gray-200">
                {salaryData.map((salary, idx) => (
                  <EntityTableRow
                    key={salary.id}
                    row={salary}
                    index={idx}
                    columns={salaryColumns}
                    onView={() => {
                      setSelectedSalary(salary);
                      setMode("view");
                    }}
                  // NO onEdit, NO onDelete - VIEW ONLY
                  />
                ))}
              </tbody>

            </table>


          </div>
        </div>
        {loading ? (
          <div className="py-12">
            <LoadingSpinner text="Loading salary data..." />
          </div>
        ) : salaryData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No salary data found for selected filters</p>
          </div>
        ) : null}
      </>
    );

    if (asSubcomponent) {
      return (
        <>
          <div className="w-full bg-white rounded-lg p-5 shadow-sm">{listContent}</div>
          <FilterModal />
        </>
      );
    }

    return (
      <>
        <PageContainer>{listContent}</PageContainer>
        <FilterModal />
      </>
    );
  }

  // ================= VIEW PAGE =================
  if (mode === "view" && selectedSalary) {
    const viewData = {
      ...selectedSalary,
      month_year: `${months.find(m => m.value === selectedSalary.month)?.label} ${selectedSalary.year}`,
      gross_salary: `₹${parseFloat(selectedSalary.gross_salary).toLocaleString('en-IN')}`,
      deductions: `₹${parseFloat(selectedSalary.deductions).toLocaleString('en-IN')}`,
      net_salary: `₹${parseFloat(selectedSalary.net_salary).toLocaleString('en-IN')}`,
      generated_at: new Date(selectedSalary.generated_at).toLocaleString(),
    };

    return (
      <EntityPageLayout
        title="Salary Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="Salary Information"
          data={viewData}
          fields={salaryFields}
          api={null}
          onUpdated={null}
          onDeleted={null}
          headerKeys={["employee_name", "month_year"]}
        />
      </EntityPageLayout>
    );
  }

  return null;
}