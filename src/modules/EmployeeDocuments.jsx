// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import EntityForm from "../components/form/EntityForm";
// import EmployeeDocumentsRow from "../components/table/EmployeeDocumentsRow";
// import EmployeeDocumentsViewCard from "../components/view/EmployeeDocumentsViewCard";

// import { getEmployees } from "../services/employee.service";
// import api from "../services/api";

// export default function EmployeeDocuments() {
//   const [documents, setDocuments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   const fetchDocs = async () => {
//     const res = await api.get("employee-documents/");
//     setDocuments(res.data.data || []);
//   };

//   const fetchEmployees = async () => {
//     const res = await getEmployees();
//     setEmployees(res.data.data || []);
//   };

//   useEffect(() => {
//     fetchDocs();
//     fetchEmployees();
//   }, []);

// const onSubmit = async (data) => {
//   try {
//     const formData = new FormData();

//     Object.keys(data).forEach(key => {
//       if (data[key] instanceof FileList) {
//         if (data[key].length > 0) {
//           formData.append(key, data[key][0]); // file
//         }
//       } else if (data[key] !== undefined && data[key] !== null) {
//         formData.append(key, data[key]);
//       }
//     });

//     if (selectedItem) {
//       await api.patch(
//         `employee-documents/${selectedItem.id}/`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//     } else {
//       await api.post(
//         "employee-documents/",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//     }

//     alert("Saved successfully");
//     setMode("list");
//     fetchDocs();

//   } catch (err) {
//     console.error("SAVE ERROR:", err.response?.data || err.message);
//     alert("Save failed — check console");
//   }
// };


//   const handleDelete = async (id) => {
//     await api.delete(`employee-documents/${id}/`);
//     fetchDocs();
//   };

//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Employee Documents" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
//         </div>

//         <Table header={<TableHeader columns={["Employee","PAN","Aadhar","DL","Uploaded","Action"]} />}>
//           {documents.map(d => {
//             const emp = employees.find(e => e.id === d.employee_id);
//             return (
//               <EmployeeDocumentsRow
//                 key={d.id}
//                 row={d}
//                 employeeName={emp ? `${emp.employee_code} - ${emp.first_name}` : "—"}
//                 onView={(r) => { setSelectedItem(r); setMode("view"); }}
//                 onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//                 onDelete={(id) => handleDelete(id)}
//               />
//             );
//           })}
//         </Table>
//       </PageContainer>
//     );
//   }

//   if (mode === "view" && selectedItem) {
//     const emp = employees.find(e => e.id === selectedItem.employee_id);
//     return (
//       <EntityPageLayout title="Employee Documents" showBack onBack={() => setMode("list")}>
//         <EmployeeDocumentsViewCard
//           docs={selectedItem}
//           employeeName={emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : "Employee"}
//         />
//       </EntityPageLayout>
//     );
//   }

//   const BASE_URL = api.defaults.baseURL;

//   return (
//     <EntityPageLayout title="Employee Documents" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Documents" : "Upload Documents"}
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
//               label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//           },
//           { label: "PAN Number", name: "pancard_number" },
//           { label: "Aadhar Number", name: "aadhar_number" },
//           { label: "Driving License Number", name: "driving_license_number" },

//           { label: "Photo", name: "photo", type: "file", preview: selectedItem?.photo && BASE_URL + selectedItem.photo },
//           { label: "Aadhar Front", name: "aadhar_front", type: "file", preview: selectedItem?.aadhar_front && BASE_URL + selectedItem.aadhar_front },
//           { label: "Aadhar Back", name: "aadhar_back", type: "file", preview: selectedItem?.aadhar_back && BASE_URL + selectedItem.aadhar_back },
//           { label: "PAN Card", name: "pan_card", type: "file", preview: selectedItem?.pan_card && BASE_URL + selectedItem.pan_card },
//           { label: "DL Front", name: "driving_license_front", type: "file", preview: selectedItem?.driving_license_front && BASE_URL + selectedItem.driving_license_front },
//           { label: "DL Back", name: "driving_license_back", type: "file", preview: selectedItem?.driving_license_back && BASE_URL + selectedItem.driving_license_back },
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
// import EmployeeDocumentsRow from "../components/table/EmployeeDocumentsRow";
// import EmployeeDocumentsViewCard from "../components/view/EmployeeDocumentsViewCard";

