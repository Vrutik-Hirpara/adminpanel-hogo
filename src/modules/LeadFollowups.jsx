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

// import { LeadFollowupsAPI, EmployeeAPI, LeadsAPI } from "../services";

// export default function LeadFollowups() {
//   const [data, setData] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [leads, setLeads] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selected, setSelected] = useState(null);

//   const fetchAll = async () => {
//     const [f, e, l] = await Promise.all([
//       LeadFollowupsAPI.getAll(),
//       EmployeeAPI.getAll(),
//       LeadsAPI.getAll(),
//     ]);

//     setData(f.data.data || []);
//     setEmployees(e.data.data || []);
//     setLeads(l.data.data || []);
//   };

//   useEffect(() => { fetchAll(); }, []);

//   // ================= SAVE =================
//   const onSubmit = async (form) => {
//     const payload = {
//       ...form,
//       employee_id: Number(form.employee_id),
//       lead_id: form.lead_id ? Number(form.lead_id) : null,
//       status: form.status === "Active",
//     };

//     selected
//       ? await LeadFollowupsAPI.update(selected.id, payload)
//       : await LeadFollowupsAPI.create(payload);

//     setMode("list");
//     fetchAll();
//   };

//   // ================= TABLE =================
//   const columns = [
//     { key: "employee_name" },
//     { key: "followup_date" },
//     { key: "next_followup_date" },
//     { key: "notes" },
//     {
//       key: "status",
//       render: (row) => (
//         <span className={row.status ? "text-green-600" : "text-red-600"}>
//           {row.status ? "Active" : "Closed"}
//         </span>
//       ),
//     },
//   ];

//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Lead Followups" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//         </div>

//         <Table header={<TableHeader columns={["Employee", "Followup", "Next", "Notes", "Status", "Action"]} />}>
//           {data.map((r, i) => (
//             <EntityTableRow
//               key={r.id}
//               row={r}
//               index={i}
//               columns={columns}
//               onView={(x) => { setSelected(x); setMode("view"); }}
//               onEdit={(x) => { setSelected(x); setMode("form"); }}
//               onDelete={(id) => LeadFollowupsAPI.delete(id).then(fetchAll)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW =================
//   if (mode === "view" && selected) {
//     return (
//       <EntityPageLayout title="Followup Details" showBack onBack={() => setMode("list")}>
//         <EntityViewCard
//           title="Followup"
//           data={selected}
//           fields={[
//             { key: "employee_name", label: "Employee" },
//             { key: "followup_date", label: "Followup Date" },
//             { key: "next_followup_date", label: "Next Followup" },
//             { key: "notes", label: "Notes" },
//             { key: "status", label: "Status", format: v => v ? "Active" : "Closed" },
//           ]}
//         />
//       </EntityPageLayout>
//     );
//   }

//   // ================= FORM =================
//   return (
//     <EntityPageLayout title="Lead Followup" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selected ? "Edit Followup" : "Create Followup"}
//         selectedItem={selected}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           {
//             label: "Employee",
//             name: "employee_id",
//             type: "select",
//             options: employees.map(e => ({
//               label: `${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//           },
//           {
//             label: "Lead",
//             name: "lead_id",
//             type: "select",
//             options: leads.map(l => ({
//               label: l.id,
//               value: l.id,
//             })),
//           },
//           { label: "Followup Date", name: "followup_date", type: "date" },
//           { label: "Next Followup Date", name: "next_followup_date", type: "date" },
//           { label: "Notes", name: "notes", type: "textarea" },
//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Closed", value: "Closed" },
//             ],
//           },
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

// import { LeadFollowupsAPI, EmployeeAPI, LeadsAPI } from "../services";

// export default function LeadFollowups() {
//   const [followups, setFollowups] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [leads, setLeads] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   const fetchData = async () => {
//     const [f, e, l] = await Promise.all([
//       LeadFollowupsAPI.getAll(),
//       EmployeeAPI.getAll(),
//       LeadsAPI.getAll(),
//     ]);

//     setFollowups(f.data.data || []);
//     setEmployees(e.data.data || []);
//     setLeads(l.data.data || []);
//   };

//   useEffect(() => { fetchData(); }, []);

