
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
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
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
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Leads() {
  const { setError, setSuccess } = useOutletContext();
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [leadFilter, setLeadFilter] = useState("created");
  const [selectedFollowups, setSelectedFollowups] = useState([]);
  // ================= FETCH =================
  useEffect(() => {
    // First fetch employees, then fetch leads
    const loadData = async () => {
      await fetchEmployees();
      await fetchLeads();
    };
    loadData();
  }, [isHR, employeeId]);

  // const fetchLeads = async () => {
  //   setLoading(true); // 🔥 START 
  //   try {
  //     const res = await LeadsAPI.getAll();
  //     let data = res.data.data || [];

  //     console.log("All leads before filter:", data);
  //     console.log("Current employee ID:", employeeId);
  //     console.log("isHR:", isHR);

  //     // 🔒 NON HR → only leads assigned to this employee
  //     if (!isHR) {
  //       data = data.filter(l => {
  //         const isAssigned = Number(l.assigned_to) === Number(employeeId);
  //         console.log(`Lead ${l.id} - assigned_to: ${l.assigned_to}, isAssigned: ${isAssigned}`);
  //         return isAssigned;
  //       });
  //     }

  //     console.log("Filtered leads:", data);
  //     console.log("Employees list:", employees);

  //     // 🔥 Add assigned_to_name to each lead using employees list
  //     // const enhancedData = data.map(lead => {
  //     //   const assignedEmployee = employees.find(emp => emp.id === lead.assigned_to);
  //     //   const createdEmployee = employees.find(emp => emp.id === lead.created_by);

  //     //   return {
  //     //     ...lead,
  //     //     assigned_to_name: assignedEmployee
  //     //       ? `${assignedEmployee.first_name} ${assignedEmployee.last_name}`
  //     //       : "Unassigned",
  //     //     created_by_name: createdEmployee
  //     //       ? `${createdEmployee.first_name} ${createdEmployee.last_name}`
  //     //       : "Unknown"
  //     //   };
  //     // });
  //     const enhancedData = data.map(lead => ({
  //       ...lead,
  //       assigned_to_name: lead.assigned_to_name || "Unassigned",
  //       created_by_name: lead.created_by_name || "Unknown",  // ✅ USE BACKEND VALUE
  //     }));
  //     setLeads(enhancedData);
  //   } catch (err) {
  //     setError(parseBackendErrors(err));
  //     console.error("Error fetching leads:", err);
  //   } finally {
  //     setLoading(false); // 🔥 END 
  //   }
  // };
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await LeadsAPI.getAll();
      let data = res.data.data || [];

      // 🔥 EMPLOYEE FILTER
      if (!isHR) {
        data = data.filter(
          (l) =>
            Number(l.created_by) === Number(employeeId) ||
            Number(l.assigned_to) === Number(employeeId)
        );
      }

      const enhancedData = data.map((lead) => ({
        ...lead,
        assigned_to_name: lead.assigned_to_name || "Unassigned",
        created_by_name: lead.created_by_name || "Unknown",
      }));

      setLeads(enhancedData);
    } catch (err) {
      setError(parseBackendErrors(err));
    } finally {
      setLoading(false);
    }
  };
  const fetchFollowupsByLead = async (leadId) => {
    try {
      const res = await api.get(`/lead_followups/?lead_id=${leadId}`);

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data?.data) {
        data = res.data.data;
      }

      setSelectedFollowups(data);
      setMode("followups");
    } catch (err) {
      console.error("Followup fetch error", err);
      setSelectedFollowups([]);
    }
  };
  const fetchEmployees = async () => {
    try {
      const res = await EmployeeAPI.getAll();
      let list = res.data.data || [];

      console.log("All employees:", list);

      // 🔒 non HR → only self
      // if (!isHR) {
      //   list = list.filter(e => e.id === employeeId);
      // }

      console.log("Filtered employees:", list);
      setEmployees(list);
    } catch (err) {
      setError(parseBackendErrors(err));
      console.error("Error fetching employees:", err);
    }
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
      setError(parseBackendErrors(err));
      console.error("❌ Visit fetch error:", err);
      setSelectedVisits([]); // Set empty array on error
    }
  };
  // useEffect(() => {
  //   // First fetch employees, then fetch leads
  //   const loadData = async () => {
  //     await fetchEmployees();
  //     await fetchLeads();
  //   };
  //   loadData();
  // }, [isHR, employeeId]);



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
      // const payload = {
      //   ...data,
      //   created_by: Number(data.created_by),
      //   assigned_to: data.assigned_to ? Number(data.assigned_to) : null,

      // };
      const payload = {
        ...data,

        created_by: isHR ? Number(data.created_by) : employeeId,
        assigned_to: data.assigned_to ? Number(data.assigned_to) : null,

        // 🔥 THIS IS MAIN FIX
        date: data.date,

        // optional
        month: new Date(data.date).getMonth() + 1,
        year: new Date(data.date).getFullYear(),
      };

      if (selectedItem) {
        const res = await LeadsAPI.update(selectedItem.id, payload);
        setSuccess(res.data?.message || "Saved successfully");
      } else {
        const res = await LeadsAPI.create(payload);
        setSuccess(res.data?.message || "Saved successfully");
      }

      setMode("list");
      fetchLeads();
    } catch (err) {
      setError(parseBackendErrors(err));
      console.log("API ERROR 👉", err.response?.data);
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
  // const fetchMonthlyReport = async () => {
  //   try {
  //     let url;

  //     // 🔥 Different endpoint based on user role
  //     if (isHR) {
  //       // HR: Get all employees data for selected month & year
  //       url = `employee-lead-monthly-report/?month=${selectedMonth}&year=${selectedYear}`;
  //     } else {
  //       // Employee: Get only their own data
  //       url = `employee-lead-monthly-report/?employee_id=${employeeId}&month=${selectedMonth}&year=${selectedYear}`;
  //     }

  //     const response = await api.get(url);
  //     setReportData(response.data.data);
  //     setShowReport(true);
  //     setShowReportModal(false); // Close modal after fetch
  //     setMode("report");
  //   } catch (err) {
  //     setError(parseBackendErrors(err));
  //     console.error("Failed to fetch report:", err);
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

      // Check if response has data
      if (response.data && response.data.data) {
        setReportData(response.data.data);
        setShowReport(true);
        setShowReportModal(false); // Close modal after fetch
        setMode("report");
      } else if (response.data && !response.data.success && response.data.message) {
        // Handle error response from backend
        setError(response.data.message);
        setShowReportModal(false); // Close modal on error
      }
    } catch (err) {
      console.error("Failed to fetch report:", err);

      // Check if error response has a message
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to load monthly report. Please try again.");
      }

      setShowReportModal(false); // Close modal on error
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await LeadsAPI.delete(id);
      setSuccess(res.data?.message || "Deleted successfully");
      fetchLeads();
    } catch (error) {
      setError(parseBackendErrors(error));
    }
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
      const res = await LeadsAPI.update(row.id, {
        assigned_to: employeeId ? Number(employeeId) : null,
      });
      setSuccess(res.data?.message || "Assigned successfully");
      fetchLeads();
    } catch (err) {
      setError(parseBackendErrors(err));
      console.log("Assign update failed", err);
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
                ? themes.success
                : row.interest_level === "Warm"
                  ? themes.warning
                  : themes.danger,
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
              fetchVisitsByLead(row.id);
            }}
            className="rounded px-2 py-1 text-xs font-semibold flex items-center gap-1"
            style={{
              border: `1px solid ${themes.borderLight}`,
              backgroundColor: themes.textWhite,
              color: themes.textPrimary,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Visits
          </button>
        </div>
      ),
    },
    {
      key: "followup_list",
      className: "text-center",
      render: (row) => (
        <button
          onClick={() => {
            setSelectedItem(row);
            fetchFollowupsByLead(row.id);
          }}
          className="rounded px-2 py-1 text-xs font-semibold flex items-center gap-1"
          style={{
            border: `1px solid ${themes.borderLight}`,
            backgroundColor: themes.textWhite,
            color: themes.textPrimary,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Followups
        </button>
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
    // Update the assigned_to_name column render function
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

        // For non-HR users - find employee name from employees list
        const assignedEmployee = employees.find(emp => emp.id === row.assigned_to);
        const employeeName = assignedEmployee
          ? `${assignedEmployee.first_name} ${assignedEmployee.last_name}`
          : "Unassigned";

        return <span>{employeeName}</span>;
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
  if (mode === "followups") {
    const followupsArray = Array.isArray(selectedFollowups)
      ? selectedFollowups
      : [];

    return (
      <EntityPageLayout
        title={`Followups for ${selectedItem?.business_name || "Lead"}`}
        showBack
        onBack={() => setMode("list")}
      >
        {followupsArray.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No followups found</p>
          </div>
        ) : (
          <>
            {/* 🔥 SAME LIKE VISITS HEADER */}
            <div className="bg-gray-50 border rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Lead Type</p>
                  <p className="font-semibold">
                    {followupsArray[0]?.lead_type || "-"}
                  </p>
                </div>
                <div>
                    <p className="text-gray-500">Lead Status</p>
                    <p className="font-semibold">
                      {followupsArray[0]?.lead_status || "-"}
                    </p>
                  </div>

                <div>
                  <p className="text-gray-500">Contact Person</p>
                  <p className="font-semibold">
                    {followupsArray[0]?.contact_person || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Contact Number</p>
                  <p className="font-semibold">
                    {followupsArray[0]?.contact_person_display || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* 🔥 TABLE */}
            <Table
              header={
                <TableHeader
                  columns={[
                    "Followup Date",
                    "Next Followup",
                    "Notes",
                  ]}
                />
              }
            >
              {followupsArray.map((f, index) => (
                <EntityTableRow
                  key={f.id || index}
                  row={f}
                  index={index}
                  columns={[
                    { key: "followup_date" },
                    { key: "next_followup_date" },
                    {
                      key: "notes",
                      render: (row) =>
                        row.notes ? (
                          <div className="relative group flex justify-center">
                            <span className="cursor-pointer text-lg">📝</span>

                            <div className="absolute hidden group-hover:block z-50 text-xs rounded-lg px-3 py-2 w-48 break-words shadow-xl top-7 left-1/2 -translate-x-1/2 -translate-y-full bg-black text-white">
                              {row.notes}
                            </div>
                          </div>
                        ) : "-",
                    }]}
                />
              ))}
            </Table>
          </>
        )}
      </EntityPageLayout>
    );
  }
  // ================= LIST =================
  if (mode === "list") {
    const getFilteredLeads = () => {
      let filtered = [...leads];

      if (!isHR) {
        if (leadFilter === "created") {
          filtered = filtered.filter(
            (l) => Number(l.created_by) === Number(employeeId)
          );
        } else if (leadFilter === "assigned") {
          filtered = filtered.filter(
            (l) => Number(l.assigned_to) === Number(employeeId)
          );
        }
      }

      return filtered;
    };

    const filteredLeads = getFilteredLeads();
    return (
      <>
        <PageContainer>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
            <SectionTitle title="Leads" />
            <div className="flex flex-wrap gap-2">
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
              {/* {isHR && ( */}
              <ActionButtons
                showAdd
                addText="+ Add"
                onAdd={() => {
                  setSelectedItem(null);
                  setMode("form");
                }}
              />
              {/* )} */}
            </div>
          </div>
          {!isHR && (
            <div className="flex gap-3 mb-3">
              {[
                { key: "created", label: "Created By Me" },
                { key: "assigned", label: "Assigned To Me" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setLeadFilter(tab.key)}
                  className={`px-4 py-2 rounded font-medium ${leadFilter === tab.key
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          <Table header={<LeadsTableHeader />}>
            {filteredLeads.map((l, index) => (
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
          {loading && <LoadingSpinner text="Loading Leads Details..." />}

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
            <>
              {/* 🔥 LEAD INFO SECTION */}
              <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">

                  <div>
                    <p className="text-gray-500">Lead Type</p>
                    <p className="font-semibold">
                      {visitsArray[0]?.lead_type || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Lead Status</p>
                    <p className="font-semibold">
                      {visitsArray[0]?.lead_status || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Contact Person</p>
                    <p className="font-semibold">
                      {visitsArray[0]?.contact_person || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Contact Number</p>
                    <p className="font-semibold">
                      {visitsArray[0]?.contact_person_display || "-"}
                    </p>
                  </div>

                </div>
              </div>

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
            </>
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
                        ? ["Employee Name", "Employee Code", "Total Leads", "Converted", "Conversion Ratio"]
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
            // {
            //   label: "Created By",
            //   name: "created_by",
            //   type: "select",
            //   required: true,
            //   options: employees.map((e) => ({
            //     label: `${e.first_name} ${e.last_name}`,
            //     value: e.id,
            //   })),
            // },
            // {
            //   label: "Created By",
            //   name: isHR ? "created_by" : "created_by_name",
            //   type: isHR ? "select" : "text",
            //   ...(isHR && {
            //     options: employees.map((e) => ({
            //       label: `${e.first_name} ${e.last_name}`,
            //       value: e.id,
            //     })),
            //   }),
            //   ...(!isHR && {
            //     value: (() => {
            //       const emp = employees.find(e => e.id === employeeId);
            //       return emp ? `${emp.first_name} ${emp.last_name}` : "";
            //     })(),
            //   }),
            //   readOnly: !isHR,  // Non-HR users can't edit
            //   disabled: !isHR,  // Non-HR users can't edit
            //   required: isHR,   // Only required for HR
            // }
            {
              label: "Created By",

              name: isHR ? "created_by" : "created_by_name",  // 👈 KEY CHANGE

              type: isHR ? "select" : "text",

              ...(isHR && {
                options: employees.map((e) => ({
                  label: `${e.first_name} ${e.last_name}`,
                  value: e.id,
                })),
              }),

              readOnly: !isHR,
              disabled: !isHR,
            },
            // 📅 Follow-up Date
            // {
            //   label: "Follow-up Date",
            //   name: "date",
            //   type: "date",
            //   required: true,
            // },
            {
              label: "Follow-up Date",
              name: "date",
              type: "date",
              required: true,

              value: selectedItem?.date
                ? selectedItem.date.split("T")[0]
                : "",
            },
            // 📆 Month (optional if backend need kare)
            {
              label: "Month",
              name: "month",
              type: "select",
              options: [
                { label: "January", value: 1 },
                { label: "February", value: 2 },
                { label: "March", value: 3 },
                { label: "April", value: 4 },
                { label: "May", value: 5 },
                { label: "June", value: 6 },
                { label: "July", value: 7 },
                { label: "August", value: 8 },
                { label: "September", value: 9 },
                { label: "October", value: 10 },
                { label: "November", value: 11 },
                { label: "December", value: 12 },
              ],
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
                label: `${e.first_name} ${e.last_name}`,
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
