// import TableActions from "./TableActions";

// export default function UserRow({ row, employeeName, index, onView, onEdit, onDelete,onToggleStatus  }) {
//   return (
//     <tr className="border-t">
//       <td className="px-4 py-3 text-center font-medium w-[5%]">
//         {index + 1}
//       </td>
//       <td className="text-center py-3">{row.username}</td>
//       {/* <td className="text-center">{employeeName}</td> */}
//       <td className="text-center">{row.role}</td>
//         <td className="px-3 py-3 text-center">
//           <button
//             onClick={() => onToggleStatus?.(row)}
// className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 ${
//   row.status ? "bg-green-500" : "bg-gray-400"

//               }`}
//           >
//             <span
// className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-500 ${
//   row.status ? "translate-x-6" : "translate-x-1"
//                 }`}
//             />
//           </button>
//       </td>
//       <td className="text-center">
//         <TableActions
//           onView={() => onView(row)}
//           onEdit={() => onEdit(row)}
//           onDelete={() => onDelete(row.id)}
//         />
//       </td>
//     </tr>
//   );
// }
