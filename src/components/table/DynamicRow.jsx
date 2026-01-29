// export default function DynamicRow({ row, onView, onEdit, onDelete }) {
//   return (
//     <tr className="border-b hover:bg-gray-50 transition">
//       {Object.values(row).map((value, i) => (
//         <td key={i} className="px-6 py-4 text-sm whitespace-nowrap">
//           {value ?? "-"}
//         </td>
//       ))}

//       <td className="px-6 py-4 flex gap-3">
//         <button onClick={onView}>👁</button>
//         <button onClick={onEdit}>✏️</button>
//         <button onClick={onDelete}>🗑</button>
//       </td>
//     </tr>
//   );
// }