// import { getEmployees } from "../services/employee.service";
// import {
//   getDocumentsOfEmployee,
//   createDocumentsOfEmployee,
//   updateDocumentsOfEmployee,
//   deleteDocumentsOfEmployee
// } from "../services/documentsofemployee.service";

// export default function EmployeeDocuments() {
//   const [documents, setDocuments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedItem, setSelectedItem] = useState(null);

//   const fetchDocs = async () => {
//     const res = await getDocumentsOfEmployee();
//     setDocuments(res.data.data || res.data || []);
//   };

//   const fetchEmployees = async () => {
//     const res = await getEmployees();
//     setEmployees(res.data.data || res.data || []);
//   };

//   useEffect(() => {
//     fetchDocs();
//     fetchEmployees();
//   }, []);

// const onSubmit = async (data) => {
//   try {

//     const empId = data.employee_id;

//     // 🔥 CHECK IF EMPLOYEE ALREADY HAS DOCS
//     const alreadyExists = documents.some(doc =>
//       (doc.employee || doc.employee_id) === Number(empId) &&
//       (!selectedItem || doc.id !== selectedItem.id) // allow edit same record
//     );

//     if (alreadyExists) {
//       alert("Documents already exist for this employee!");
//       return; // stop save
//     }

//     const cleanData = {};

//     Object.keys(data).forEach(key => {
//       if (data[key] instanceof FileList) {
//         if (data[key].length > 0) {
//           cleanData[key] = data[key][0];
//         }
//       } else if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
//         cleanData[key] = data[key];
//       }
//     });

//     if (selectedItem) {
//       await updateDocumentsOfEmployee(selectedItem.id, cleanData);
//     } else {
//       await createDocumentsOfEmployee(cleanData);
//     }

//     alert("Saved successfully");
//     setMode("list");
//     fetchDocs();

//   } catch (err) {
//     console.error("SAVE ERROR:", err.response?.data || err.message);
//     alert("Save failed");
//   }
// };


//   const handleDelete = async (id) => {
//     await deleteDocumentsOfEmployee(id);
//     fetchDocs();
//   };

//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Employee Documents" />
//           <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
//         </div>

//         <Table header={<TableHeader columns={["Employee","PAN","Aadhar","DL","Uploaded","Action"]} />}>
//           {documents.map(d => {
//             const emp = employees.find(e => e.id === (d.employee || d.employee_id));
//             return (
//               <EmployeeDocumentsRow
//                 key={d.id}
//                 row={d}
//                 employeeName={emp ? `${emp.employee_code} - ${emp.first_name}` : "—"}
//                 onView={(r) => { setSelectedItem(r); setMode("view"); }}
//                 onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
//                 onDelete={(id) => handleDelete(id)}
//               />
//             );
//           })}
//         </Table>
//       </PageContainer>
//     );
//   }

//   if (mode === "view" && selectedItem) {
//     const emp = employees.find(e => e.id === (selectedItem.employee || selectedItem.employee_id));
//     return (
//       <EntityPageLayout title="Employee Documents" showBack onBack={() => setMode("list")}>
//         <EmployeeDocumentsViewCard
//           docs={selectedItem}
//           employeeName={emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : "Employee"}
//         />
//       </EntityPageLayout>
//     );
//   }

//   return (
//     <EntityPageLayout title="Employee Documents" showBack onBack={() => setMode("list")}>
//       <EntityForm
//         title={selectedItem ? "Edit Documents" : "Upload Documents"}
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
//               label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
//               value: e.id,
//             })),
//           },
//           { label: "PAN Number", name: "pancard_number" },
//           { label: "Aadhar Number", name: "aadhar_number" },
//           { label: "Driving License Number", name: "driving_license_number" },
//           { label: "Photo", name: "photo", type: "file" },
//           { label: "Aadhar Front", name: "aadhar_front", type: "file" },
//           { label: "Aadhar Back", name: "aadhar_back", type: "file" },
//           { label: "PAN Card", name: "pan_card", type: "file" },
//           { label: "DL Front", name: "driving_license_front", type: "file" },
//           { label: "DL Back", name: "driving_license_back", type: "file" },
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
import EmployeeDocumentsViewCard from "../components/view/EmployeeDocumentsViewCard";

