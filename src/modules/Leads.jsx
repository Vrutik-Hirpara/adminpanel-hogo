
// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import EntityViewCard from "../components/view/EntityViewCard";
// import LeadsTableHeader from "../components/table/LeadsTableHeader";
// import { themes } from "../config/theme.config";

// import { LeadsAPI, EmployeeAPI } from "../services";
// import EntityTableRow from "../components/table/EntityTableRow";

// export default function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // ================= FETCH =================
//   const fetchLeads = async () => {
//     const res = await LeadsAPI.getAll();
//     setLeads(res.data.data || []);
//   };

//   const fetchEmployees = async () => {
//     const res = await EmployeeAPI.getAll();
//     setEmployees(res.data.data || []);
//   };

//   useEffect(() => {
//     fetchLeads();
//     fetchEmployees();
//   }, []);

//   // ================= SAVE =================
//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         ...data,
//         created_by: Number(data.created_by),
//         assigned_to: data.assigned_to ? Number(data.assigned_to) : null,
//       };

//       selectedItem
//         ? await LeadsAPI.update(selectedItem.id, payload)
//         : await LeadsAPI.create(payload);

//       alert("Saved successfully");
//       setMode("list");
//       fetchLeads();
//     } catch (err) {
//       console.log("API ERROR 👉", err.response?.data);
//       alert("Check console error");
//     }
//   };

//   const handleDelete = async (id) => {
//     await LeadsAPI.delete(id);
//     fetchLeads();
//   };
//   const handleAssignChange = async (row, employeeId) => {
//  const emp = employees.find(e => e.id === Number(employeeId));

// const empName = emp
//   ? `${emp.first_name} ${emp.last_name}`
//   : "Unassigned";


//     const confirmChange = window.confirm(
//       `Are you sure you want to assign this lead to "${empName}"?`
//     );

//     if (!confirmChange) return;

//     try {
//       await LeadsAPI.update(row.id, {
//         assigned_to: employeeId ? Number(employeeId) : null,
//       });

//       fetchLeads();
//     } catch (err) {
//       console.log("Assign update failed", err);
//       alert("Update failed");
//     }
//   };


//   // ================= TABLE COLUMNS =================
//   const leadColumns = [
//     { key: "business_name" },

//     { key: "lead_type", className: "min-w-[140px] whitespace-nowrap" },

//     { key: "contact_person" },

//     { key: "phone", className: "min-w-[130px] whitespace-nowrap" },

//     { key: "email" },

//     {
//       key: "interest_level",
//       render: (row) => (
//         <span
//        className="font-semibold"
// style={{
//   color:
//     row.interest_level === "High"
//       ? themes.danger
//       : row.interest_level === "Medium"
//         ? themes.warning
//         : themes.success,
// }}

//         >
//           {row.interest_level}
//         </span>
//       ),
//     },

//     // { key: "lead_status" },

//     {
//       key: "assigned_to_name",
//       className: "whitespace-nowrap min-w-[100px] flex justify-center items-center p-[10px]",
//       render: (row) => (
//         <div className="w-[100px]">
//        <select
//   value={row.assigned_to || ""}
//   onChange={(e) => handleAssignChange(row, e.target.value)}
//   className="w-full rounded px-2 py-1 text-sm"
//   style={{
//     border: `1px solid ${themes.borderLight}`,
//     backgroundColor: themes.textWhite,
//     color: themes.textPrimary,
//   }}
// >

//             <option value="">Unassigned</option>
//             {employees.map((emp) => (
//               <option key={emp.id} value={emp.id}>
//                 {/* {emp.employee_code} */}
//                             {emp.first_name} {emp.last_name}   {/* 👈 CHANGE HERE */}

//               </option>
//             ))}
//           </select>
//         </div>
//       ),
//     }


//   ];

