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

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   // const onSubmit = async (data) => {
//   //   try {
//   //     if (selectedItem) {
//   //       await updateLead(selectedItem.id, data);
//   //     } else {
//   //       await createLead(data);
//   //     }

//   //     alert("Saved successfully");
//   //     setMode("list");
//   //     fetchLeads();

//   //   } catch (err) {
//   //     console.log("API ERROR:", err.response?.data);
//   //     alert(JSON.stringify(err.response?.data));
//   //   }
//   // };
// const onSubmit = async (data) => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     data.created_by = user?.id;   // 🔴 ADD THIS

//     if (selectedItem) {
//       await updateLead(selectedItem.id, data);
//     } else {
//       await createLead(data);
//     }

//     alert("Saved successfully");
//     setMode("list");
//     fetchLeads();

//   } catch (err) {
//     console.log("API ERROR:", err.response?.data);
//     alert(JSON.stringify(err.response?.data));
//   }
// };

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
//           { label: "Address", name: "address" },
//           { label: "City", name: "city" },
//           { label: "State", name: "state" },
//           { label: "Location", name: "location" },
//           {
//             label: "Interest Level",
//             name: "interest_level",
//             type: "select",
//             options: [
//               { label: "High", value: "High" },
//               { label: "Medium", value: "Medium" },
//               { label: "Low", value: "Low" },
//             ],
//           },
//           {
//             label: "Lead Status",
//             name: "lead_status",
//             type: "select",
//             options: [
//               { label: "Lead", value: "Lead" },
//               { label: "Converted", value: "Converted" },
//               { label: "Closed", value: "Closed" },
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
import LeadsRow from "../components/table/LeadsRow";
import LeadsViewCard from "../components/view/LeadsViewCard";
import LeadsTableHeader from "../components/table/LeadsTableHeader";

import { getLeads, createLead, updateLead, deleteLead } from "../services/leads.service";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchLeads = async () => {
    const res = await getLeads();
    setLeads(res.data.data || []);
  };

  useEffect(() => { fetchLeads(); }, []);

  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      data.created_by = user?.id;

      selectedItem
        ? await updateLead(selectedItem.id, data)
        : await createLead(data);

      alert("Saved successfully");
      setMode("list");
      fetchLeads();
    } catch (err) {
      alert(JSON.stringify(err.response?.data));
    }
  };

  const handleDelete = async (id) => {
    await deleteLead(id);
    fetchLeads();
  };

  // LIST SAME
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Leads" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
        </div>

        <Table header={<LeadsTableHeader />}>
          {leads.map(l => (
            <LeadsRow
              key={l.id}
              row={l}
              onView={(r) => { setSelectedItem(r); setMode("view"); }}
              onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  // VIEW
  if (mode === "view" && selectedItem) {
    return (
      <EntityPageLayout title="Lead Details" showBack onBack={() => setMode("list")}>
        <LeadsViewCard lead={selectedItem} />
      </EntityPageLayout>
    );
  }

  // FORM
  return (
    <EntityPageLayout title="Leads" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedItem ? "Edit Lead" : "Create Lead"}
        selectedItem={selectedItem}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          { label: "Lead Type", name: "lead_type", type: "select", options: [
            { label: "Distributor", value: "Distributor" },
            { label: "Dealer", value: "Dealer" },
            { label: "Retailer", value: "Retailer" },
          ], required: true },

          { label: "Business Name", name: "business_name", required: true },
          { label: "Contact Person", name: "contact_person" },
          { label: "Phone", name: "phone" },
          { label: "Email", name: "email" },
          { label: "Address", name: "address", type: "textarea" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Location", name: "location" },

          { label: "Interest Level", name: "interest_level", type: "select", options: [
            { label: "High", value: "High" },
            { label: "Medium", value: "Medium" },
            { label: "Low", value: "Low" },
          ]},

          { label: "Lead Status", name: "lead_status", type: "select", options: [
            { label: "Lead", value: "Lead" },
            { label: "Converted", value: "Converted" },
            { label: "Closed", value: "Closed" },
          ]},

          { label: "Remarks", name: "remarks", type: "textarea" },
          { label: "Lead Source", name: "lead_source" },
        ]}
      />
    </EntityPageLayout>
  );
}
