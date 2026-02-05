// import TableActions from "./TableActions";

// export default function LeaveBalanceTableRow({
//   row,
//   index,
//   onView,
//   onEdit,
//   onDelete,
// }) {
//   return (
//     <tr className="border-b hover:bg-gray-50">
//       <td className="px-3 py-3 text-sm text-center">{index + 1}</td>
//       <td className="px-3 py-3 text-sm text-center">{row.leave_type}</td>
//       <td className="px-3 py-3 text-sm text-center">{row.total_allocated}</td>
//       <td className="px-3 py-3 text-sm text-center">{row.used_days}</td>
//       <td className="px-3 py-3 text-sm text-center font-medium text-blue-600">
//         {row.remaining_days}
//       </td>

//       <td className="px-3 py-3 text-center">
//         <TableActions
//           onView={() => onView?.(row)}
//           onEdit={() => onEdit?.(row)}
//           onDelete={() => onDelete?.(row.id)}
//         />
//       </td>
//     </tr>
//   );
// }
