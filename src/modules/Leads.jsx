
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
  const [visitsMap, setVisitsMap] = useState({});
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
  const fetchVisits = async () => {
    const res = await VisitsAPI.getAll();
    const data = res.data.data || [];

    const map = {};
    data.forEach(v => {
      if (!map[v.lead_id]) map[v.lead_id] = [];
      map[v.lead_id].push(v);
    });

    setVisitsMap(map);
  };

  useEffect(() => {
    fetchLeads();
    fetchEmployees();
    fetchVisits();   // 👈 add this line only

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
      console.log("API ERROR 👉", err.response?.data);
      alert("Check console error");
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
              row.interest_level === "High"
                ? themes.danger
                : row.interest_level === "Medium"
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
          setSelectedVisits(visitsMap[row.id] || []);
          setSelectedItem(row);
          setMode("visits");
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
  ...(isHR ? [{
    key: "assigned_to_name",
    className: "whitespace-nowrap min-w-[100px] flex justify-center items-center p-[10px]",
    render: (row) => (
      <div className="w-[100px]">
        <select
          value={row.assigned_to || ""}
          onChange={(e) => handleAssignChange(row, e.target.value)}
          className="w-full rounded px-2 py-1 text-sm"
          style={{
            border: `1px solid ${themes.borderLight}`,
            backgroundColor: themes.textWhite,
            color: themes.textPrimary,
          }}
        >
          <option value="">Unassigned</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.first_name} {emp.last_name}
            </option>
          ))}
        </select>
      </div>
    ),
  }] : []),
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
          {isHR &&(
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
  if (mode === "visits") {
    return (
      <EntityPageLayout
        title="Visit List"
        showBack
        onBack={() => setMode("list")}
      >
        <Table
          header={
            <TableHeader
              columns={[
                "Followup Date",
                "Status",
                "Employee",
                "Notes",
                "Action",
              ]}
            />
          }
        >
          {selectedVisits.map((v, index) => (
            <EntityTableRow
              key={v.id}
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
              { label: "LOW", value: "Low" },
              { label: "MEDIUM", value: "Medium" },
              { label: "HIGH", value: "High" },
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