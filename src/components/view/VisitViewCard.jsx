// // export default function VisitViewCard({ visit }) {
// //   return (
// //     <div className="grid grid-cols-2 gap-4 text-sm">
// //       <p><b>Location:</b> {visit.location}</p>
// //       <p><b>Address:</b> {visit.address}</p>
// //       <p><b>Contact Person:</b> {visit.contact_person}</p>
// //       <p><b>Visit Purpose:</b> {visit.visit_purpose}</p>
// //       <p><b>Visit Date:</b> {new Date(visit.visit_date).toLocaleString()}</p>
// //       <p><b>Total Hours:</b> {visit.total_hr}</p>
// //       <p><b>Follow-up Date:</b> {visit.followup_date}</p>
// //       <p><b>Follow-up Type:</b> {visit.followup_type}</p>
// //       <p><b>Order Info:</b> {visit.order_information}</p>
// //       <p><b>Payment Details:</b> {visit.payment_details}</p>
// //       <p className="col-span-2"><b>Notes:</b> {visit.notes}</p>

// //       {visit.images && (
// //         <div className="col-span-2">
// //           <b>Visit Image:</b><br />
// //           <img src={visit.images} className="w-40 rounded mt-2" />
// //         </div>
// //       )}

// //       {visit.payment_image && (
// //         <div className="col-span-2">
// //           <b>Payment Proof:</b><br />
// //           <img src={visit.payment_image} className="w-40 rounded mt-2" />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { themes } from "../../config/theme.config";

// export default function VisitsViewCard({ visit }) {
//   return (
//     <div style={{ fontFamily: themes.fontPrimary }}>

//       {/* 🔴 HEADER */}
//       <div
//         className="px-6 py-4 rounded-t-xl"
//         style={{
//           backgroundColor: themes.primary,
//           color: themes.textWhite,
//         }}
//       >
//       <h3 className="text-lg font-semibold">
//   Visit Date: {visit.visit_date 
//     ? new Date(visit.visit_date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//     : "-"}
// </h3>

//         <p className="text-sm opacity-90">Visit Details</p>
//       </div>

//       {/* ⚪ BODY */}
//       <div
//         className="border rounded-b-xl p-6"
//         style={{ borderColor: themes.backgroundGray }}
//       >
//         <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">

//           {/* 🟢 LEFT SIDE */}
//           <div className="space-y-4">
//             <Detail label="Employee ID" value={visit.employee_id} />
//             <Detail label="Lead ID" value={visit.lead_id} />
//             <Detail label="Contact Person" value={visit.contact_person} />
//             <Detail label="Address" value={visit.address} />
//             <Detail label="Location" value={visit.location} />
//             <Detail label="Visit Purpose" value={visit.visit_purpose} />
//             <Detail label="Order Name" value={visit.order_name} />
//             <Detail label="Total Hours" value={visit.total_hr} />
//           </div>

//           {/* 🔵 RIGHT SIDE */}
//           <div className="space-y-4">
//             <Detail label="Visit Date" value={formatDate(visit.visit_date)} />
//             <Detail label="Check In Time" value={formatDate(visit.check_in_time)} />
//             <Detail label="Checkout Time" value={formatDate(visit.checkout_time)} />
//             <Detail label="Followup Date" value={formatDate(visit.followup_date)} />
//             <Detail label="Followup Type" value={visit.followup_type} />
//             <Detail label="Order Information" value={visit.order_information} />
//             <Detail label="Payment Details" value={visit.payment_details} />
//             <Detail label="Notes" value={visit.notes} />
//           </div>

//         </div>

//         {/* 🖼 IMAGES SECTION */}
//         {(visit.payment_image || visit.images) && (
//           <div className="mt-8 grid grid-cols-2 gap-6">
//             {visit.payment_image && (
//               <ImageCard title="Payment Image" src={visit.payment_image} />
//             )}
//             {visit.images && (
//               <ImageCard title="Visit Image" src={visit.images} />
//             )}
//           </div>
//         )}

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
//       <p className="font-medium text-sm break-words" style={{ color: themes.backgroundDark }}>
//         {value || "-"}
//       </p>
//     </div>
//   );
// }

// function ImageCard({ title, src }) {
//   return (
//     <div>
//       <p className="text-xs mb-2" style={{ color: themes.backgroundGray }}>
//         {title}
//       </p>
//       <img
//         src={src}
//         alt={title}
//         className="rounded-lg border shadow-md max-h-48 object-cover"
//       />
//     </div>
//   );
// }

// function formatDate(date) {
//   return date ? new Date(date).toLocaleString() : "-";
// }
