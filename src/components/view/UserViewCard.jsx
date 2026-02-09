// // import { themes } from "../../config/theme.config";

// // export default function UserViewCard({ user, employeeName }) {
// //   return (
// //     <div className="rounded-xl border" style={{ borderColor: themes.backgroundGray }}>
// //       <div className="px-6 py-4 text-white" style={{ backgroundColor: themes.primary }}>
// //         <h3 className="text-lg font-semibold">{user.username}</h3>
// //         <p className="text-sm opacity-90">User Details</p>
// //       </div>

// //       <div className="p-6 grid grid-cols-2 gap-6 text-sm">
// //         <Detail label="Employee" value={employeeName} />
// //         <Detail label="Role" value={user.role} />
// //         <Detail label="Active" value={user.is_active ? "Yes" : "No"} />
// //       </div>
// //     </div>
// //   );
// // }

// // function Detail({ label, value }) {
// //   return (
// //     <div>
// //       <p className="text-xs text-gray-400">{label}</p>
// //       <p className="font-medium">{value}</p>
// //     </div>
// //   );
// // }

// import { themes } from "../../config/theme.config";

// export default function UserViewCard({ user, employeeName }) {
//   const statusText = user.is_active ? "Active" : "Inactive";

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
//         <h3 className="text-lg font-semibold">{user.username}</h3>
//         <p className="text-sm opacity-90">User Details</p>
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
//           <Detail label="Employee" value={employeeName} />
//           <Detail label="Role" value={user.role} />
//           <Detail label="Username" value={user.username} />
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
