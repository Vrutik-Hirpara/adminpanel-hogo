// import { themes } from "../../config/theme.config";

// export default function LeadsViewCard({ lead }) {
//   return (
//     <div
//       className="rounded-xl overflow-hidden"
//       style={{
//         border: `1px solid ${themes.backgroundGray}`,
//         backgroundColor: themes.textWhite,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       {/* 🔴 HEADER */}
//       <div
//         className="px-6 py-4"
//         style={{
//           backgroundColor: themes.primary,
//           color: themes.textWhite,
//         }}
//       >
//         <h3 className="text-lg font-semibold">{lead.business_name}</h3>
//         <p className="text-sm opacity-90">Lead Details</p>
//       </div>

//       {/* ⚪ BODY */}
//       <div className="p-6 space-y-7">

//         {/* STATUS BADGES */}
//     {/* LEAD TYPE BADGE ONLY */}
// <div>
//   <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
//     {lead.lead_type}
//   </span>
// </div>


//         {/* DETAILS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

//           <Detail label="Contact Person" value={lead.contact_person} />
//           <Detail label="Phone" value={lead.phone} />
//           <Detail label="Email" value={lead.email} />

//           <Detail label="Address" value={lead.address} />
//           <Detail label="City" value={lead.city} />
//           <Detail label="State" value={lead.state} />
//           <Detail label="Location" value={lead.location} />
// <Detail label="Interest Level" value={lead.interest_level} />
// <Detail label="Lead Status" value={lead.lead_status} />

//         </div>

//         {/* REMARKS FULL WIDTH */}
//         <div>
//           <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>
//             Remarks
//           </p>
//           <p className="text-sm font-medium" style={{ color: themes.backgroundDark }}>
//             {lead.remarks || "-"}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
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






// import { themes } from "../../config/theme.config";

// export default function LeadsViewCard({ lead }) {
//   return (
//     <div className="rounded-xl border bg-white p-6 space-y-6">
//       <h2 className="text-xl font-semibold" style={{ color: themes.primary }}>Lead Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
//         <Detail label="Business" value={lead.business_name} />
//         <Detail label="Lead Type" value={lead.lead_type} />
//         <Detail label="Contact Person" value={lead.contact_person} />
//         <Detail label="Phone" value={lead.phone} />
//         <Detail label="Email" value={lead.email} />
//         <Detail label="Address" value={lead.address} />
//         <Detail label="City" value={lead.city} />
//         <Detail label="State" value={lead.state} />
//         <Detail label="Location" value={lead.location} />
//         <Detail label="Interest Level" value={lead.interest_level} />
//         <Detail label="Lead Status" value={lead.lead_status} />
//         <Detail label="Remarks" value={lead.remarks} />
//         <Detail label="Lead Source" value={lead.lead_source} />
//         <Detail label="Created By" value={`${lead.created_by_name} (${lead.created_by_code})`} />
//         <Detail label="Assigned To" value={
//           lead.assigned_to_name ? `${lead.assigned_to_name} (${lead.assigned_to_code})` : "—"
//         } />
//         <Detail label="Created At" value={new Date(lead.created_at).toLocaleString()} />
//         <Detail label="Updated At" value={new Date(lead.updated_at).toLocaleString()} />
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="font-medium">{value || "—"}</p>
//     </div>
//   );
// }









// import { themes } from "../../config/theme.config";

// export default function LeadsViewCard({ lead }) {
//   return (
//     <div
//       className="rounded-xl overflow-hidden"
//       style={{
//         border: `1px solid ${themes.backgroundGray}`,
//         backgroundColor: themes.textWhite,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       {/* 🔴 HEADER (same as UserViewCard) */}
//       <div
//         className="px-6 py-4"
//         style={{
//           backgroundColor: themes.primary,
//           color: themes.textWhite,
//         }}
//       >
//         <h3 className="text-lg font-semibold">{lead.business_name}</h3>
//         <p className="text-sm opacity-90">Lead Details</p>
//       </div>

