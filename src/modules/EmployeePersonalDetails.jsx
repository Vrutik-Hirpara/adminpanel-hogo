// import { useEffect, useState } from "react";
// import axios from "axios";

// const EMPLOYEE_API = "https://hogofilm.pythonanywhere.com/employee/";
// const DETAILS_API = "https://hogofilm.pythonanywhere.com/Employeepersonaldetails/";

// export default function EmployeePersonalDetails() {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [detailsId, setDetailsId] = useState(null);
//   const [form, setForm] = useState({
//     father_name: "",
//     mother_name: "",
//     marital_status: "",
//     spouse_name: "",
//     address: "",
//     emergency_contact_name: "",
//     emergency_contact_phone: "",
//   });

//   // Load employees
//   useEffect(() => {
//     axios.get(EMPLOYEE_API).then(res => {
//       setEmployees(res.data.data);
//     });
//   }, []);

//   // Fetch personal details when employee selected
//   const fetchDetails = async (empId) => {
//     const res = await axios.get(DETAILS_API);
//     const record = res.data.data.find(d => d.employee_id === Number(empId));

//     if (record) {
//       setDetailsId(record.id);
//       setForm(record);
//     } else {
//       setDetailsId(null);
//       setForm({
//         father_name: "",
//         mother_name: "",
//         marital_status: "",
//         spouse_name: "",
//         address: "",
//         emergency_contact_name: "",
//         emergency_contact_phone: "",
//       });
//     }
//   };

//   const handleChange = e =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     if (!selectedEmployee) return alert("Select employee");

//     const payload = { ...form, employee_id: selectedEmployee };

//     if (detailsId) {
//       await axios.patch(`${DETAILS_API}${detailsId}/`, payload);
//       alert("Updated successfully");
//     } else {
//       await axios.post(DETAILS_API, payload);
//       alert("Created successfully");
//     }
//   };

//   const handleDelete = async () => {
//     if (!detailsId) return;
//     await axios.delete(`${DETAILS_API}${detailsId}/`);
//     alert("Deleted");
//     setDetailsId(null);
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl space-y-6">
//       <h2 className="text-xl font-bold">Employee Personal Details</h2>

//       {/* Employee Dropdown */}
//       <select
//         className="w-full border p-2 rounded"
//         value={selectedEmployee}
//         onChange={(e) => {
//           setSelectedEmployee(e.target.value);
//           fetchDetails(e.target.value);
//         }}
//       >
//         <option value="">Select Employee</option>
//         {employees.map(emp => (
//           <option key={emp.id} value={emp.id}>
//             {emp.employee_code} - {emp.first_name} {emp.last_name}
//           </option>
//         ))}
//       </select>

//       {/* Form */}
//       {selectedEmployee && (
//         <div className="grid grid-cols-2 gap-4">
//           {Object.keys(form).map(key => (
//             <input
//               key={key}
//               name={key}
//               value={form[key] || ""}
//               onChange={handleChange}
//               placeholder={key.replace("_", " ")}
//               className="border p-2 rounded"
//             />
//           ))}
//         </div>
//       )}

//       <div className="flex gap-4">
//         <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
//           {detailsId ? "Update" : "Create"}
//         </button>

//         {detailsId && (
//           <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
//             Delete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import axios from "axios";

// const EMPLOYEE_API = "https://hogofilm.pythonanywhere.com/employee/";
// const DETAILS_API = "https://hogofilm.pythonanywhere.com/Employeepersonaldetails";

// export default function EmployeePersonalDetails() {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [detailsId, setDetailsId] = useState(null);
//   const [notFound, setNotFound] = useState(false);

//   const [form, setForm] = useState({
//     father_name: "",
//     mother_name: "",
//     marital_status: "",
//     spouse_name: "",
//     address: "",
//     emergency_contact_name: "",
//     emergency_contact_phone: "",
//   });

//   // Load employees
//   useEffect(() => {
//     axios.get(EMPLOYEE_API).then(res => {
//       setEmployees(res.data.data);
//     });
//   }, []);

//   // Fetch details
//   const fetchDetails = async (empId) => {
//     const res = await axios.get(`${DETAILS_API}/`);
//     const record = res.data.data.find(d => d.employee_id === Number(empId));

//     if (record) {
//       setNotFound(false);
//       setDetailsId(record.id);
//       setForm({
//         father_name: record.father_name || "",
//         mother_name: record.mother_name || "",
//         marital_status: record.marital_status || "",
//         spouse_name: record.spouse_name || "",
//         address: record.address || "",
//         emergency_contact_name: record.emergency_contact_name || "",
//         emergency_contact_phone: record.emergency_contact_phone || "",
//       });
//     } else {
//       setDetailsId(null);
//       setNotFound(true);
//       setForm({
//         father_name: "",
//         mother_name: "",
//         marital_status: "",
//         spouse_name: "",
//         address: "",
//         emergency_contact_name: "",
//         emergency_contact_phone: "",
//       });
//     }
//   };

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // UPDATE ONLY
//   const handleUpdate = async () => {
//     if (!detailsId) return;

//     const payload = {
//       ...form,
//       employee_id: Number(selectedEmployee),
//     };

//     try {
//       await axios.patch(`${DETAILS_API}/${detailsId}/`, payload);
//       alert("Updated successfully");
//     } catch (err) {
//       console.error(err.response?.data || err);
//       alert("Update failed");
//     }
//   };

