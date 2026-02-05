

// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import LeadsRow from "../components/table/LeadsRow";
// import LeadsViewCard from "../components/view/LeadsViewCard";
// import LeadsTableHeader from "../components/table/LeadsTableHeader";

// import { getLeads, createLead, updateLead, deleteLead } from "../services/leads.service";

// export default function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   const fetchLeads = async () => {
//     const res = await getLeads();
//     setLeads(res.data.data || []);
//   };

//   useEffect(() => { fetchLeads(); }, []);

//   const onSubmit = async (data) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       data.created_by = user?.id;

//       selectedItem
//         ? await updateLead(selectedItem.id, data)
//         : await createLead(data);

//       alert("Saved successfully");
//       setMode("list");
//       fetchLeads();
//     } catch (err) {
//       alert(JSON.stringify(err.response?.data));
//     }
//   };

//   const handleDelete = async (id) => {
//     await deleteLead(id);
//     fetchLeads();
//   };

//   // LIST SAME
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Leads" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
//         </div>

//         <Table header={<LeadsTableHeader />}>
//           {leads.map(l => (
//             <LeadsRow
//               key={l.id}
//               row={l}
//               onView={(r) => { setSelectedItem(r); setMode("view"); }}
//               onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//               onDelete={(id) => handleDelete(id)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // VIEW
//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout title="Lead Details" showBack onBack={() => setMode("list")}>
//         <LeadsViewCard lead={selectedItem} />
//       </EntityPageLayout>
//     );
//   }

//   // FORM
//   return (
//     <EntityPageLayout title="Leads" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Lead" : "Create Lead"}
//         selectedItem={selectedItem}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           { label: "Lead Type", name: "lead_type", type: "select", options: [
//             { label: "Distributor", value: "Distributor" },
//             { label: "Dealer", value: "Dealer" },
//             { label: "Retailer", value: "Retailer" },
//           ], required: true },

//           { label: "Business Name", name: "business_name", required: true },
//           { label: "Contact Person", name: "contact_person" },
//           { label: "Phone", name: "phone" },
//           { label: "Email", name: "email" },
//           { label: "Address", name: "address", type: "textarea" },
//           { label: "City", name: "city" },
//           { label: "State", name: "state" },
//           { label: "Location", name: "location" },

//           { label: "Interest Level", name: "interest_level", type: "select", options: [
//             { label: "High", value: "High" },
//             { label: "Medium", value: "Medium" },
//             { label: "Low", value: "Low" },
//           ]},

//           { label: "Lead Status", name: "lead_status", type: "select", options: [
//             { label: "Lead", value: "Lead" },
//             { label: "Converted", value: "Converted" },
//             { label: "Closed", value: "Closed" },
//           ]},

//           { label: "Remarks", name: "remarks", type: "textarea" },
//           { label: "Lead Source", name: "lead_source" },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }


// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import LeadsRow from "../components/table/LeadsRow";
// import LeadsViewCard from "../components/view/LeadsViewCard";
// import LeadsTableHeader from "../components/table/LeadsTableHeader";

// import { getLeads, createLead, updateLead, deleteLead } from "../services/leads.service";
// import { getEmployees } from "../services/employee.service";

// export default function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   const fetchLeads = async () => {
//     const res = await getLeads();
//     setLeads(res.data.data || []);
//   };

//   const fetchEmployees = async () => {
//     const res = await getEmployees();
//     setEmployees(res.data.data || []);
//   };

//   useEffect(() => {
//     fetchLeads();
//     fetchEmployees();
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));

//       const payload = {
//         ...data,
//         created_by: user?.id,
//         assigned_to: data.assigned_to ? Number(data.assigned_to) : null,
//       };

//       selectedItem
//         ? await updateLead(selectedItem.id, payload)
//         : await createLead(payload);

//       alert("Saved successfully");
//       setMode("list");
//       fetchLeads();
//     } catch (err) {
//       alert(JSON.stringify(err.response?.data));
//     }
//   };