//       {/* ⚪ BODY */}
//       <div className="p-6 space-y-6 text-sm">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           <Detail label="Lead Type" value={lead.lead_type} />
//           <Detail label="Contact Person" value={lead.contact_person} />
//           <Detail label="Phone" value={lead.phone} />
//           <Detail label="Email" value={lead.email} />
//           <Detail label="Address" value={lead.address} />
//           <Detail label="City" value={lead.city} />
//           <Detail label="State" value={lead.state} />
//           <Detail label="Location" value={lead.location} />
//           <Detail label="Interest Level" value={lead.interest_level} />
//           <Detail label="Lead Status" value={lead.lead_status} />
//           <Detail label="Remarks" value={lead.remarks} />
//           <Detail label="Created By" value={lead.created_by_name} />
//           <Detail label="Assigned To" value={lead.assigned_to_name} />
//           <Detail label="Created At" value={lead.created_at?.slice(0,10)} />
//           <Detail label="Updated At" value={lead.updated_at?.slice(0,10)} />

//         </div>
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p
//         className="text-xs mb-1"
//         style={{ color: themes.backgroundGray }}
//       >
//         {label}
//       </p>
//       <p
//         className="font-medium text-sm"
//         style={{ color: themes.backgroundDark }}
//       >
//         {value || "-"}
//       </p>
//     </div>
//   );
// }







// export default function LeadsViewCard({ lead, employees }) {
//   const emp = employees.find(e => e.id === lead.assigned_to);

//   return (
//     <div className="rounded-xl border p-6 bg-white">
//       <h3 className="text-lg font-semibold mb-4">{lead.business_name}</h3>

//       <div className="grid grid-cols-2 gap-4 text-sm">
//         <Detail label="Lead Type" value={lead.lead_type} />
//         <Detail label="Contact Person" value={lead.contact_person} />
//         <Detail label="Phone" value={lead.phone} />
//         <Detail label="Email" value={lead.email} />
//         <Detail label="Address" value={lead.address} />
//         <Detail label="City" value={lead.city} />
//         <Detail label="State" value={lead.state} />
//         <Detail label="Location" value={lead.location} />
//         <Detail label="Interest Level" value={lead.interest_level} />
//         <Detail label="Lead Status" value={lead.lead_status} />
//         <Detail label="Lead Source" value={lead.lead_source} />
//         <Detail label="Remarks" value={lead.remarks} />
//         <Detail label="Created By Code" value={lead.created_by_code} />
//         <Detail label="Assigned Employee Code" value={emp ? emp.employee_code : "-"} />
//         <Detail label="Created At" value={lead.created_at?.slice(0,10)} />
//         <Detail label="Updated At" value={lead.updated_at?.slice(0,10)} />
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs text-gray-400">{label}</p>
//       <p className="font-medium">{value || "-"}</p>
//     </div>
//   );
// }

import { themes } from "../../config/theme.config";

export default function LeadsViewCard({ lead }) {
  return (
    <div style={{ fontFamily: themes.fontPrimary }}>

      {/* 🔴 HEADER */}
      <div
        className="px-6 py-4 rounded-t-xl"
        style={{
          backgroundColor: themes.primary,
          color: themes.textWhite,
        }}
      >
        <h3 className="text-lg font-semibold">{lead.business_name}</h3>
        <p className="text-sm opacity-90">Lead Details</p>
      </div>

      {/* ⚪ BODY WITH BORDER */}
      <div
        className="border rounded-b-xl p-6"
        style={{ borderColor: themes.backgroundGray }}
      >
<div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">

          {/* 🟢 LEFT SIDE */}
          <div className="space-y-4">
            <Detail label="Lead Type" value={lead.lead_type} />
            <Detail label="Contact Person" value={lead.contact_person} />
            <Detail label="Phone" value={lead.phone} />
            <Detail label="Email" value={lead.email} />
            <Detail label="Address" value={lead.address} />
            <Detail label="City" value={lead.city} />
            <Detail label="State" value={lead.state} />
            <Detail label="Location" value={lead.location} />
          </div>

          {/* 🔵 RIGHT SIDE */}
          <div className="space-y-4">
            <Detail label="Interest Level" value={lead.interest_level} />
            <Detail label="Lead Status" value={lead.lead_status} />
            <Detail label="Lead Source" value={lead.lead_source} />
            <Detail label="Remarks" value={lead.remarks} />
            <Detail label="Created By Code" value={lead.created_by_code} />
            <Detail label="Assigned Employee Code" value={lead.assigned_to_code} />
            <Detail label="Created At" value={lead.created_at?.slice(0,10)} />
            <Detail label="Updated At" value={lead.updated_at?.slice(0,10)} />
          </div>

        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>
        {label}
      </p>
      <p className="font-medium text-sm" style={{ color: themes.backgroundDark }}>
        {value || "-"}
      </p>
    </div>
  );
}
