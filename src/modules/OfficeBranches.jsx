// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import { themes } from "../config/theme.config";

// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import OfficeBranchRow from "../components/table/OfficeBranchRow";

// import FormWrapper from "../components/form/FormWrapper";
// import FormContainer from "../components/form/FormContainer";
// import FormInput from "../components/form/FormInput";
// import FormTextarea from "../components/form/FormTextarea";
// import FormActions from "../components/form/FormActions";
// import FormSection from "../components/form/FormSection";

// import {
//   getOfficeBranches,
//   createOfficeBranch,
//   updateOfficeBranch,
//   deleteOfficeBranch,
// } from "../services/officebranches.service";

// export default function OfficeBranches() {
//   const [branches, setBranches] = useState([]);
//   const [mode, setMode] = useState("list"); // list | view | form
//   const [selected, setSelected] = useState(null);

//   const fetchBranches = async () => {
//     const res = await getOfficeBranches();
//     setBranches(res.data);
//   };

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   const onSubmit = async (data) => {
//     if (selected) {
//       await updateOfficeBranch(selected.id, data);
//     } else {
//       await createOfficeBranch(data);
//     }
//     setMode("list");
//     setSelected(null);
//     fetchBranches();
//   };

//   const handleDelete = async (id) => {
//     if (confirm("Are you sure?")) {
//       await deleteOfficeBranch(id);
//       fetchBranches();
//     }
//   };

//   /* ================= LIST ================= */
//   if (mode === "list") {
//     return (
//       <PageContainer>
//       <div className="flex items-center justify-between mb-4">
//   {/* CENTER TITLE */}
//   <h2 className="text-lg font-semibold text-left flex-1">
//     Office Branches
//   </h2>

//   {/* RIGHT BUTTON */}
//   <button
//     className="px-4 py-2 rounded text-white cursor-pointer"
//     style={{ backgroundColor: themes.primary }}
//     onClick={() => {
//       setSelectedBranch(null);
//       setMode("form");
//     }}
//   >
//     + Add Office Branch
//   </button>
// </div>


//         <Table
//           header={
//             <TableHeader
//               columns={[
//                 "Name",
//                 "Address",
//                 "City",
//                 "State",
//                 "Country",
//                 "Action",
//               ]}
//             />
//           }
//         >
//           {branches.map((b) => (
//             <OfficeBranchRow
//               key={b.id}
//               row={b}
//               onView={() => {
//                 setSelected(b);
//                 setMode("view");
//               }}
//               onEdit={() => {
//                 setSelected(b);
//                 setMode("form");
//               }}
//               onDelete={() => handleDelete(b.id)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   /* ================= VIEW ================= */
//   if (mode === "view" && selected) {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <FormSection title="Office Branch Details" />

//           <button
//             className="px-4 py-2 rounded text-white"
//             style={{ backgroundColor: themes.primary }}
//             onClick={() => setMode("list")}
//           >
//             Back to List
//           </button>
//         </div>

//         <FormContainer title="View Office Branch">
//           <FormInput label="Name" value={selected.name} readOnly />
//           <FormInput label="Address" value={selected.address} readOnly />
//           <FormInput label="City" value={selected.city} readOnly />
//           <FormInput label="State" value={selected.state} readOnly />
//           <FormInput label="Country" value={selected.country} readOnly />

//           <FormActions onCancel={() => setMode("list")} hideSubmit />
//         </FormContainer>
//       </PageContainer>
//     );
//   }

//   /* ================= FORM ================= */
//   return (
//     <PageContainer>
//       <div className="flex justify-between items-center mb-4">
//         <FormSection title="Office Branch Details" />

//         <button
//           className="px-4 py-2 rounded text-white"
//           style={{ backgroundColor: themes.primary }}
//           onClick={() => {
//             setSelected(null);
//             setMode("list");
//           }}
//         >
//           Back to List
//         </button>
//       </div>

//       <FormWrapper onSubmit={onSubmit}>
//         {(methods) => {
//           const { register, reset } = methods;

//           useEffect(() => {
//             if (selected) reset(selected);
//             else reset({});
//           }, [selected, reset]);

//           return (
//             <FormContainer
//               title={selected ? "Edit Office Branch" : "Create Office Branch"}
//             >
//               <FormInput label="Name" name="name" register={register} required />
//               <FormTextarea
//                 label="Address"
//                 name="address"
//                 register={register}
//               />
//               <FormInput label="City" name="city" register={register} />
//               <FormInput label="State" name="state" register={register} />
//               <FormInput label="Country" name="country" register={register} />

//               <FormActions
//                 onCancel={() => {
//                   setSelected(null);
//                   setMode("list");
//                 }}
//               />
//             </FormContainer>
//           );
//         }}
//       </FormWrapper>
//     </PageContainer>
//   );
// }


// import { useEffect, useState } from "react";
// import PageContainer from "../layout/PageContainer";
// import { themes } from "../config/theme.config";

// import Table from "../components/table/Table";
// import TableHeader from "../components/table/TableHeader";
// import OfficeBranchRow from "../components/table/OfficeBranchRow";

// import FormWrapper from "../components/form/FormWrapper";
// import FormContainer from "../components/form/FormContainer";
// import FormInput from "../components/form/FormInput";
// import FormTextarea from "../components/form/FormTextarea";
// import FormActions from "../components/form/FormActions";

// import {
//   getOfficeBranches,
//   createOfficeBranch,
//   updateOfficeBranch,
//   deleteOfficeBranch,
// } from "../services/officebranches.service";

// import ActionButtons from "../components/form/ActionButton";
// import SectionTitle from "../components/form/SectionTitle";
// import EntityPageLayout from "../layout/EntityPageLayout";
// import BranchViewCard from "../components/form/BranchViewCard";
// import BranchForm from "../components/form/BranchForm";

// export default function OfficeBranch() {
//   const [branches, setBranches] = useState([]);
//   const [mode, setMode] = useState("list");
//   const [selectedBranch, setSelectedBranch] = useState(null);

//   const fetchBranches = async () => {
//     const res = await getOfficeBranches();
//     setBranches(res.data);
//   };

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   const onSubmit = async (data) => {
//     if (selectedBranch) {
//       await updateOfficeBranch(selectedBranch.id, data);
//     } else {
//       await createOfficeBranch(data);
//     }
//     setMode("list");
//     setSelectedBranch(null);
//     fetchBranches();
//   };

//   const handleDelete = async (id) => {
//     if (confirm("Are you sure?")) {
//       await deleteOfficeBranch(id);
//       fetchBranches();
//     }
//   };

//   /* ================= LIST ================= */
//   if (mode === "list") {
//     return (
//       <PageContainer>
//         <div className="flex justify-between items-center mb-4">
//           <SectionTitle title="Office Branches" />
//           <ActionButtons
//             showAdd
//             addText="+ Add Office Branch"
//             onAdd={() => {
//               setSelectedBranch(null);
//               setMode("form");
//             }}
//           />
//         </div>

//         <Table
//           header={
//             <TableHeader
//               columns={[
//                 "Name",
//                 "Address",
//                 "City",
//                 "State",
//                 "Country",
//                 "Action",
//               ]}
//             />
//           }
//         >
//           {branches.map((b) => (
//             <OfficeBranchRow
//               key={b.id}
//               row={b}
//               onView={() => {
//                 setSelectedBranch(b);
//                 setMode("view");
//               }}
//               onEdit={() => {
//                 setSelectedBranch(b);
//                 setMode("form");
//               }}
//               onDelete={() => handleDelete(b.id)}
//             />
//           ))}
//         </Table>
//       </PageContainer>
//     );
//   }

//   /* ================= VIEW ================= */
// if (mode === "view" && selectedBranch) {
//   return (
//     <EntityPageLayout
//       title="Office Branch Details"
//       showBack
//       onBack={() => setMode("list")}
//     >
//       <BranchViewCard branch={selectedBranch} />
//     </EntityPageLayout>
//   );
// }


//   /* ================= FORM ================= */
// /* ================= FORM ================= */
// return (
//   <EntityPageLayout
//     title="Office Branch Details"
//     showBack
//     onBack={() => setMode("list")}
//   >
//     <BranchForm
//       selectedBranch={selectedBranch}
//       onSubmit={onSubmit}
//       setMode={setMode}
//     />
//   </EntityPageLayout>
// );

// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>
//         {label}
//       </p>
//       <p className="font-medium text-sm" style={{ color: themes.backgroundDark }}>
//         {value || "-"}
//       </p>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import OfficeBranchRow from "../components/table/OfficeBranchRow";

import {
  getOfficeBranches,
  createOfficeBranch,
  updateOfficeBranch,
  deleteOfficeBranch,
} from "../services/officebranches.service";

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import BranchViewCard from "../components/view/BranchViewCard";
import EntityForm from "../components/form/EntityForm";

export default function OfficeBranch() {
  const [branches, setBranches] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedBranch, setSelectedBranch] = useState(null);

const fetchBranches = async () => {
  const res = await getOfficeBranches();
  setBranches(res.data.data);   // ✅ actual array
};
  useEffect(() => { fetchBranches(); }, []);

  const onSubmit = async (data) => {
    selectedBranch
      ? await updateOfficeBranch(selectedBranch.id, data)
      : await createOfficeBranch(data);
    setMode("list");
    fetchBranches();
  };

  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Office Branches" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Name","Address","City","State","Country","Action"]} />}>
          {branches.map((b,index) => (
            <OfficeBranchRow
          
              key={b.id}
              row={b}
                index={index}   
              onView={() => { setSelectedBranch(b); setMode("view"); }}
              onEdit={() => { setSelectedBranch(b); setMode("form"); }}
              onDelete={() => deleteOfficeBranch(b.id).then(fetchBranches)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  if (mode === "view" && selectedBranch) {
    return (
      <EntityPageLayout title="Office Branch Details" showBack onBack={() => setMode("list")}>
        <BranchViewCard branch={selectedBranch} />
      </EntityPageLayout>
    );
  }

  return (
    <EntityPageLayout title="Office Branch Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedBranch ? "Edit Office Branch" : "Create Office Branch"}
        selectedItem={selectedBranch}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          { label: "Name", name: "name", required: true },
          { label: "Address", name: "address", type: "textarea" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Country", name: "country" },
        ]}
      />
    </EntityPageLayout>
  );
}
