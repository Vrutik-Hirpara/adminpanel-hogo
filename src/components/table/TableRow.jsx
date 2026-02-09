




// import TableActions from "./TableActions";
// import { themes } from "../../config/theme.config";

// export default function TableRow({ row, onView,index, onEdit, onDelete, onToggleStatus }) {
//   return (
//     <tr
//       className="border-t"
//       style={{ borderColor: themes.backgroundGray }}
//     >
//       {/* NAME */}
//       <td className="px-4 py-3 text-center align-middle">
//         {row.name}
//       </td>

//       {/* DESCRIPTION */}
//       <td className="px-4 py-3 text-center align-middle break-words">
//         {row.description || "-"}
//       </td>

//       {/* 🔥 SMOOTH STATUS TOGGLE */}
//       <td className="px-4 py-3 text-center align-middle">
//         <button
//           onClick={() => onToggleStatus?.(row)}
//           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 ease-in-out ${
//             row.status ? "bg-green-500" : "bg-gray-400"
//           }`}
//         >
//           <span
//             className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-all duration-500 ease-in-out ${
//               row.status ? "translate-x-6" : "translate-x-1"
//             }`}
//           />
//         </button>
//       </td>

//       {/* ACTION */}
//       <td className="px-4 py-3 text-center align-middle">
//         <TableActions
//           onView={() => onView?.(row)}
//           onEdit={() => onEdit?.(row)}
//           onDelete={() => onDelete?.(row.id)}
//         />
//       </td>
//     </tr>
//   );
// }