//   // ================= SAVE =================
//   const onSubmit = async (data) => {
//     const payload = {
//       ...data,
//       employee_id: Number(data.employee_id),
//       lead_id: data.lead_id ? Number(data.lead_id) : null,
//       status: data.status === "Active",
//     };

//     selectedItem
//       ? await LeadFollowupsAPI.update(selectedItem.id, payload)
//       : await LeadFollowupsAPI.create(payload);

//     setMode("list");
//     fetchData();
//   };

//   // ================= STATUS TOGGLE =================
// const handleStatusToggle = async (item) => {
//   const newStatus = !item.status;

//   // 🔥 Instant UI update
//   setFollowups(prev =>
//     prev.map(f =>
//       f.id === item.id ? { ...f, status: newStatus } : f
//     )
//   );

//   try {
//     await LeadFollowupsAPI.update(item.id, { status: newStatus });
//   } catch (error) {
//     console.log("Status update failed, reverting...", error);

//     // revert if API fails
//     setFollowups(prev =>
//       prev.map(f =>
//         f.id === item.id ? { ...f, status: !newStatus } : f
//       )
//     );
//   }
// };


//   // ================= TABLE COLUMNS =================
//   const columns = [
//     { key: "employee_name" },
//     { key: "followup_date" },
//     { key: "next_followup_date" },

//     // 🔥 Notes hover
//     {
//       key: "notes",
//       render: (row) =>
//         row.notes ? (
//           <div className="relative group flex justify-center">
//            <span className="cursor-pointer text-blue-600 text-lg transition-all duration-200 hover:scale-125 hover:text-blue-400">📝</span>
//             <div className="absolute hidden group-hover:block z-50 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 w-48 break-words shadow-xl top-7 left-1/2 -translate-x-1/2 -translate-y-full">
//               {row.notes}
//             </div>
//           </div>
//         ) : "-",
//     },

//     // 🔥 Status Toggle
//   {
//   key: "status",
//   render: (row) => (
//     <button
//       onClick={() => handleStatusToggle(row)}
//       className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
//         row.status ? "bg-green-500" : "bg-gray-300"
//       }`}
//     >
//       <span
//         className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
//           row.status ? "translate-x-6" : ""
//         }`}
//       />
//     </button>
//   ),
// }

//   ];

//   // ================= LIST PAGE =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Lead Followups" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//         </div>

