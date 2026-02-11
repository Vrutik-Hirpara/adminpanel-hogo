// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import EntityTableRow from "../components/table/EntityTableRow";
// import LeaveRequestViewCard from "../components/view/LeaveRequestViewCard";

// import { LeaveRequestsAPI, EmployeeAPI } from "../services";

// export default function LeaveRequests() {
//   const [leaves, setLeaves] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   const fetchLeaves = async () => {
//     const res = await LeaveRequestsAPI.getAll();
//     setLeaves(res.data.data || []);
//   };

//   const fetchEmployees = async () => {
//     const res = await EmployeeAPI.getAll();
//     setEmployees(res.data.data || []);
//   };

//   useEffect(() => {
//     fetchLeaves();
//     fetchEmployees();
//   }, []);

//   // ================= SAVE =================
// const onSubmit = async (data) => {
//   const formData = new FormData();

//   Object.keys(data).forEach((key) => {
//     const value = data[key];

//     if (value instanceof FileList) {
//       if (value.length > 0) formData.append(key, value[0]);
//     } 
//     else if (value !== null && value !== "") {
//       formData.append(key, value);
//     }
//   });

//   try {
//     if (selectedItem) {
//       await LeaveRequestsAPI.update(selectedItem.id, formData);
//     } else {
//       await LeaveRequestsAPI.create(formData);
//     }

//     setMode("list");
//     fetchLeaves();
//   } catch (err) {
//     console.log("API ERROR:", err.response?.data);
//   }
// };


//   const handleDelete = async (id) => {
//     await LeaveRequestsAPI.delete(id);
//     fetchLeaves();
//   };

//   // ================= TABLE COLUMNS =================
//   const leaveColumns = [
//     { key: "leave_type", className: "min-w-[80px]" },
//     { key: "start_date" },
//     { key: "end_date" },
//     { key: "total_leaves" },
//     { key: "reason" },
//     {
//       key: "status",
//       render: (row) => (
//         <span
//           className={
//             row.status === "approved"
//               ? "text-green-600"
//               : row.status === "rejected"
//               ? "text-red-600"
//               : "text-yellow-600"
//           }
//         >
//           {row.status}
//         </span>
//       ),
//     },
//   ];

//   // ================= VIEW =================
//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout title="Leave Details" showBack onBack={() => setMode("list")}>
//         <LeaveRequestViewCard leave={selectedItem} />
//       </EntityPageLayout>
//     );
//   }

//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Leave Requests" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
//         </div>

//         <Table header={<TableHeader columns={["Type", "Start", "End", "Days", "Reason", "Status", "Action"]} />}>
//           {leaves.map((l, index) => (
//             <EntityTableRow
//               key={l.id}
//               row={l}
//               index={index}
//               columns={leaveColumns}
//               onView={(r) => { setSelectedItem(r); setMode("view"); }}
//               onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//               onDelete={(id) => handleDelete(id)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= FORM =================
//   return (
//     <EntityPageLayout title="Leave Request" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Leave" : "Create Leave"}
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
//             required: true,
//           },
//           {
//             label: "Leave Type",
//             name: "leave_type",
//             type: "select",
//             options: [
//               { label: "CL", value: "CL" },
//               { label: "PL", value: "PL" },
//               { label: "SL", value: "SL" },
//             ],
//           },
//           { label: "Start Date", name: "start_date", type: "date" },
//           { label: "End Date", name: "end_date", type: "date" },
//           { label: "Total Leaves", name: "total_leaves" },
//           { label: "Reason", name: "reason", type: "textarea" },
//           { label: "Upload Document", name: "upload_doc", type: "file" },
//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//             options: [
//               { label: "Pending", value: "pending" },
//               { label: "Approved", value: "approved" },
//               { label: "Rejected", value: "rejected" },
//             ],
//           },
//           {
//   label: "Approved By",
//   name: "approved_by",
//   type: "select",
//   options: employees.map(e => ({
//     label: e.employee_code,   // 👈 show employee code
//     value: e.id,              // 👈 send id to API
//   })),
// }

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

import { LeaveRequestsAPI, EmployeeAPI } from "../services";
import SearchBar from "../components/table/SearchBar";

