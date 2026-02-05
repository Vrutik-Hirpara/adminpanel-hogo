// import TableActions from "./TableActions";

// export default function HolidayTableRow({
//   row,
//   index,
//   onView,
//   onEdit,
//   onDelete,
// }) {
//   return (
//     <tr className="border-b hover:bg-gray-50">
//       <td className="px-3 py-3 text-sm text-center">{index + 1}</td>
//       <td className="px-3 py-3 text-sm text-center">{row.holiday_name}</td>
//       <td className="px-3 py-3 text-sm text-center">{row.holiday_date}</td>
//       <td className="px-3 py-3 text-sm text-center">{row.holiday_type}</td>

//       <td className="px-3 py-3 text-sm font-medium text-center">
//         <span className={row.is_paid ? "text-green-600" : "text-red-500"}>
//           {row.is_paid ? "Paid" : "Unpaid"}
//         </span>
//       </td>

//       <td className="px-3 py-3 text-sm text-center">{row.description}</td>

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
