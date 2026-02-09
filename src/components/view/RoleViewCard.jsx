// import { themes } from "../../config/theme.config";

// export default function RoleViewCard({ role }) {
//   const statusText = role.status ? "Active" : "Inactive";

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
//         <h3 className="text-lg font-semibold">{role.name}</h3>
//         <p className="text-sm opacity-90">Role Details</p>
//       </div>

//       {/* ⚪ BODY */}
//       <div className="p-6 space-y-7">
//         {/* STATUS BADGE */}
//         <div className="flex justify-between items-center">
//           <span
//             className={`px-3 py-1 text-xs font-medium rounded-full ${
//               statusText === "Active"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {statusText}
//           </span>
//         </div>

//         {/* DETAILS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//           <Detail label="Role Name" value={role.name} />
//           <Detail label="Status" value={statusText} />
//         </div>

//         {/* DESCRIPTION */}
//         <div
//           className=""
//         >
//           <p
//             className="text-xs mb-1"
//             style={{ color: themes.backgroundGray }}
//           >
//             Description
//           </p>
//           <p
//             className="text-sm leading-relaxed"
//             style={{ color: themes.backgroundDark }}
//           >
//             {role.description || "-"}
//           </p>
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