//   const leadFields = [
//     { key: "lead_type", label: "Lead Type" },
//     { key: "business_name", label: "Business Name" },
//     { key: "contact_person", label: "Contact Person" },
//     { key: "phone", label: "Phone" },
//     { key: "email", label: "Email" },
//     { key: "location", label: "Location" },
//     { key: "address", label: "Address" },
//     { key: "city", label: "City" },
//     { key: "state", label: "State" },
//     { key: "interest_level", label: "Interest Level" },
//     { key: "lead_status", label: "Lead Status" },
//     { key: "remarks", label: "Remarks" },

//     { key: "created_by_name", label: "Created By" },
//     { key: "created_by_code", label: "Created By Code" },
//     { key: "assigned_to_name", label: "Assigned To" },
//     { key: "assigned_to_code", label: "Assigned To Code" },
//     { key: "lead_source", label: "Lead Source" },
//   ];



//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Leads" />
//           <ActionButtons
//             showAdd
//             addText="+ Add"
//             onAdd={() => {
//               setSelectedItem(null);
//               setMode("form");
//             }}
//           />
//         </div>

//         <Table header={<LeadsTableHeader />}>
//           {leads.map((l, index) => (
//             <EntityTableRow
//               key={l.id}
//               row={l}
//               index={index}
//               columns={leadColumns}
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

//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout
//         title="Lead Details"
//         showBack
//         onBack={() => setMode("list")}
//       >
//         <EntityViewCard
//           title="Lead Details"
//           data={selectedItem}
//           fields={leadFields}
//           api={LeadsAPI}
//           onUpdated={fetchLeads}
//           onDeleted={fetchLeads}
//           headerKeys={["business_name"]}   // 🔴 header shows company
//         />
//       </EntityPageLayout>
//     );
//   }


//   // ================= FORM =================
//   return (
//     <EntityPageLayout title="Leads" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Lead" : "Create Lead"}
//         selectedItem={selectedItem}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           {
//             label: "Created By",
//             name: "created_by",
//             type: "select",
//             required: true,
//             options: employees.map((e) => ({
//               label: `${e.employee_code} - ${e.first_name}`,
//               value: e.id,
//             })),
//           },
//           {
//             label: "Lead Type",
//             name: "lead_type",
//             type: "select",
//             options: [
//               { label: "Distributor", value: "Distributor" },
//               { label: "Direct", value: "Direct" },
//               { label: "Retailer", value: "Retailer" },
//             ],
//             required: true,
//           },
//           {
//             label: "Lead Source",
//             name: "lead_source",
//             type: "select",
//             options: [
//               { label: "WEBSITE", value: "WEBSITE" },
//               { label: "WHATSAPP", value: "WHATSAPP" },
//               { label: "CALL", value: "CALL" },
//               { label: "EMAIL", value: "EMAIL" },
//               { label: "EXHIBITION", value: "EXHIBITION" },
//               { label: "REFERRAL", value: "REFERRAL" },
//               { label: "SALES", value: "SALES" },
//             ],
//           },
//           { label: "Business Name", name: "business_name", required: true },
//           { label: "Contact Person", name: "contact_person",required: true },
//           { label: "Phone", name: "phone",required: true },
//           { label: "Email", name: "email",required: true },
//           { label: "Address", name: "address", type: "textarea",required: true },
//           { label: "City", name: "city",required: true },
//           { label: "State", name: "state",required: true },
//           { label: "Location", name: "location" },

//           {
//             label: "Assign To",
//             name: "assigned_to",
//             type: "select",
//               className: "text-center",   // 👈 ADD THIS

//             options: employees.map((e) => ({
//               label: e.employee_code,
//               value: e.id,
//             })),
//           },

//           {
//             label: "Interest Level",
//             name: "interest_level",
//             type: "select",
//             required: true,
//             options: [
//               { label: "LOW", value: "Low" },
//               { label: "MEDIUM", value: "Medium" },
//               { label: "HIGH", value: "High" },
//             ],
//           },

//           {
//             label: "Lead Status",
//             name: "lead_status",
//             type: "select",
//             required: true,
//             options: [
//               { label: "Lead", value: "Lead" },
//               { label: "Prospect", value: "Prospect" },
//               { label: "Converted", value: "Converted" },
//               { label: "Lost", value: "Lost" },
//             ],
//           },



