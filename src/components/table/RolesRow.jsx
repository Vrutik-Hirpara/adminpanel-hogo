// import TableActions from "./TableActions";
// import { themes } from "../../config/theme.config";

// export default function RolesRow({
//   row,
//   index,
//   onView,
//   onEdit,
//   onDelete,
//   onToggleStatus,
// }) {
//   return (
//     <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>

//       {/* 🔢 SERIAL NUMBER */}
//       <td className="px-4 py-3 text-center font-medium w-[5%]">
//         {index + 1}
//       </td>

//       {/* 📛 ROLE NAME */}
//       <td className="px-4 py-3 text-center whitespace-nowrap">
//         {row.name}
//       </td>

//       {/* 📝 DESCRIPTION */}
//       <td className="px-4 py-3 text-center break-words max-w-[260px]">
//         {row.description || "-"}
//       </td>

//       {/* 🟢 TOGGLE SWITCH */}
//       <td className="px-4 py-3 text-center">
//         <button
//           onClick={() => onToggleStatus(row)}
//           className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
//             row.status ? "bg-green-500" : "bg-gray-300"
//           }`}
//         >
//           <span
//             className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
//               row.status ? "translate-x-6" : ""
//             }`}
//           />
//         </button>
//       </td>

//       {/* ⚙ ACTION BUTTONS */}
//       <td className="px-4 py-3 text-center">
//         <TableActions
//           onView={() => onView(row)}
//           onEdit={() => onEdit(row)}
//           onDelete={() => onDelete(row.id)}
//         />
//       </td>

//     </tr>
//   );
// }
