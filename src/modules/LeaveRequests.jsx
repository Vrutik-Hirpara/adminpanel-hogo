// import { useUser } from "../hooks/useUser";
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
// import { themes } from "../config/theme.config";

// import { LeaveRequestsAPI, EmployeeAPI } from "../services";
// import SearchBar from "../components/table/SearchBar";

// export default function LeaveRequests() {
//   const { employeeId, isHR } = useUser();

//   const [leaves, setLeaves] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [search, setSearch] = useState("");
//   const filteredLeaves = leaves.filter(l => {
//     const emp = employees.find(e => e.id === l.employee_id);
//     const empName = emp ? `${emp.first_name} ${emp.last_name}` : "";
//     return `${empName} ${l.leave_type} ${l.reason} ${l.status}`
//       .toLowerCase()
//       .includes(search.toLowerCase());
//   });

//   // ================= FETCH =================
//   const fetchLeaves = async () => {
//     const res = await LeaveRequestsAPI.getAll();
//     let data = res.data?.data || [];

//     // 🔒 NON-HR → only own leave requests
//     if (!isHR) {
//       data = data.filter(
//         (leave) => Number(leave.employee_id) === Number(employeeId)
//       );
//     }

//     setLeaves(data);
//   };

//   const fetchEmployees = async () => {
//     const res = await EmployeeAPI.getAll();
//     setEmployees(res.data?.data || []);
//   };
//   useEffect(() => {
//     fetchLeaves();
//     fetchEmployees();
//   }, [employeeId, isHR]);

//   // ================= SAVE =================
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();

//       Object.keys(data).forEach((key) => {
//         const value = data[key];

//         if (value instanceof FileList) {
//           if (value.length > 0) formData.append(key, value[0]);
//         } else if (value !== null && value !== "") {
//           formData.append(key, value);
//         }
//       });
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }
//       selectedItem
//         ? await LeaveRequestsAPI.update(selectedItem.id, formData)
//         : await LeaveRequestsAPI.create(formData);

//       setMode("list");
//       fetchLeaves();
//     } catch (err) {
//       console.log("API ERROR:", err.response?.data);
//     }
//   };

//   const handleDelete = async (id) => {
//     await LeaveRequestsAPI.delete(id);
//     fetchLeaves();
//   };

//   // ================= TABLE COLUMNS =================
//   const leaveColumns = [
//     {
//       key: "employee_id",
//       render: (row) => {
//         const emp = employees.find(e => e.id === row.employee_id);
//         return emp ? `${emp.first_name} ${emp.last_name}` : "-";
//       }
//     },
//     { key: "leave_type" },
//     { key: "start_date" },
//     { key: "end_date" },
//     { key: "total_leaves" },
//     { key: "reason" },
//     {
//       key: "status",
//       render: (row) => (
//         <span
//           className="font-semibold"
//           style={{
//             color:
//               row.status === "approved"
//                 ? themes.success
//                 : row.status === "rejected"
//                   ? themes.danger
//                   : themes.warning,
//           }}

//         >
//           {row.status}
//         </span>
//       ),
//     },
//   ];

//   // ================= VIEW FIELDS =================
//   const leaveFields = [
//     { key: "leave_type", label: "Leave Type" },
//     { key: "start_date", label: "Start Date" },
//     { key: "end_date", label: "End Date" },
//     { key: "total_leaves", label: "Total Days" },
//     { key: "reason", label: "Reason" },
//     {
//       key: "status",
//       label: "Status",
//       format: (v) =>
//         v === "approved"
//           ? "Approved"
//           : v === "rejected"
//             ? "Rejected"
//             : "Pending",
//     },
//     { key: "upload_doc", label: "Document" },
//     {
//       key: "approved_by",
//       label: "Approved By",
//       format: (id) => {
//         const emp = employees.find(e => e.id === id);
//         return emp ? `${emp.first_name} ${emp.last_name}` : "-";
//       },
//     },
//   ];

//   // ================= VIEW =================
//   if (mode === "view" && selectedItem) {
//     return (
//       <EntityPageLayout title="Leave Details" showBack onBack={() => setMode("list")}>
//         <EntityViewCard
//           title="Leave Request"
//           data={selectedItem}
//           fields={leaveFields}
//           api={LeaveRequestsAPI}
//           onUpdated={fetchLeaves}
//           onDeleted={fetchLeaves}
//           headerKeys={["leave_type", "start_date"]}
//         />
//       </EntityPageLayout>
//     );
//   }

//   // ================= LIST =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//           <SectionTitle title="Leave Requests" />

//           <div className="flex gap-3">
//             <SearchBar value={search} onChange={setSearch} placeholder="Search leaves..." />
//             {isHR && (
//               <ActionButtons
//                 showAdd
//                 addText="+ Add"
//                 onAdd={() => {
//                   setSelectedItem(null);
//                   setMode("form");
//                 }}
//               />
//             )}
//           </div>
//         </div>