import { EmployeeAPI,EmployeeDocsAPI } from "../services/apiService";
// import {
//   getDocumentsOfEmployee,
//   createDocumentsOfEmployee,
//   updateDocumentsOfEmployee,
//   deleteDocumentsOfEmployee
// } from "../services/documentsofemployee.service";

export default function EmployeeDocuments() {
  const [documents, setDocuments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

//   const fetchDocs = async () => {
// const res = await EmployeeDocsAPI.getAll();
//     setDocuments(res.data.data || res.data || []);
//   };
const fetchDocuments = async () => {
  const res = await EmployeeDocsAPI.getAll();
  const data = res.data?.data || [];

  const formatted = data.map(d => ({
    ...d,
    employeeName: d.employee_name, // backend field
  }));

  setDocuments(formatted);
};

const fetchEmployees = async () => {
  const res = await EmployeeAPI.getAll();
  setEmployees(res.data?.data || []);
};


  useEffect(() => {
    fetchDocuments();
    fetchEmployees();
  }, []);

  // ================= SAVE =================
  const onSubmit = async (data) => {
    try {
      const empIdNum = Number(data.employee_id);

      // 🔥 FIXED UNIQUE CHECK
      const alreadyExists = documents.some(doc => {
        const docEmpId = Number(doc.employee || doc.employee_id);

        // If editing same record, allow
        if (selectedItem && doc.id === selectedItem.id) return false;

        return docEmpId === empIdNum;
      });

      if (alreadyExists) {
        alert("Documents already exist for this employee!");
        return;
      }

      const cleanData = {};

      Object.keys(data).forEach(key => {
        if (data[key] instanceof FileList) {
          if (data[key].length > 0) cleanData[key] = data[key][0];
        } else if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
          cleanData[key] = data[key];
        }
      });

      if (selectedItem) {
        await updateDocumentsOfEmployee(selectedItem.id, cleanData);
      } else {
        await createDocumentsOfEmployee(cleanData);
      }

      alert("Saved successfully");
      setMode("list");
      fetchDocuments();

    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err.message);
      alert("Save failed");
    }
  };

  const handleDelete = async (id) => {
    await deleteDocumentsOfEmployee(id);
    fetchDocuments();
  };
const documentColumns = [
  {
    key: "employeeName",
    render: (row) => row.employeeName,
  },
  { key: "pancard_number" },
  { key: "aadhar_number" },
  { key: "driving_license_number" },
  {
    key: "uploaded_at",
    render: (row) => row.uploaded_at?.slice(0, 10),
  },
];

  // ================= LIST PAGE =================
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employee Documents" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
        </div>

        <Table header={<TableHeader columns={["Employee","PAN","Aadhar","DL","Uploaded","Action"]} />}>
       {documents.map((doc, index) => (
  <EntityTableRow
    key={doc.id}
    row={doc}
    index={index}
    columns={documentColumns}
    onView={(r) => {
      setSelectedDocuments(r);
      setMode("view");
    }}
    onEdit={(r) => {
      setSelectedDocuments(r);
      setMode("form");
    }}
    onDelete={(id) =>
      EmployeeDocsAPI.delete(id).then(fetchDocuments)
    }
  />
))}

        </Table>
      </PageContainer>
    );
  }

  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
    const emp = employees.find(e => e.id === (selectedItem.employee || selectedItem.employee_id));
    return (
      <EntityPageLayout title="Employee Documents" showBack onBack={() => setMode("list")}>
        <EmployeeDocumentsViewCard
          docs={selectedItem}
          employeeName={emp ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}` : "Employee"}
        />
      </EntityPageLayout>
    );
  }

  // ================= FORM =================
  return (
    <EntityPageLayout title="Employee Documents" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Documents" : "Upload Documents"}
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
              label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
          },
          { label: "PAN Number", name: "pancard_number" },
          { label: "Aadhar Number", name: "aadhar_number" },
          { label: "Driving License Number", name: "driving_license_number" },
          { label: "Photo", name: "photo", type: "file" },
          { label: "Aadhar Front", name: "aadhar_front", type: "file" },
          { label: "Aadhar Back", name: "aadhar_back", type: "file" },
          { label: "PAN Card", name: "pan_card", type: "file" },
          { label: "DL Front", name: "driving_license_front", type: "file" },
          { label: "DL Back", name: "driving_license_back", type: "file" },
        ]}
      />
    </EntityPageLayout>
  );
}
