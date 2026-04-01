
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

// import { EmployeeAPI,EmployeePersonalAPI } from "../services";
// import SearchBar from "../components/table/SearchBar";

// // import {  } from "../services";

// export default function EmployeePersonalDetails() {
//   const [details, setDetails] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);
// const [search, setSearch] = useState("");



// const fetchDetails = async () => {
//   const res = await EmployeePersonalAPI.getAll();
//   const data = res.data?.data || [];

//   const formatted = data.map(d => {
//     const emp = employees.find(e => e.id === d.employee_id);

//     return {
//       ...d,
//       employeeName: emp
//         ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
//         : "—",
//     };
//   });

//   setDetails(formatted);
// };

//   const fetchEmployees = async () => {
//     const res = await EmployeeAPI.getAll();
//     setEmployees(res.data.data || []);
//   };


// useEffect(() => {
//   const load = async () => {
//     const resEmp = await EmployeeAPI.getAll();
//     const empData = resEmp.data.data || [];
//     setEmployees(empData);
//   };

//   load();
// }, []);
// useEffect(() => {
//   if (employees.length > 0) {
//     fetchDetails();
//   }
// }, [employees]);
// const filteredDetails = details.filter(d =>
//   `${d.employeeName} ${d.father_name} ${d.mother_name} ${d.emergency_contact_phone}`
//     .toLowerCase()
//     .includes(search.toLowerCase())
// );

//   // ================= SAVE =================
//   const onSubmit = async (data) => {
//     try {
//       const payload = { ...data, employee_id: Number(data.employee_id), marital_status: data.marital_status?.toLowerCase(), };

//       // 🔥 UNIQUE CHECK
//       const exists = details.find(
//         d =>
//           d.employee_id === payload.employee_id &&
//           (!selectedItem || d.id !== selectedItem.id)
//       );

//       if (exists) {
//         alert("This employee already has personal details!");
//         return;
//       }

//       if (selectedItem) {
//         await EmployeePersonalAPI.update(selectedItem.id, payload);
//       } else {
//         await EmployeePersonalAPI.create(payload);
//       }

//       alert("Saved successfully");
//       setMode("list");
//       fetchDetails();

//     } catch (err) {
//       console.error("SAVE ERROR:", err.response?.data || err.message);
//       alert("Save failed — check console");
//     }
//   };


//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     await EmployeePersonalAPI.delete(id);
//     fetchDetails();
//   };
//   const personalColumns = [
//     {
//       key: "employeeName",
//       render: (row) => row.employeeName,   // we inject this while mapping
//     },
//     { key: "father_name" },
//     { key: "mother_name" },
//     { key: "marital_status" },
//     { key: "emergency_contact_phone" },
//   ];
// const personalFields = [
//   { key: "employeeName", label: "Employee" },
//   { key: "father_name", label: "Father Name" },
//   { key: "mother_name", label: "Mother Name" },
//   { key: "marital_status", label: "Marital Status" },
//   { key: "spouse_name", label: "Spouse Name" },
//   { key: "address", label: "Address" },
//   { key: "emergency_contact_name", label: "Emergency Contact Name" },
//   { key: "emergency_contact_phone", label: "Emergency Contact Phone" },
// ];

//   // ================= LIST PAGE =================
//   if (mode === "list") {
//     return (
//       <PageContainer>
//        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
//   <SectionTitle title="Employee Personal Details" />

//   <div className="flex gap-3">
//     <SearchBar value={search} onChange={setSearch} placeholder="Search details..." />
//     <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//   </div>
// </div>


//         <Table
//           header={
//             <TableHeader
//               columns={[
//                 "Employee",
//                 "Father Name",
//                 "Mother Name",
//                 "Marital Status",
//                 "Emergency Contact",
//                 "Action",
//               ]}
//             />
//           }
//         >
// {filteredDetails.map((d, index) => (
//             <EntityTableRow
//               key={d.id}
//               row={d}
//               index={index}
//               columns={personalColumns}
//               onView={(r) => {
//                 setSelectedItem(r);
//                 setMode("view");
//               }}
//               onEdit={(r) => {
//                 setSelectedItem(r);
//                 setMode("form");
//               }}
//               onDelete={(id) =>
//                 EmployeePersonalAPI.delete(id).then(fetchDetails)
//               }
//             />
//           ))}

//         </Table>
//       </PageContainer>
//     );
//   }