//   const handleDelete = async (id) => {
//     await deleteLead(id);
//     fetchLeads();
//   };

//   // 🔵 LIST
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Leads" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
//         </div>

//         <Table header={<LeadsTableHeader />}>
//           {leads.map(l => (
//             <LeadsRow
//               key={l.id}
//               row={l}
//               onView={(r) => { setSelectedItem(r); setMode("view"); }}
//               onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//               onDelete={(id) => handleDelete(id)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // 🟢 VIEW
//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout title="Lead Details" showBack onBack={() => setMode("list")}>
//         <LeadsViewCard lead={selectedItem} />
//       </EntityPageLayout>
//     );
//   }

//   // 🟡 FORM
//   return (
//     <EntityPageLayout title="Leads" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Lead" : "Create Lead"}
//         selectedItem={
//           selectedItem
//             ? { ...selectedItem, assigned_to: selectedItem.assigned_to || "" }
//             : null
//         }
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           { label: "Lead Type", name: "lead_type", type: "select", options: [
//             { label: "Distributor", value: "Distributor" },
//             { label: "Dealer", value: "Dealer" },
//             { label: "Retailer", value: "Retailer" },
//           ], required: true },

//           { label: "Business Name", name: "business_name", required: true },
//           { label: "Contact Person", name: "contact_person" },
//           { label: "Phone", name: "phone" },
//           { label: "Email", name: "email" },
//           { label: "Address", name: "address", type: "textarea" },
//           { label: "City", name: "city" },
//           { label: "State", name: "state" },
//           { label: "Location", name: "location" },

//           {
//             label: "Assign To",
//             name: "assigned_to",
//             type: "select",
//             options: employees.map(e => ({
//               label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//           },

//           { label: "Interest Level", name: "interest_level", type: "select", options: [
//             { label: "High", value: "High" },
//             { label: "Medium", value: "Medium" },
//             { label: "Low", value: "Low" },
//           ]},

//           { label: "Lead Status", name: "lead_status", type: "select", options: [
//             { label: "Lead", value: "Lead" },
//             { label: "Converted", value: "Converted" },
//             { label: "Closed", value: "Closed" },
//           ]},

//           { label: "Lead Source", name: "lead_source" },
//           { label: "Remarks", name: "remarks", type: "textarea" },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }












// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import LeadsRow from "../components/table/LeadsRow";
// import LeadsViewCard from "../components/view/LeadsViewCard";
// import LeadsTableHeader from "../components/table/LeadsTableHeader";

// import { getLeads, createLead, updateLead, deleteLead } from "../services/leads.service";
// import { getEmployees } from "../services/employee.service";

// export default function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   const fetchLeads = async () => {
//     const res = await getLeads();
//     setLeads(res.data.data || []);
//   };

//   const fetchEmployees = async () => {
//     const res = await getEmployees();
//     setEmployees(res.data.data || []);
//   };

//   useEffect(() => {
//     fetchLeads();
//     fetchEmployees();
//   }, []);

//   const onSubmit = async (data) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     const payload = {
//       ...data,
//       created_by: user?.id,
//       assigned_to: data.assigned_to ? Number(data.assigned_to) : null,
//     };

//     selectedItem
//       ? await updateLead(selectedItem.id, payload)
//       : await createLead(payload);

//     setMode("list");
//     fetchLeads();
//   };

//   const handleDelete = async (id) => {
//     await deleteLead(id);
//     fetchLeads();
//   };

//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Leads" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
//         </div>

//         <Table header={<LeadsTableHeader />}>
//           {leads.map((l, index) => (
//             <LeadsRow
//               key={l.id}
//               row={l}
//               index={index}
//               employees={employees}
//               onView={(r) => { setSelectedItem(r); setMode("view"); }}
//               onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//               onDelete={(id) => handleDelete(id)}
//               onAssignUpdate={fetchLeads}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout title="Lead Details" showBack onBack={() => setMode("list")}>
//         <LeadsViewCard lead={selectedItem} employees={employees} />
//       </EntityPageLayout>
//     );
//   }

//   return (
//     <EntityPageLayout title="Leads" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Lead" : "Create Lead"}
//         selectedItem={selectedItem}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           {
//             label: "Lead Type",
//             name: "lead_type",
//             type: "select",
//             options: [
//               { label: "Distributor", value: "Distributor" },
//               { label: "Dealer", value: "Dealer" },
//               { label: "Retailer", value: "Retailer" },
//             ],
//             required: true,
//           },
//           { label: "Business Name", name: "business_name", required: true },
//           { label: "Contact Person", name: "contact_person" },
//           { label: "Phone", name: "phone" },
//           { label: "Email", name: "email" },
//           { label: "Address", name: "address", type: "textarea" },
//           { label: "City", name: "city" },
//           { label: "State", name: "state" },
//           { label: "Location", name: "location" },
//           {
//             label: "Assign To",
//             name: "assigned_to",
//             type: "select",
//             options: employees.map(e => ({
//               label: e.employee_code,
//               value: e.id,
//             })),
//           },
//           {
//             label: "Interest Level",
//             name: "interest_level",
//             type: "select",
//             options: [
//               { label: "Low", value: "Low" },
//               { label: "Medium", value: "Medium" },
//               { label: "High", value: "High" },
//             ],
//           },
//           {
//             label: "Lead Status",
//             name: "lead_status",
//             type: "select",
//             options: [
//               { label: "Lead", value: "Lead" },
//               { label: "Prospect", value: "Prospect" },
//               { label: "Converted", value: "Converted" },
//               { label: "Lost", value: "Lost" },
//             ],
//           },
//           {
//             label: "Lead Source",
//             name: "lead_source",
//             type: "select",
//             options: [
//               { label: "Website", value: "Website" },
//               { label: "WhatsApp", value: "WhatsApp" },
//               { label: "Call", value: "Call" },
//               { label: "Email", value: "EMAIL" },
//               { label: "Exhibition", value: "EXHIBITION" },
//               { label: "Referral", value: "REFERRAL" },
//               { label: "Sales", value: "SALES" },
//             ],
//           },
//           { label: "Remarks", name: "remarks", type: "textarea" },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }

// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// // import LeadsRow from "../components/table/LeadsRow";
// import LeadsViewCard from "../components/view/LeadsViewCard";
// import LeadsTableHeader from "../components/table/LeadsTableHeader";

// import { LeadsAPI, EmployeeAPI } from "../services/apiService";
// import EntityTableRow from "../components/table/EntityTableRow";
// // import { getEmployees } from "../services/employee.service";

// export default function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

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
//       const user = JSON.parse(localStorage.getItem("user"));

//       const payload = {
//         ...data,
//         created_by: user?.id,
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
// const leadColumns = [
//   { key: "business_name" },

//   { 
//     key: "lead_type",
//     className: "min-w-[140px] whitespace-nowrap"
//   },

//   { key: "contact_person" },

//   { 
//     key: "phone",
//     className: "min-w-[130px] whitespace-nowrap"
//   },

//   { key: "email" },

//   {
//     key: "interest_level",
//     render: (row) => (
//       <span className={
//         row.interest_level === "High" ? "text-red-600" :
//         row.interest_level === "Medium" ? "text-yellow-600" :
//         "text-green-600"
//       }>
//         {row.interest_level}
//       </span>
//     ),
//   },

//   { key: "lead_status" },

//   {
//     key: "assigned_to_name",
//     render: (row) => row.assigned_to_name || "Unassigned",
//   },
// ];




//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Leads" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
//         </div>

//         <Table header={<LeadsTableHeader />}>
//           {leads.map((l, index) => (
//             <EntityTableRow
//               key={l.id}
//               row={l}
//               index={index}
//               columns={leadColumns}   // 🔥 THIS WAS MISSING
//               onView={(r) => { setSelectedItem(r); setMode("view"); }}
//               onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//               onDelete={(id) => handleDelete(id)}
//             />

//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout title="Lead Details" showBack onBack={() => setMode("list")}>
//         <LeadsViewCard lead={selectedItem} employees={employees} />
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
//           { label: "Business Name", name: "business_name", required: true },
//           { label: "Contact Person", name: "contact_person" },
//           { label: "Phone", name: "phone" },
//           { label: "Email", name: "email" },
//           { label: "Address", name: "address", type: "textarea" },
//           { label: "City", name: "city" },
//           { label: "State", name: "state" },
//           { label: "Location", name: "location" },

//           {
//             label: "Assign To",
//             name: "assigned_to",
//             type: "select",
//             options: employees.map(e => ({
//               label: e.employee_code,
//               value: e.id,
//             })),
//           },

//           {
//             label: "Interest Level",
//             name: "interest_level",
//             type: "select",
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
//             options: [
//               { label: "Lead", value: "Lead" },
//               { label: "Prospect", value: "Prospect" },
//               { label: "Converted", value: "Converted" },
//               { label: "Lost", value: "Lost" },
//             ],
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

//           { label: "Remarks", name: "remarks", type: "textarea" },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }
import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import LeadsViewCard from "../components/view/LeadsViewCard";
import LeadsTableHeader from "../components/table/LeadsTableHeader";

import { LeadsAPI, EmployeeAPI } from "../services/apiService";
import EntityTableRow from "../components/table/EntityTableRow";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  // ================= FETCH =================
  const fetchLeads = async () => {
    const res = await LeadsAPI.getAll();
    setLeads(res.data.data || []);
  };

  const fetchEmployees = async () => {
    const res = await EmployeeAPI.getAll();
    setEmployees(res.data.data || []);
  };

  useEffect(() => {
    fetchLeads();
    fetchEmployees();
  }, []);

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
      console.log("API ERROR 👉", err.response?.data);
      alert("Check console error");
    }
  };

  const handleDelete = async (id) => {
    await LeadsAPI.delete(id);
    fetchLeads();
  };