export default function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
const [search, setSearch] = useState("");
const filteredLeaves = leaves.filter(l => {
  const emp = employees.find(e => e.id === l.employee_id);
  const empName = emp ? `${emp.first_name} ${emp.last_name}` : "";

  return `${empName} ${l.leave_type} ${l.reason} ${l.status}`
    .toLowerCase()
    .includes(search.toLowerCase());
});

  // ================= FETCH =================
  const fetchLeaves = async () => {
    const res = await LeaveRequestsAPI.getAll();
    setLeaves(res.data?.data || []);
  };

  const fetchEmployees = async () => {
    const res = await EmployeeAPI.getAll();
    setEmployees(res.data?.data || []);
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  // ================= SAVE =================
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else if (value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      selectedItem
        ? await LeaveRequestsAPI.update(selectedItem.id, formData)
        : await LeaveRequestsAPI.create(formData);

      setMode("list");
      fetchLeaves();
    } catch (err) {
      console.log("API ERROR:", err.response?.data);
    }
  };

  const handleDelete = async (id) => {
    await LeaveRequestsAPI.delete(id);
    fetchLeaves();
  };

  // ================= TABLE COLUMNS =================
  const leaveColumns = [
      {
    key: "employee_id",
    render: (row) => {
      const emp = employees.find(e => e.id === row.employee_id);
      return emp ? `${emp.first_name} ${emp.last_name}` : "-";
    }},
    { key: "leave_type" },
    { key: "start_date" },
    { key: "end_date" },
    { key: "total_leaves" },
    { key: "reason" },
    {
      key: "status",
      render: (row) => (
        <span
          className={
            row.status === "approved"
              ? "text-green-600 font-semibold"
              : row.status === "rejected"
              ? "text-red-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {row.status}
        </span>
      ),
    },
  ];

  // ================= VIEW FIELDS =================
  const leaveFields = [
    { key: "leave_type", label: "Leave Type" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "total_leaves", label: "Total Days" },
    { key: "reason", label: "Reason" },
    {
      key: "status",
      label: "Status",
      format: (v) =>
        v === "approved"
          ? "Approved"
          : v === "rejected"
          ? "Rejected"
          : "Pending",
    },
    { key: "upload_doc", label: "Document" },
    {
      key: "approved_by",
      label: "Approved By",
      format: (id) => {
        const emp = employees.find(e => e.id === id);
        return emp ? `${emp.first_name} ${emp.last_name}` : "-";
      },
    },
  ];

  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
    return (
      <EntityPageLayout title="Leave Details" showBack onBack={() => setMode("list")}>
        <EntityViewCard
          title="Leave Request"
          data={selectedItem}
          fields={leaveFields}
          api={LeaveRequestsAPI}
          onUpdated={fetchLeaves}
          onDeleted={fetchLeaves}
          headerKeys={["leave_type", "start_date"]}
        />
      </EntityPageLayout>
    );
  }

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
      <div className="flex justify-between items-center mb-4">
  <SectionTitle title="Leave Requests" />

  <div className="flex gap-3">
    <SearchBar value={search} onChange={setSearch} placeholder="Search leaves..." />
    <ActionButtons showAdd addText="+ Add" onAdd={() => {
      setSelectedItem(null);
      setMode("form");
    }} />
  </div>
</div>


        <Table header={<TableHeader columns={["Employee","Type", "Start", "End", "Days", "Reason", "Status", "Action"]} />}>
{filteredLeaves.map((l, index) => (
            <EntityTableRow
              key={l.id}
              row={l}
              index={index}
              columns={leaveColumns}
              onView={(r) => { setSelectedItem(r); setMode("view"); }}
              onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
              onDelete={handleDelete}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  // ================= FORM =================
  return (
    <EntityPageLayout title="Leave Request" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Leave" : "Create Leave"}
        selectedItem={selectedItem}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            required: true,
            options: employees.map(e => ({
              label: `${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
          },
          {
            label: "Leave Type",
            name: "leave_type",
            type: "select",
            options: [
              { label: "CL", value: "CL" },
              { label: "PL", value: "PL" },
              { label: "SL", value: "SL" },
            ],
          },
          { label: "Start Date", name: "start_date", type: "date" },
          { label: "End Date", name: "end_date", type: "date" },
          { label: "Total Leaves", name: "total_leaves" },
          { label: "Reason", name: "reason", type: "textarea" },
          { label: "Upload Document", name: "upload_doc", type: "file" },
          {
            label: "Status",
            name: "status",
            type: "select",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ],
          },
          {
            label: "Approved By",
            name: "approved_by",
            type: "select",
            options: employees.map(e => ({
              // label: e.employee_code,
                  label: `${e.first_name} ${e.last_name}`,  // ✅ NAME SHOW

              value: e.id,
            })),
          },
        ]}
      />
    </EntityPageLayout>
  );
}