//   // ================= VIEW PAGE =================
// if (mode === "view" && selectedItem) {
//   return (
//     <EntityPageLayout
//       title="Personal Details"
//       showBack
//       onBack={() => setMode("list")}
//     >
//       <EntityViewCard
//         title="Personal Details"
//         data={selectedItem}
//         fields={personalFields}
//         api={EmployeePersonalAPI}
//         onUpdated={fetchDetails}
//         onDeleted={fetchDetails}
//         headerKeys={["employeeName"]}   // ⭐ red header shows employee
//       />
//     </EntityPageLayout>
//   );
// }


//   // ================= FORM PAGE =================
//   return (
//     <EntityPageLayout title="Employee Personal Details" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Personal Details" : "Create Personal Details"}
//         selectedItem={
//           selectedItem
//             ? {
//               ...selectedItem,
//               marital_status:
//                 (selectedItem.marital_status ||
//                   selectedItem.maritalStatus ||
//                   "")
//                   .toString()
//                   .trim()
//                   .toLowerCase() === "married"
//                   ? "married"
//                   : (selectedItem.marital_status ||
//                     selectedItem.maritalStatus ||
//                     "")
//                     .toString()
//                     .trim()
//                     .toLowerCase() === "single"
//                     ? "single"
//                     : "",

//             }
//             : null
//         }
//         onSubmit={onSubmit}
//         setMode={setMode}
//         fields={[
//           {
//             label: "Employee",
//             name: "employee_id",
//             type: "select",
//             options: employees.map(e => ({
//               label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//             required: true,
//           },
//           { label: "Father Name", name: "father_name" },
//           { label: "Mother Name", name: "mother_name" },
//           {
//             label: "Marital Status",
//             name: "marital_status",
//             type: "select",
//             required:true,
//             options: [
//               { label: "Single", value: "single" },
//               { label: "Married", value: "married" },
//             ],
//           },
//           { label: "Spouse Name", name: "spouse_name" },
//           { label: "Address", name: "address", type: "textarea" },
//           { label: "Emergency Contact Name", name: "emergency_contact_name" },
//           { label: "Emergency Contact Phone", name: "emergency_contact_phone" },
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

import { EmployeeAPI, EmployeePersonalAPI } from "../services";
import SearchBar from "../components/table/SearchBar";

// ✅ NEW
import { useUser } from "../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";

