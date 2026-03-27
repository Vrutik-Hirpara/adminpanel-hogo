
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

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Leads" />
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
                // No "Actions" column needed
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
              // ❌ No onView, onEdit, onDelete props
              // So hasActions = false, no actions column rendered
            />
          ))}
        </Table>
      )}
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
  );
}