//   // DELETE
//   const handleDelete = async () => {
//     if (!detailsId) return;

//     try {
//       await axios.delete(`${DETAILS_API}/${detailsId}/`);
//       alert("Deleted successfully");
//       setDetailsId(null);
//       setForm({
//         father_name: "",
//         mother_name: "",
//         marital_status: "",
//         spouse_name: "",
//         address: "",
//         emergency_contact_name: "",
//         emergency_contact_phone: "",
//       });
//       setNotFound(true);
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl space-y-6">
//       <h2 className="text-xl font-bold">Employee Personal Details</h2>

//       {/* Employee Dropdown */}
//       <select
//         className="w-full border p-2 rounded"
//         value={selectedEmployee}
//         onChange={(e) => {
//           setSelectedEmployee(e.target.value);
//           fetchDetails(e.target.value);
//         }}
//       >
//         <option value="">Select Employee</option>
//         {employees.map(emp => (
//           <option key={emp.id} value={emp.id}>
//             {emp.employee_code} - {emp.first_name} {emp.last_name}
//           </option>
//         ))}
//       </select>

//       {/* If No Details Found */}
//       {notFound && selectedEmployee && (
//         <p className="text-red-600 font-medium">
//           No personal details found for this employee.
//         </p>
//       )}

//       {/* Form (only if details exist) */}
//       {detailsId && (
//         <>
//           <div className="grid grid-cols-2 gap-4">
//             {Object.keys(form).map(key => (
//               <input
//                 key={key}
//                 name={key}
//                 value={form[key]}
//                 onChange={handleChange}
//                 placeholder={key.replaceAll("_", " ")}
//                 className="border p-2 rounded"
//               />
//             ))}
//           </div>

//           <div className="flex gap-4">
//             <button
//               onClick={handleUpdate}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Update
//             </button>

//             <button
//               onClick={handleDelete}
//               className="bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </>
//       )}
//     </div>
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
import EmployeePersonalDetailsRow from "../components/table/EmployeePersonalDetailsRow";
import EmployeePersonalDetailsViewCard from "../components/view/EmployeePersonalDetailsViewCard";

import { getEmployees } from "../services/employee.service";
import axios from "axios";

const DETAILS_API = "https://hogofilm.pythonanywhere.com/Employeepersonaldetails/";

export default function EmployeePersonalDetails() {
  const [details, setDetails] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchDetails = async () => {
    const res = await axios.get(DETAILS_API);
    setDetails(res.data.data || []);
  };

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data.data || []);
  };

  useEffect(() => {
    fetchDetails();
    fetchEmployees();
  }, []);

  // const onSubmit = async (data) => {
  //   data.employee_id = Number(data.employee_id);  // 🔥 important

  //   const exists = details.find(d => d.employee_id === data.employee_id);

  //   if (!selectedItem && exists) {
  //     alert("Already exists");
  //     return;
  //   }

  //   selectedItem
  //     ? await axios.patch(`${DETAILS_API}${selectedItem.id}/`, data)
  //     : await axios.post(DETAILS_API, data);

  //   setMode("list");
  //   fetchDetails();
  // };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        employee_id: Number(data.employee_id),   // ensure number
      };

      const exists = details.find(d => d.employee_id === payload.employee_id);

      if (!selectedItem && exists) {
        alert("Already exists");
        return;
      }

      if (selectedItem) {
        await axios.patch(`${DETAILS_API}${selectedItem.id}/`, payload);
      } else {
        await axios.post(DETAILS_API, payload);
      }

      alert("Saved successfully");  // 🟢 so you see response
      setMode("list");
      fetchDetails();

    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err.message);
      alert("Save failed — check console");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${DETAILS_API}${id}/`);
    fetchDetails();
  };


  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employee Personal Details" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
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
          {details.map(d => {
            const emp = employees.find(e => e.id === d.employee_id);

            return (
              <EmployeePersonalDetailsRow
                key={d.id}
                row={d}
  employeeName={
    emp
      ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
      : "—"
  }                onView={(r) => {
                  console.log("VIEW CLICK", r);
                  setSelectedItem(r);
                  setMode("view");
                }}
                onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
                onDelete={(id) => handleDelete(id)}
              />

            );
          })}
        </Table>

      </PageContainer>
    );
  }
  if (mode === "view" && selectedItem) {
    const emp = employees.find(e => e.id === selectedItem.employee_id);

    return (
      <EntityPageLayout
        title="Personal Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EmployeePersonalDetailsViewCard
          details={selectedItem}
employeeName={
  emp
    ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
    : "Employee"
}
        />
      </EntityPageLayout>
    );
  }



  return (
    <EntityPageLayout title="Employee Personal Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Personal Details" : "Create Personal Details"}
        selectedItem={selectedItem}
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
}))
,
            required: true,
          },
          { label: "Father Name", name: "father_name" },
          { label: "Mother Name", name: "mother_name" },
          { label: "Marital Status", name: "marital_status" },
          { label: "Spouse Name", name: "spouse_name" },
          { label: "Address", name: "address", type: "textarea" },
          { label: "Emergency Contact Name", name: "emergency_contact_name" },
          { label: "Emergency Contact Phone", name: "emergency_contact_phone" },
        ]}
      />
    </EntityPageLayout>
  );
}