export default function EmployeePersonalDetails() {
  const { setError, setSuccess } = useOutletContext();
  // 🔥 role data
  const { employeeId, isHR } = useUser();

  const [details, setDetails] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  // ================= FETCH EMPLOYEES =================
  const fetchEmployees = async () => {
    try {
      const res = await EmployeeAPI.getAll();
      let list = res.data?.data || [];

      // 🔒 non HR → only own employee
      if (!isHR) {
        list = list.filter(e => e.id === employeeId);
      }

      setEmployees(list);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  // ================= FETCH DETAILS =================
  const fetchDetails = async () => {
    try {
      const res = await EmployeePersonalAPI.getAll();
      let data = res.data?.data || [];

      // 🔒 non HR → only own details
      if (!isHR) {
        data = data.filter(d => Number(d.employee_id) === Number(employeeId));
      }

      const formatted = data.map(d => {
        const emp = employees.find(e => e.id === d.employee_id);

        return {
          ...d,
          employeeName: emp
            ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
            : "—",
        };
      });

      setDetails(formatted);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [isHR, employeeId]);

  useEffect(() => {
    if (employees.length > 0) {
      fetchDetails();
    }
  }, [employees, isHR, employeeId]);

  // ================= SEARCH =================
  const filteredDetails = details.filter(d =>
    `${d.employeeName} ${d.father_name} ${d.mother_name} ${d.emergency_contact_phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= SAVE =================
const onSubmit = async (data) => {
  try {
    const payload = {
      ...data,
      employee_id: Number(data.employee_id),
      marital_status: data.marital_status?.toLowerCase(),
    };

    // 🔥 FIXED UNIQUE CHECK
    // When updating, only check if the employee_id is different from the current one
    let exists = false;
    
    if (selectedItem) {
      // For update: check if any OTHER record has this employee_id
      exists = details.find(
        d => d.employee_id === payload.employee_id && d.id !== selectedItem.id
      );
    } else {
      // For create: check if ANY record has this employee_id
      exists = details.find(d => d.employee_id === payload.employee_id);
    }

    if (exists) {
      setError(["This employee already has personal details!"]);
      return;
    }

    if (selectedItem) {
      // For update, only send fields that changed or all fields
      // Option 1: Send only changed fields (better approach)
      const changedFields = {};
      Object.keys(payload).forEach(key => {
        if (payload[key] !== selectedItem[key]) {
          changedFields[key] = payload[key];
        }
      });
      
      // If no fields changed, just return
      if (Object.keys(changedFields).length === 0) {
        setSuccess("No changes to save");
        setMode("list");
        return;
      }
      
      const res = await EmployeePersonalAPI.update(selectedItem.id, changedFields);
      setSuccess(res.data?.message || "Saved successfully");
    } else {
      const res = await EmployeePersonalAPI.create(payload);
      setSuccess(res.data?.message || "Saved successfully");
    }

    setMode("list");
    await fetchDetails(); // Wait for fetch to complete

  } catch (err) {
    // More detailed error handling
    if (err.response?.data?.errors) {
      const errorMessages = Object.values(err.response.data.errors).flat();
      setError(errorMessages);
    } else if (err.response?.data?.error) {
      setError([err.response.data.error]);
    } else {
      setError(parseBackendErrors(err));
    }
    console.error("SAVE ERROR:", err.response?.data || err.message);
  }
};

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const res = await EmployeePersonalAPI.delete(id);
      setSuccess(res.data?.message || "Deleted successfully");
      fetchDetails();
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  // ================= TABLE =================
  const personalColumns = [
    {
      key: "employeeName",
      render: (row) => row.employeeName,
    },
    { key: "father_name" },
    { key: "mother_name" },
    { key: "marital_status" },
    { key: "emergency_contact_phone" },
  ];

  const personalFields = [
    { key: "employeeName", label: "Employee" },
    { key: "father_name", label: "Father Name" },
    { key: "mother_name", label: "Mother Name" },
    { key: "marital_status", label: "Marital Status" },
    { key: "spouse_name", label: "Spouse Name" },
    { key: "address", label: "Address" },
    { key: "emergency_contact_name", label: "Emergency Contact Name" },
    { key: "emergency_contact_phone", label: "Emergency Contact Phone" },
  ];

  // ================= LIST =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 w-full">
          <SectionTitle title="Employee Personal Details" />

          <div className="flex flex-wrap gap-3 self-end">
            <SearchBar value={search} onChange={setSearch} placeholder="Search details..." />
            {isHR && (
              <ActionButtons showAdd addText="+ Add" onAdd={() => {
                setSelectedItem(null);   // ⭐ IMPORTANT RESET
                setMode("form");
              }} />
            )}
          </div>
        </div>

        <Table
          header={
            <TableHeader
              columns={[
                "Employee",
                "Father Name",
                "Mother Name",
                "Marital Status",
                "Emergency Contact",
                "Action",
              ]}
            />
          }
        >
          {filteredDetails.map((d, index) => (
        // In the table section, replace the onDelete prop:
<EntityTableRow
  key={d.id}
  row={d}
  index={index}
  columns={personalColumns}
  onView={(r) => {
    setSelectedItem(r);
    setMode("view");
  }}
  onEdit={(r) => {
    setSelectedItem(r);
    setMode("form");
  }}
  onDelete={() => handleDelete(d.id)}  // ✅ Use the defined handleDelete function
/>
          ))}
        </Table>
      </PageContainer>
    );
  }

  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
    return (
      <EntityPageLayout
        title="Personal Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="Personal Details"
          data={selectedItem}
          fields={personalFields}
          api={EmployeePersonalAPI}
          onUpdated={fetchDetails}
          onDeleted={fetchDetails}
          headerKeys={["employeeName"]}
        />
      </EntityPageLayout>
    );
  }

  // ================= FORM =================
  return (
    <EntityPageLayout title="Employee Personal Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Personal Details" : "Create Personal Details"}
        selectedItem={
          selectedItem
            ? {
              ...selectedItem,
              marital_status:
                selectedItem.marital_status?.toLowerCase() === "married"
                  ? "married"
                  : selectedItem.marital_status?.toLowerCase() === "single"
                    ? "single"
                    : "",
            }
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
              label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
            required: true,
          },
          { label: "Father Name", name: "father_name" },
          { label: "Mother Name", name: "mother_name" },
          {
            label: "Marital Status",
            name: "marital_status",
            type: "select",
            required: true,
            options: [
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
            ],
          },
          { label: "Spouse Name", name: "spouse_name" },
          { label: "Address", name: "address", type: "textarea" },
          { label: "Emergency Contact Name", name: "emergency_contact_name" },
          { label: "Emergency Contact Phone", name: "emergency_contact_phone" },
        ]}
      />
    </EntityPageLayout>
  );
}