//           { label: "Remarks", name: "remarks", type: "textarea" },
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
import EntityViewCard from "../components/view/EntityViewCard";
import LeadsTableHeader from "../components/table/LeadsTableHeader";
import { themes } from "../config/theme.config";
import api from "../services/api"; // 👈 ADD THIS LINE

import { LeadsAPI, EmployeeAPI, VisitsAPI } from "../services";
import EntityTableRow from "../components/table/EntityTableRow";

// 🔥 ROLE HOOK
import { useUser } from "../hooks/useUser";

export default function Leads() {

  const { employeeId, isHR } = useUser();
  const [selectedVisits, setSelectedVisits] = useState([]);
  const [leads, setLeads] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [reportData, setReportData] = useState(null); // 👈 ADD THIS LINE
  const [showReport, setShowReport] = useState(false); // 👈 ADD THIS LINE
const [showReportModal, setShowReportModal] = useState(false); // 👈 ADD THIS
const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 👈 ADD THIS
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // 👈 ADD THIS
  // ================= FETCH =================
  const fetchLeads = async () => {
    const res = await LeadsAPI.getAll();
    let data = res.data.data || [];

    // 🔒 NON HR → only own leads
    if (!isHR) {
      data = data.filter(
        l =>
          Number(l.created_by) === Number(employeeId) ||
          Number(l.assigned_to) === Number(employeeId)
      );
    }

    setLeads(data);
  };

  const fetchEmployees = async () => {
    const res = await EmployeeAPI.getAll();
    let list = res.data.data || [];

    // 🔒 non HR → dropdown ma only self
    if (!isHR) {
      list = list.filter(e => e.id === employeeId);
    }

    setEmployees(list);
  };
  // const fetchVisitsByLead = async (leadId) => {
  //   try {
  //     const res = await VisitsAPI.getByLeadId(leadId);
  //     const data = res.data.data || [];

  //     setSelectedVisits(data);
  //     setMode("visits");
  //   } catch (err) {
  //     console.log("Visit fetch error", err);
  //     alert("Failed to load visits");
  //   }
  // };
  const fetchVisitsByLead = async (leadId) => {
    try {
      console.log("🔍 Fetching visits for Lead ID:", leadId);

      const response = await VisitsAPI.getByLeadId(leadId);
      console.log("📦 Response type:", typeof response);
      console.log("📦 Response:", response);

      // Ensure we always have an array
      let visits = [];
      if (Array.isArray(response)) {
        visits = response;
      } else if (response && typeof response === 'object') {
        // If it's an object, try to extract array from common patterns
        if (Array.isArray(response.data)) {
          visits = response.data;
        } else if (Array.isArray(response.results)) {
          visits = response.results;
        } else if (response.data && Array.isArray(response.data.data)) {
          visits = response.data.data;
        } else {
          // If it's a single object, wrap it in array
          console.warn("Response is not an array, wrapping:", response);
          visits = [];
        }
      }

      console.log("✅ Final visits array:", visits);
      setSelectedVisits(visits);
      setMode("visits");
    } catch (err) {
      console.error("❌ Visit fetch error:", err);
      setSelectedVisits([]); // Set empty array on error
      alert("Failed to load visits");
    }
  };
  useEffect(() => {
    fetchLeads();
    fetchEmployees();

  }, [isHR, employeeId]);


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

// Year options (last 5 years to next 2 years)
const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear - 5; i <= currentYear + 2; i++) {
  years.push({ value: i, label: i.toString() });
}
  // ================= SAVE =================
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        created_by: Number(data.created_by),
        assigned_to: data.assigned_to ? Number(data.assigned_to) : null,
      };

      selectedItem
        ? await LeadsAPI.update(selectedItem.id, payload)
        : await LeadsAPI.create(payload);

      alert("Saved successfully");
      setMode("list");
      fetchLeads();
    } catch (err) {
      const data = err.response?.data;

      console.log("API ERROR 👉", data);

      let message = "Something went wrong";

      // 🔥 Handle Django-style error structure
      if (data?.errors) {
        if (data.errors.email) {
          message = data.errors.email[0];
        }
        else if (data.errors.phone) {
          message = data.errors.phone[0];
        }
      }

      alert(message);
    }
  };
