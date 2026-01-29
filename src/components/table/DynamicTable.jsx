// import { themes } from "../../config/theme.config";

// export default function DynamicTable({ columns, data, onView, onEdit, onDelete }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border text-center">
//         <thead style={{ backgroundColor: themes.backgroundGray }}>
//           <tr>
//             {columns.map((col) => (
//               <th key={col.header} className="px-6 py-3 text-sm font-semibold">
//                 {col.header}
//               </th>
//             ))}
//             <th className="px-6 py-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row, i) => (
//             <tr key={i} className="border-b">
//               {columns.map((col) => (
//                 <td key={col.accessor} className="px-6 py-3 text-sm">
//                   {row[col.accessor] || "-"}
//                 </td>
//               ))}

//               {/* SAME OLD STYLE BUTTONS */}
//               <td className="px-6 py-3 flex justify-center gap-2">
//                 <button
//                   onClick={() => onView(row)}
//                   className="px-3 py-1 text-xs rounded text-white"
//                   style={{ backgroundColor: themes.primary }}
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => onEdit(row)}
//                   className="px-3 py-1 text-xs rounded text-white"
//                   style={{ backgroundColor: themes.primary }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(row)}
//                   className="px-3 py-1 text-xs rounded text-white bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