//         <Table header={<TableHeader columns={["Employee", "Type", "Start", "End", "Days", "Reason", "Status", "Action"]} />}>
//           {filteredLeaves.map((l, index) => (
//             <EntityTableRow
//               key={l.id}
//               row={l}
//               index={index}
//               columns={leaveColumns}
//               onView={(r) => { setSelectedItem(r); setMode("view"); }}
//               onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//               onDelete={handleDelete}
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
//             required: true,
//             options: employees.map(e => ({
//               label: `${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//           },
//           {
//             label: "Leave Type",
//             name: "leave_type",
//             type: "select",
//             required: true,
//             options: [
//               { label: "CL", value: "CL" },
//               { label: "PL", value: "PL" },
//               { label: "SL", value: "SL" },
//             ],
//           },
//           { label: "Start Date", name: "start_date", type: "date", required: true, },
//           { label: "End Date", name: "end_date", type: "date", required: true, },
//           { label: "Total Leaves", name: "total_leaves", required: true, },
//           { label: "Reason", name: "reason", type: "textarea", required: true, },
//           { label: "Upload Document", name: "upload_doc", type: "file",previewKey: "upload_doc" },
//           {
//             label: "Status",
//             name: "status",
//             type: "select",
//             required: true,
//             options: [
//               { label: "Pending", value: "pending" },
//               { label: "Approved", value: "approved" },
//               { label: "Rejected", value: "rejected" },
//             ],
//           },
//           {
//             label: "Approved By",
//             name: "approved_by",
//             type: "select",
//             options: employees.map(e => ({
//               // label: e.employee_code,
//               label: `${e.first_name} ${e.last_name}`,  // ✅ NAME SHOW

//               value: e.id,
//             })),
//           },
//         ]}
//       />
//     </EntityPageLayout>
//   );
// }


import { useUser } from "../hooks/useUser";
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
import { themes } from "../config/theme.config";