// const fetchMonthlyReport = async () => {
//   try {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth() + 1; // January = 1
//     const currentYear = currentDate.getFullYear();
    
//     let url;
    
//     // 🔥 Different endpoint based on user role
//     if (isHR) {
//       // HR: Get all employees data for the month
//       url = `employee-lead-monthly-report/?month=${currentMonth}&year=${currentYear}`;
//     } else {
//       // Employee: Get only their own data
//       url = `employee-lead-monthly-report/?employee_id=${employeeId}&month=${currentMonth}&year=${currentYear}`;
//     }
    
//     const response = await api.get(url);
//     setReportData(response.data.data);
//     setShowReport(true);
//     setMode("report");
//   } catch (err) {
//     console.error("Failed to fetch report:", err);
//     alert("Failed to load monthly report");
//   }
// };
const fetchMonthlyReport = async () => {
  try {
    let url;
    
    // 🔥 Different endpoint based on user role
    if (isHR) {
      // HR: Get all employees data for selected month & year
      url = `employee-lead-monthly-report/?month=${selectedMonth}&year=${selectedYear}`;
    } else {
      // Employee: Get only their own data
      url = `employee-lead-monthly-report/?employee_id=${employeeId}&month=${selectedMonth}&year=${selectedYear}`;
    }
    
    const response = await api.get(url);
    setReportData(response.data.data);
    setShowReport(true);
    setShowReportModal(false); // Close modal after fetch
    setMode("report");
  } catch (err) {
    console.error("Failed to fetch report:", err);
    alert("Failed to load monthly report");
  }
}; 
const handleDelete = async (id) => {
    await LeadsAPI.delete(id);
    fetchLeads();
  };

  // ================= ASSIGN CHANGE =================
  const handleAssignChange = async (row, employeeId) => {
    const emp = employees.find(e => e.id === Number(employeeId));

    const empName = emp
      ? `${emp.first_name} ${emp.last_name}`
      : "Unassigned";

    const confirmChange = window.confirm(
      `Are you sure you want to assign this lead to "${empName}"?`
    );

    if (!confirmChange) return;

    try {
      await LeadsAPI.update(row.id, {
        assigned_to: employeeId ? Number(employeeId) : null,
      });

      fetchLeads();
    } catch (err) {
      console.log("Assign update failed", err);
      alert("Update failed");
    }
  };

  // ================= TABLE COLUMNS =================
  const leadColumns = [
    { key: "business_name" },
    { key: "lead_type", className: "min-w-[140px] whitespace-nowrap" },
    { key: "contact_person" },
    { key: "phone", className: "min-w-[130px] whitespace-nowrap" },
    {
      key: "interest_level",
      render: (row) => (
        <span
          className="font-semibold"
          style={{
            color:
              row.interest_level === "Hot"
                ? themes.danger
                : row.interest_level === "Warm"
                  ? themes.warning
                  : themes.success,
          }}
        >
          {row.interest_level}
        </span>
      ),
    },


    {
      key: "visit_list",
      className: "whitespace-nowrap min-w-[120px] text-center",
      render: (row) => (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setSelectedItem(row);
              fetchVisitsByLead(row.id);   // 🔥 direct API call
            }}
            className="rounded px-2 py-1 text-xs font-semibold"
            style={{
              border: `1px solid ${themes.borderLight}`,
              backgroundColor: themes.textWhite,
              color: themes.textPrimary,
            }}
          >
            Read More
          </button>
        </div>
      ),
    },


    // {
    //   key: "assigned_to_name",
    //   className: "whitespace-nowrap min-w-[100px] flex justify-center items-center p-[10px]",
    //   render: (row) => (
    //     <div className="w-[100px]">
    //       <select
    //         value={row.assigned_to || ""}
    //         onChange={(e) => handleAssignChange(row, e.target.value)}
    //         className="w-full rounded px-2 py-1 text-sm"
    //         style={{
    //           border: `1px solid ${themes.borderLight}`,
    //           backgroundColor: themes.textWhite,
    //           color: themes.textPrimary,
    //         }}
    //       >
    //         <option value="">Unassigned</option>
    //         {employees.map((emp) => (
    //           <option key={emp.id} value={emp.id}>
    //             {emp.first_name} {emp.last_name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   ),
    // },


    // 🔥 CONDITIONAL COLUMN - only for HR
    // ...(isHR ? [{
    //   key: "assigned_to_name",
    //   className: "whitespace-nowrap min-w-[100px] flex justify-center items-center p-[10px]",
    //   render: (row) => (
    //     <div className="w-[100px]">
    //       <select
    //         value={row.assigned_to || ""}
    //         onChange={(e) => handleAssignChange(row, e.target.value)}
    //         className="w-full rounded px-2 py-1 text-sm"
    //         style={{
    //           border: `1px solid ${themes.borderLight}`,
    //           backgroundColor: themes.textWhite,
    //           color: themes.textPrimary,
    //         }}
    //       >
    //         <option value="">Unassigned</option>
    //         {employees.map((emp) => (
    //           <option key={emp.id} value={emp.id}>
    //             {emp.first_name} {emp.last_name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   ),
    // }] : []),
    {
      key: "assigned_to_name",
      className: "whitespace-nowrap min-w-[100px] flex justify-center items-center p-[10px]",
      render: (row) => {
        if (isHR) {
          return (
            <select
              value={row.assigned_to || ""}
              onChange={(e) => handleAssignChange(row, e.target.value)}
              className="w-full rounded px-2 py-1 text-sm"
            >
              <option value="">Unassigned</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.first_name} {emp.last_name}
                </option>
              ))}
            </select>
          );
        }

        return <span>{row.assigned_to_name || "Unassigned"}</span>;
      },
    }
  ];

  const leadFields = [
    { key: "lead_type", label: "Lead Type" },
    { key: "business_name", label: "Business Name" },
    { key: "contact_person", label: "Contact Person" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "location", label: "Location" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "interest_level", label: "Interest Level" },
    { key: "lead_status", label: "Lead Status" },
    { key: "remarks", label: "Remarks" },
    { key: "created_by_name", label: "Created By" },
    { key: "assigned_to_name", label: "Assigned To" },
    { key: "lead_source", label: "Lead Source" },
  ];