//         <Table header={<TableHeader columns={["Employee", "Followup Date", "Next Followup", "Notes", "Status", "Action"]} />}>
//           {followups.map((r, index) => (
//             <EntityTableRow
//               key={r.id}
//               row={r}
//               index={index}
//               columns={columns}
//               onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//               onDelete={(id) => LeadFollowupsAPI.delete(id).then(fetchData)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= FORM PAGE =================
//   return (
//     <EntityPageLayout title="Lead Followup" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Followup" : "Create Followup"}
//         selectedItem={selectedItem}
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           {
//             label: "Employee",
//             name: "employee_id",
//             type: "select",
//             options: employees.map(e => ({
//               label: `${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//           },
//           {
//             label: "Lead",
//             name: "lead_id",
//             type: "select",
//             options: leads.map(l => ({
//               label: l.business_name,
//               value: l.id,
//             })),
//           },
//           { label: "Followup Date", name: "followup_date", type: "date" },
//           { label: "Next Followup Date", name: "next_followup_date", type: "date" },
//           { label: "Notes", name: "notes", type: "textarea" },
//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//             options: [
//               { label: "Active", value: "Active" },
//               { label: "Inactive", value: "Inactive" },
//             ],
//           },
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

import { LeadFollowupsAPI, EmployeeAPI, LeadsAPI } from "../services";

export default function LeadFollowups() {
  const [followups, setFollowups] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leads, setLeads] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    const [f, e, l] = await Promise.all([
      LeadFollowupsAPI.getAll(),
      EmployeeAPI.getAll(),
      LeadsAPI.getAll(),
    ]);

    setFollowups(f.data.data || []);
    setEmployees(e.data.data || []);
    setLeads(l.data.data || []);
  };

  useEffect(() => { fetchData(); }, []);

  // ================= SAVE =================
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      employee_id: Number(data.employee_id),
      lead_id: data.lead_id ? Number(data.lead_id) : null,
      status: data.status === "Active",
    };

    selectedItem
      ? await LeadFollowupsAPI.update(selectedItem.id, payload)
      : await LeadFollowupsAPI.create(payload);

    setMode("list");
    fetchData();
  };

  // ================= STATUS TOGGLE =================
  const handleStatusToggle = async (item) => {
    const newStatus = !item.status;

    setFollowups(prev =>
      prev.map(f =>
        f.id === item.id ? { ...f, status: newStatus } : f
      )
    );

    try {
      await LeadFollowupsAPI.update(item.id, { status: newStatus });
    } catch (error) {
      setFollowups(prev =>
        prev.map(f =>
          f.id === item.id ? { ...f, status: !newStatus } : f
        )
      );
    }
  };

  // ================= TABLE COLUMNS =================
  const columns = [
    { key: "employee_name" },
{
  key: "followup_date",
  render: (r) => formatDate(r.followup_date),
},  {
  key: "next_followup_date",
  render: (row) => formatDate(row.next_followup_date),
},

    {
      key: "notes",
      render: (row) =>
        row.notes ? (
          <div className="relative group flex justify-center">
            <span className="cursor-pointer text-blue-600 text-lg transition-all duration-200 hover:scale-125 hover:text-blue-400">
              📝
            </span>
            <div className="absolute hidden group-hover:block z-50 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 w-48 break-words shadow-xl top-7 left-1/2 -translate-x-1/2 -translate-y-full">
              {row.notes}
            </div>
          </div>
        ) : "-",
    },

    {
      key: "status",
      render: (row) => (
        <button
          onClick={() => handleStatusToggle(row)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            row.status ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
              row.status ? "translate-x-6" : ""
            }`}
          />
        </button>
      ),
    }
  ];

  // ================= LIST PAGE =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Lead Followups" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Employee", "Followup Date", "Next Followup", "Notes", "Status", "Action"]} />}>
          {followups.map((r, index) => (
            <EntityTableRow
              key={r.id}
              row={r}
              index={index}
              columns={columns}
              onView={(r) => { setSelectedItem(r); setMode("view"); }}
              onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
              onDelete={(id) => LeadFollowupsAPI.delete(id).then(fetchData)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  // ================= VIEW PAGE =================
  if (mode === "view" && selectedItem) {
    return (
      <EntityPageLayout
        title="Followup Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="Followup"
          data={selectedItem}
          api={LeadFollowupsAPI}
          onUpdated={fetchData}
          onDeleted={fetchData}
          headerKeys={["employee_name"]}
          fields={[
  { key: "employee_name", label: "Employee Name" },


  { key: "followup_date", label: "Followup Date" },
    { key: "lead_type", label: "lead type" },

  { key: "next_followup_date", label: "Next Followup Date" },
  { key: "notes", label: "Notes" },
  {
    key: "status",
    label: "Status",
    format: (v) => (v ? "Active" : "Inactive"),
  },
]}

        //   fields={[
        //     { key: "employee_name", label: "Employee" },
        //     { key: "followup_date", label: "Followup Date" },
        //     { key: "next_followup_date", label: "Next Followup Date" },
        //     { key: "notes", label: "Notes" },
        //     {
        //       key: "status",
        //       label: "Status",
        //       format: (v) => (v ? "Active" : "Inactive"),
        //     },
        //     { key: "created_at", label: "Created At" },
        //   ]}
        />
      </EntityPageLayout>
    );
  }

  // ================= FORM PAGE =================
  return (
    <EntityPageLayout title="Lead Followup" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Followup" : "Create Followup"}
selectedItem={
  selectedItem
    ? { ...selectedItem, status: selectedItem.status ? "Active" : "Inactive" }
    : null
}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            options: employees.map(e => ({
              label: `${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
          },
          {
            label: "Lead",
            name: "lead_id",
            type: "select",
            options: leads.map(l => ({
              label: l.business_name,
              value: l.id,
            })),
          },
          { label: "Followup Date", name: "followup_date", type: "date" },
          { label: "Next Followup Date", name: "next_followup_date", type: "date" },
          { label: "Notes", name: "notes", type: "textarea" },
          {
            label: "Status",
            name: "status",
            type: "select",
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },
        ]}
      />
    </EntityPageLayout>
  );
}
