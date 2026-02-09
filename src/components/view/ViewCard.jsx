// import { themes } from "../../config/theme.config";

// export default function ViewCard({ department, onClose }) {
//   if (!department) return null;

//   return (
//     <div
//       className="min-h-screen flex justify-center p-6"
//       style={{ backgroundColor: themes.backgroundGray }}
//     >
//       {/* MAIN CONTAINER (same width as list) */}
//       <div className="w-full max-w-6xl">
//         {/* HEADER ROW */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">
//             Department Details
//           </h2>

//          <ActionButtons
//   showBack
//   onBack={() => setMode("list")}
// />

//         </div>

//         {/* WHITE CARD */}
//         <div
//           className="rounded-xl shadow p-6"
//           style={{
//             backgroundColor: themes.textWhite,
//             fontFamily: themes.fontPrimary,
//           }}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* NAME */}
//             <div>
//               <p className="text-xs text-gray-500 mb-1">
//                 Name
//               </p>
//               <p className="font-medium text-base">
//                 {department.name}
//               </p>
//             </div>

//             {/* STATUS */}
//             <div>
//               <p className="text-xs text-gray-500 mb-1">
//                 Status
//               </p>
//               <p className="font-medium text-base">
//                 {department.status}
//               </p>
//             </div>
//           </div>

//           {/* DESCRIPTION */}
//           <div className="mt-6">
//             <p className="text-xs text-gray-500 mb-1">
//               Description
//             </p>
//             <p className="text-base">
//               {department.description || "-"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