const handleAssignChange = async (row, employeeId) => {
  const empName =
    employees.find(e => e.id === Number(employeeId))?.employee_code || "Unassigned";

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

    { key: "email" },

    {
      key: "interest_level",
      render: (row) => (
        <span
          className={
            row.interest_level === "High"
              ? "text-red-600"
              : row.interest_level === "Medium"
              ? "text-yellow-600"
              : "text-green-600"
          }
        >
          {row.interest_level}
        </span>
      ),
    },

    { key: "lead_status" },

 {
  key: "assigned_to_name",
  render: (row) => (
    <select
      value={row.assigned_to || ""}
      onChange={(e) => handleAssignChange(row, e.target.value)}
      className="border rounded px-2 py-1 text-sm bg-white"
    >
      <option value="">Unassigned</option>
      {employees.map((emp) => (
        <option key={emp.id} value={emp.id}>
          {emp.employee_code}
        </option>
      ))}
    </select>
  ),
},

  ];

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Leads" />
          <ActionButtons
            showAdd
            addText="+ Add"
            onAdd={() => {
              setSelectedItem(null);
              setMode("form");
            }}
          />
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

  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
    return (
      <EntityPageLayout title="Lead Details" showBack onBack={() => setMode("list")}>
        <LeadsViewCard lead={selectedItem} employees={employees} />
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
              { label: "EMAIL", value: "EMAIL" },
              { label: "EXHIBITION", value: "EXHIBITION" },
              { label: "REFERRAL", value: "REFERRAL" },
              { label: "SALES", value: "SALES" },
            ],
          },
          { label: "Business Name", name: "business_name", required: true },
          { label: "Contact Person", name: "contact_person" },
          { label: "Phone", name: "phone" },
          { label: "Email", name: "email" },
          { label: "Address", name: "address", type: "textarea" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
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
            options: [
              { label: "LOW", value: "Low" },
              { label: "MEDIUM", value: "Medium" },
              { label: "HIGH", value: "High" },
            ],
          },

          {
            label: "Lead Status",
            name: "lead_status",
            type: "select",
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
