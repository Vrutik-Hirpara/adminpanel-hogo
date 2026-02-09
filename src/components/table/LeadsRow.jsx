
// import { LeadsAPI } from "../../services/apiService";
//  import TableActions from "./TableActions";
// export default function LeadsRow({
//   row,
//   index,
//   employees,
//   onView,
//   onEdit,
//   onDelete,
//   onAssignUpdate
// }) {

//   // const handleAssignChange = async (e) => {
//   //   const newEmpId = e.target.value;

//   //   await updateLead(row.id, {
//   //     assigned_to: newEmpId
//   //   });

//   //   onAssignUpdate(); // refresh list
//   // };
// const handleAssignChange = async (e) => {
//   const newEmpId = e.target.value;

//   try {
//     await LeadsAPI.update(row.id, {
//       assigned_to: newEmpId || null,
//     });

//     // 🔥 Find employee code for message
//     const emp = employees.find(emp => emp.id == newEmpId);

//     if (newEmpId) {
//       alert(`Lead assigned to ${emp?.employee_code}`);
//     } else {
//       alert("Assignment removed");
//     }

//     onAssignUpdate(); // refresh list

//   } catch (err) {
//     alert("Assignment update failed");
//   }
// };

//   return (
//   <tr className="border-t text-sm">

//   <td className="px-1 py-3 text-center w-[4%]">{index + 1}</td>

//   <td className="px-1 py-3 text-center w-[14%] truncate">{row.business_name}</td>

//   <td className="px-1 py-3 text-center w-[8%]">{row.lead_type}</td>

//   <td className="px-1 py-3 text-center w-[10%] truncate">{row.contact_person}</td>

//   <td className="px-1 py-3 text-center w-[9%]">{row.phone}</td>

//   <td className="px-1 py-3 text-center w-[13%] truncate">{row.email}</td>

//   <td className="px-1 py-3 text-center w-[6%]">{row.interest_level}</td>

//   <td className="px-1 py-3 text-center w-[6%]">{row.lead_status}</td>

//   <td className="px-1 py-3 text-center w-[10%]">
//     <select
//       value={row.assigned_to || ""}
//       onChange={handleAssignChange}
//       className="border rounded px-1 py-1 text-xs w-full"
//     >
//       <option value="">Unassigned</option>
//       {employees.map(emp => (
//         <option key={emp.id} value={emp.id}>
//           {emp.employee_code}
//         </option>
//       ))}
//     </select>
//   </td>

//   <td className="px-1 py-3 text-center w-[10%]">
//     <TableActions
//           onView={() => onView(row)}
//           onEdit={() => onEdit(row)}
//           onDelete={() => onDelete(row.id)}
//         />
//   </td>
// </tr>

//   );
// }
