// import { Eye, Pencil, Trash2 } from "lucide-react";

// export default function OfficeBranchRow({
//   row,
//   onView,
//   onEdit,
//   onDelete,
// }) {
//   return (
//     <tr className="border-b">
//       <td className="px-4 py-3">{row.name}</td>
//       <td className="px-4 py-3">{row.address}</td>
//       <td className="px-4 py-3">{row.city}</td>
//       <td className="px-4 py-3">{row.state}</td>
//       <td className="px-4 py-3">{row.country}</td>

//       <td className="px-4 py-3">
//         <div className="flex gap-3">
//           <Eye
//             className="w-5 h-5 cursor-pointer text-gray-600"
//             onClick={onView}
//           />
//           <Pencil
//             className="w-5 h-5 cursor-pointer text-red-600"
//             onClick={onEdit}
//           />
//           <Trash2
//             className="w-5 h-5 cursor-pointer text-red-600"
//             onClick={onDelete}
//           />
//         </div>
//       </td>
//     </tr>
//   );
// }




// import TableActions from "./TableActions";
// import { themes } from "../../config/theme.config";

// export default function OfficeBranchRow({ row, onView,index, onEdit, onDelete }) {
//   return (
//     <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>


// <td className="w-[5%] px-4 py-3 text-center font-medium">
//   {index + 1}
// </td>

//       <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
//         {row.name}
//       </td>

//       <td className="px-4 py-3 text-center align-middle break-words max-w-[260px]">
//         {row.address}
//       </td>

//       <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
//         {row.city}
//       </td>

//       <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
//         {row.state}
//       </td>

//       <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
//         {row.country}
//       </td>

//       <td className="px-4 py-3 text-center align-middle">
//         <TableActions
//           onView={() => onView(row)}
//           onEdit={() => onEdit(row)}
//           onDelete={() => onDelete(row.id)}
//         />
//       </td>
//     </tr>
//   );
// }