// Report Selection Modal
// const ReportModal = () => {
//   if (!showReportModal) return null;
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-96">
//         <h3 className="text-lg font-semibold mb-4">Select Month & Year</h3>
        
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Month
//           </label>
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {months.map((month) => (
//               <option key={month.value} value={month.value}>
//                 {month.label}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Year
//           </label>
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {years.map((year) => (
//               <option key={year.value} value={year.value}>
//                 {year.label}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div className="flex justify-end gap-2">
//           <button
//             onClick={() => setShowReportModal(false)}
//             className="px-4 py-2 rounded text-sm font-semibold border border-gray-300 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={fetchMonthlyReport}
//             className="px-4 py-2 rounded text-sm font-semibold"
//             style={{
//               backgroundColor: themes.primary,
//               color: themes.textWhite,
//             }}
//           >
//             Generate Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// Report Selection Modal
// const ReportModal = () => {
//   if (!showReportModal) return null;
  
//   return (
//     <div className="fixed inset-0 backdrop-blur-[2px]  bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Select Month & Year</h3>
        
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Month
//           </label>
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//             style={{
//               backgroundColor: themes.textWhite,
//               color: themes.textPrimary,
//             }}
//           >
//             {months.map((month) => (
//               <option key={month.value} value={month.value}>
//                 {month.label}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Year
//           </label>
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//             style={{
//               backgroundColor: themes.textWhite,
//               color: themes.textPrimary,
//             }}
//           >
//             {years.map((year) => (
//               <option key={year.value} value={year.value}>
//                 {year.label}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={() => setShowReportModal(false)}
//             className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={fetchMonthlyReport}
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
//           >
//             Generate Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
const ReportModal = () => {
  if (!showReportModal) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2px] bg-black/20">
      <div className="bg-white rounded-lg shadow-2xl w-96 border border-[var(--border-black-200)] transform transition-all overflow-hidden">
        {/* Header with primary color background */}
        <div className={`bg-[${themes.primary}] px-6 py-4`}>
          <h3 className="text-lg font-semibold text-white">Select Month & Year</h3>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': themes.primary }}
              >
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
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': themes.primary }}
              >
                {years.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-[var(--surfaceLight)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={fetchMonthlyReport}
                className={`px-4 py-2 text-white rounded-lg hover:bg-[${themes.hover}] transition-colors`}
                style={{ backgroundColor: themes.primary }}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  // ================= LIST =================
if (mode === "list") {
  return (
    <>
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Leads" />
          <div className="flex gap-2">
            <button
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2 rounded text-sm font-semibold"
              style={{
                backgroundColor: themes.primary,
                color: themes.textWhite,
              }}
            >
              📊 Monthly Report
            </button>
            {isHR && (
              <ActionButtons
                showAdd
                addText="+ Add"
                onAdd={() => {
                  setSelectedItem(null);
                  setMode("form");
                }}
              />
            )}
          </div>
        </div>

        <Table header={<LeadsTableHeader />}>
          {leads.map((l, index) => (
            <EntityTableRow
              key={l.id}
              row={l}
              index={index}
              columns={leadColumns}
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
      <ReportModal /> {/* 👈 ADD THIS */}
    </>
  );
}
  // if (mode === "visits") {
  //   return (
  //     <EntityPageLayout
  //       title="Visit List"
  //       showBack
  //       onBack={() => setMode("list")}
  //     >
  //       <Table
  //         header={
  //           <TableHeader
  //             columns={[
  //               "Followup Date",
  //               "Status",
  //               "Employee",
  //               "Notes",
  //               "Action",
  //             ]}
  //           />
  //         }
  //       >
  //         {selectedVisits.map((v, index) => (
  //           <EntityTableRow
  //             key={v.id}
  //             row={v}
  //             index={index}
  //             columns={[
  //               { key: "followup_date_display" },
  //               { key: "status_display" },
  //               { key: "employee_name" },
  //               { key: "notes" },
  //             ]}
  //           />
  //         ))}
  //       </Table>
  //     </EntityPageLayout>
  //   );
  // }

  //   if (mode === "visits") {
  //   // Ensure selectedVisits is always an array
  //   const visitsArray = Array.isArray(selectedVisits) ? selectedVisits : [];

  //   return (
  //     <EntityPageLayout
  //       title={`Visits for ${selectedItem?.business_name || "Lead"}`}
  //       showBack
  //       onBack={() => setMode("list")}
  //     >
  //       {visitsArray.length === 0 ? (
  //         <div className="text-center py-12 bg-white rounded-lg shadow">
  //           <p className="text-gray-500">No visits recorded for this lead yet</p>
  //         </div>
  //       ) : (
  //         <Table
  //           header={
  //             <TableHeader
  //               columns={[
  //                 "Followup Date",
  //                 "Status",
  //                 "Employee",
  //                 "Notes",
  //                 "Actions",
  //               ]}
  //             />
  //           }
  //         >
  //           {visitsArray.map((v, index) => (
  //             <EntityTableRow
  //               key={v.id || index}
  //               row={v}
  //               index={index}
  //               columns={[
  //                 { key: "followup_date_display" },
  //                 { key: "status_display" },
  //                 { key: "employee_name" },
  //                 { key: "notes" },
  //               ]}
  //             />
  //           ))}
  //         </Table>
  //       )}
  //     </EntityPageLayout>
  //   );
  // }
if (mode === "visits") {
  const visitsArray = Array.isArray(selectedVisits) ? selectedVisits : [];

  return (
    <>
      <EntityPageLayout
        title={`Visits for ${selectedItem?.business_name || "Lead"}`}
        showBack
        onBack={() => setMode("list")}
      >
        {visitsArray.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No visits recorded for this lead yet</p>
          </div>
        ) : (
          <Table
            header={
              <TableHeader
                columns={[
                  "Followup Date",
                  "Status",
                  "Employee",
                  "Notes",
                ]}
              />
            }
          >
            {visitsArray.map((v, index) => (
              <EntityTableRow
                key={v.id || index}
                row={v}
                index={index}
                columns={[
                  { key: "followup_date_display" },
                  { key: "status_display" },
                  { key: "employee_name" },
                  { key: "notes" },
                ]}
              />
            ))}
          </Table>
        )}
      </EntityPageLayout>
      <ReportModal /> {/* 👈 ADD THIS */}
    </>
  );
}
// ================= REPORT =================
if (mode === "report" && reportData) {
  return (
    <EntityPageLayout
      title={`Lead Report - ${reportData.month} ${reportData.year}`}
      showBack
      onBack={() => {
        setMode("list");
        setShowReport(false);
      }}
    >
      <div className="bg-white rounded-lg shadow p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600">Total Leads</h3>
            <p className="text-2xl font-bold">{reportData.total_leads}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600">Converted Leads</h3>
            <p className="text-2xl font-bold">{reportData.converted_leads}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600">Conversion Ratio</h3>
            <p className="text-2xl font-bold">{reportData.conversion_ratio}</p>
          </div>
        </div>

        {/* Download Button */}
        {reportData.download_url && (
          <div className="mb-6">
            <a
              href={reportData.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded text-sm font-semibold"
              style={{
                backgroundColor: themes.success,
                color: themes.textWhite,
              }}
            >
              📥 Download Excel Report
            </a>
          </div>
        )}

        {/* Employee-wise Table - Always show when employees data exists */}
        {/* {reportData.employees && reportData.employees.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-3">
              {isHR ? "Employee-wise Performance" : "Your Performance"}
            </h3>
            <Table
              header={
                <TableHeader
                  columns={
                    isHR
                      ? [
                          "Employee Name",
                          "Employee Code",
                          "Total Leads",
                          "Converted",
                          "Conversion Ratio"
                        ]
                      : [
                          "Total Leads",
                          "Converted",
                          "Conversion Ratio"
                        ]
                  }
                />
              }
            >
              {reportData.employees.map((emp, index) => (
                <tr key={emp.employee_id} className="border-b hover:bg-gray-50">
                  {isHR && (
                    <>
                      <td className="px-4 py-2">{emp.employee_name}</td>
                      <td className="px-4 py-2">{emp.employee_code}</td>
                    </>
                  )}
                  <td className="px-4 py-2 text-center">{emp.total_leads}</td>
                  <td className="px-4 py-2 text-center">{emp.converted_leads}</td>
                  <td className="px-4 py-2 text-center font-semibold">
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: parseFloat(emp.conversion_ratio) >= 50 
                          ? themes.success + '20' 
                          : themes.warning + '20',
                        color: parseFloat(emp.conversion_ratio) >= 50 
                          ? themes.success 
                          : themes.warning,
                      }}
                    >
                      {emp.conversion_ratio}
                    </span>
                  </td>
                </tr>
              ))}
            </Table>
          </>
        )} */}
        {/* Employee-wise Table - Always show when employees data exists */}
{reportData.employees && reportData.employees.length > 0 && (
  <>
    <h3 className="text-lg font-semibold mb-3">
      {isHR ? "Employee-wise Performance" : "Your Performance"}
    </h3>
    <Table
      header={
        <TableHeader
          columns={
            isHR
              ? [ "Employee Name", "Employee Code", "Total Leads", "Converted", "Conversion Ratio"]
              : ["Total Leads", "Converted", "Conversion Ratio"]
          }
        />
      }
    >
      {reportData.employees.map((emp, index) => (
        <tr key={emp.employee_id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-2 text-sm text-center">{index + 1}</td>
          {isHR && (
            <>
              <td className="px-4 py-2 text-sm text-center">{emp.employee_name}</td>
              <td className="px-4 py-2 text-sm text-center">{emp.employee_code}</td>
            </>
          )}
          <td className="px-4 py-2 text-sm text-center">{emp.total_leads}</td>
          <td className="px-4 py-2 text-sm text-center">{emp.converted_leads}</td>
          <td className="px-4 py-2 text-sm text-center">
            <span
              className="px-2 py-1 rounded text-xs font-semibold"
              style={{
                backgroundColor: parseFloat(emp.conversion_ratio) >= 50 
                  ? themes.success + '20' 
                  : themes.warning + '20',
                color: parseFloat(emp.conversion_ratio) >= 50 
                  ? themes.success 
                  : themes.warning,
              }}
            >
              {emp.conversion_ratio}
            </span>
          </td>
        </tr>
      ))}
    </Table>
  </>
)}
      </div>
    </EntityPageLayout>
  );
}
  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
    return (
      <EntityPageLayout
        title="Lead Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="Lead Details"
          data={selectedItem}
          fields={leadFields}
          api={LeadsAPI}
          onUpdated={fetchLeads}
          onDeleted={fetchLeads}
          headerKeys={["business_name"]}
        />
      </EntityPageLayout>
    );
  }

  // ================= FORM =================
  return (
    <>
    <EntityPageLayout title="Leads" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Lead" : "Create Lead"}
        selectedItem={selectedItem}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Created By",
            name: "created_by",
            type: "select",
            required: true,
            options: employees.map((e) => ({
              label: `${e.employee_code} - ${e.first_name}`,
              value: e.id,
            })),
          },
          {
            label: "Lead Type",
            name: "lead_type",
            type: "select",
            options: [
              { label: "Distributor", value: "Distributor" },
              { label: "Direct", value: "Direct" },
              { label: "Retailer", value: "Retailer" },
            ],
            required: true,
          },

          {
            label: "Lead Source",
            name: "lead_source",
            type: "select",
            options: [
              { label: "WEBSITE", value: "WEBSITE" },
              { label: "WHATSAPP", value: "WHATSAPP" },
              { label: "CALL", value: "CALL" },
              { label: "EXHIBITION", value: "EXHIBITION" },
              { label: "REFERRAL", value: "REFERRAL" },
              { label: "SALES", value: "SALES" },
            ],
          },
          { label: "Business Name", name: "business_name", required: true },
          { label: "Contact Person", name: "contact_person", required: true },
          { label: "Phone", name: "phone", required: true },
          { label: "Email", name: "email", type: "email", required: true },

          { label: "Address", name: "address", type: "textarea", required: true },
          { label: "City", name: "city", required: true },
          { label: "State", name: "state", required: true },
          { label: "Location", name: "location" },
          {
            label: "Assign To",
            name: "assigned_to",
            type: "select",
            options: employees.map((e) => ({
              label: e.employee_code,
              value: e.id,
            })),
          },
          {
            label: "Interest Level",
            name: "interest_level",
            type: "select",
            required: true,
            options: [
              { label: "COLD", value: "Cold" },
              { label: "WARM", value: "Warm" },
              { label: "HOT", value: "Hot" },
            ],
          },
          {
            label: "Lead Status",
            name: "lead_status",
            type: "select",
            required: true,
            options: [
              { label: "Lead", value: "Lead" },
              { label: "Prospect", value: "Prospect" },
              { label: "Converted", value: "Converted" },
              { label: "Lost", value: "Lost" },
            ],
          },
          { label: "Remarks", name: "remarks", type: "textarea" },
        ]}
      />
    </EntityPageLayout>
          <ReportModal />

    </>
  );
}