import { LeaveRequestsAPI, EmployeeAPI } from "../services";
import SearchBar from "../components/table/SearchBar";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function LeaveRequests({ employeeFilterId, asSubcomponent }) {
  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();

  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [hrEmployees, setHrEmployees] = useState([]);

  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // ================= FILTERED LEAVES =================
  const filteredLeaves = leaves.filter(l => {
    const emp = employees.find(e => e.id === l.employee_id);
    const empName = emp ? `${emp.first_name} ${emp.last_name}` : "";
    return `${empName} ${l.leave_type} ${l.reason} ${l.status}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  // ================= FETCH =================
  const fetchLeaves = async () => {
    setLoading(true); // 🔥 START 
    try {
      const res = await LeaveRequestsAPI.getAll();
      let data = res.data?.data || [];

      // 🔒 NON-HR → only own leave requests
      if (!isHR) {
        data = data.filter(
          (leave) => Number(leave.employee_id) === Number(employeeId)
        );
      }
      if (employeeFilterId) {
        data = data.filter(
          (leave) => Number(leave.employee_id) === Number(employeeFilterId)
        );
      }

      setLeaves(data);
    } catch (err) {
      setError(parseBackendErrors(err));
    } finally {
      setLoading(false); // 🔥 END 
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await EmployeeAPI.getAll();
      let empData = res.data?.data || [];

      // 🔒 NON-HR → only show self in dropdown
      if (!isHR) {
        empData = empData.filter(e => e.id === employeeId);
      }

      setEmployees(empData);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, [employeeId, isHR]);
  useEffect(() => {
    const fetchHR = async () => {
      try {
        const res = await EmployeeAPI.getHR();
        setHrEmployees(res.data?.data || []);

      } catch (err) {
        console.error("HR fetch error:", err);
      }
    };

    fetchHR();
  }, []);
  // ================= SAVE =================
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // 🔥 For NON-HR, force employee_id to their own ID
      if (!isHR) {
        data.employee_id = employeeId;
      }

      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else if (value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (selectedItem) {
        const res = await LeaveRequestsAPI.update(selectedItem.id, formData);
        setSuccess(res.data?.message || "Saved successfully");
      } else {
        const res = await LeaveRequestsAPI.create(formData);
        setSuccess(res.data?.message || "Saved successfully");
      }

      setMode("list");
      fetchLeaves();
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      try {
        const res = await LeaveRequestsAPI.delete(id);
        setSuccess(res.data?.message || "Deleted successfully");
        fetchLeaves();
      } catch (error) {
        setError(parseBackendErrors(error));
      }
    }
  };

  // ================= TABLE COLUMNS =================
  const leaveColumns = [
    {
      key: "employee_id",
      render: (row) => {
        const emp = employees.find(e => e.id === row.employee_id);
        return emp ? `${emp.first_name} ${emp.last_name}` : "-";
      }
    },
    { key: "leave_type" },
    {
      key: "start_date",
      render: (row) => {
        const date = new Date(row.start_date);
        return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
      }
    },
    {
      key: "end_date",
      render: (row) => {
        const date = new Date(row.end_date);
        return date.toLocaleDateString("en-GB");
      }
    },
    { key: "total_leaves" },
    { key: "reason" },
    {
      key: "status",
      render: (row) => (
        <span
          className="font-semibold"
          style={{
            color:
              row.status === "approved"
                ? themes.success
                : row.status === "rejected"
                  ? themes.danger
                  : themes.warning,
          }}
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
    { key: "upload_doc", label: "Document", render: (v) => v && <img src={v} className="h-20 rounded border" /> },
    // {
    //   key: "approved_by",
    //   label: "Approved By",
    //   format: (id) => {
    //     const emp = employees.find(e => e.id === id);
    //     return emp ? `${emp.first_name} ${emp.last_name}` : "-";
    //   },
    // },
    {
      label: "Approved By",
      name: "approved_by",
      type: "select",
      options: hrEmployees.map(e => ({
        label: `${e.first_name} ${e.last_name}`,
        value: e.id,
      })),
    }
  ];

  // ================= FORM FIELDS =================
  const getFormFields = () => {
    const baseFields = [
      {
        label: "Leave Type",
        name: "leave_type",
        type: "select",
        required: true,
        options: [
          { label: "CL", value: "CL" },
          { label: "PL", value: "PL" },
          { label: "SL", value: "SL" },
        ],
      },
      { label: "Start Date", name: "start_date", type: "date", required: true },
      { label: "End Date", name: "end_date", type: "date", required: true },
      { label: "Total Leaves", name: "total_leaves", type: "number", required: true },
      { label: "Reason", name: "reason", type: "textarea", required: true },
      { label: "Upload Document", name: "upload_doc", type: "file", previewKey: "upload_doc" },
    ];

    // 🔥 Only HR can see/change status and approved_by
    if (isHR) {
      baseFields.push(
        {
          label: "Status",
          name: "status",
          type: "select",
          required: true,
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
          options: hrEmployees.map(e => ({
            label: `${e.first_name} ${e.last_name}`,
            value: e.id,
          })),
        }
      );
    }

    // 🔥 Employee field - only show for HR, for non-HR it will be auto-set
    if (isHR || employeeFilterId) {
      baseFields.unshift({
        label: "Employee",
        name: "employee_id",
        type: "select",
        required: true,
        options: employees.map(e => ({
          label: `${e.first_name} ${e.last_name}`,
          value: e.id,
        })),
        disabled: !!employeeFilterId,
        defaultValue: employeeFilterId || "",
      });
    }

    return baseFields;
  };

  // ================= VIEW MODE =================
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

  // ================= LIST MODE =================
  if (mode === "list") {
    const listContent = (
      <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <SectionTitle title="LEAVE REQUESTS" />

          <div className="flex flex-wrap gap-3 self-end ml-auto">
            <SearchBar value={search} onChange={setSearch} placeholder="Search leaves..." />
            {/* 🔥 Add button visible to both HR and non-HR */}
            <ActionButtons
              showAdd
              addText="+ Add"
              onAdd={() => {
                setSelectedItem(null);
                setMode("form");
              }}
            />
          </div>
        </div>

        <Table header={<TableHeader columns={["Employee", "Type", "Start", "End", "Days", "Reason", "Status", "Action"]} />}>
          {filteredLeaves.map((l, index) => (
            <EntityTableRow
              key={l.id}
              row={l}
              index={index}
              columns={leaveColumns}
              onView={(r) => { setSelectedItem(r); setMode("view"); }}
              onEdit={(r) => {
                // 🔥 Non-HR can only edit their own pending requests
                if (!isHR && r.status !== "pending") {
                  alert("You can only edit pending leave requests");
                  return;
                }
                setSelectedItem(r);
                setMode("form");
              }}
              onDelete={(id) => {
                // 🔥 Non-HR can only delete their own pending requests
                const leaveToDelete = leaves.find(l => l.id === id);
                if (!isHR && leaveToDelete?.status !== "pending") {
                  alert("You can only delete pending leave requests");
                  return;
                }
                handleDelete(id);
              }}
            />
          ))}
        </Table>
        {loading && <LoadingSpinner text="Loading Leave Request..." />}
      </>
    );

    if (asSubcomponent) {
      return <div className="w-full bg-white rounded-lg p-5 shadow-sm">{listContent}</div>;
    }

    return <PageContainer>{listContent}</PageContainer>;
  }

  // ================= FORM MODE =================
  return (
    <EntityPageLayout title="Leave Request" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Leave" : "Create Leave"}
        selectedItem={selectedItem}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={getFormFields()}
      />
    </EntityPageLayout>
  );
}