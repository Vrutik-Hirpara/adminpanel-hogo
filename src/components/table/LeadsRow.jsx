// import TableActions from "./TableActions";
// import { themes } from "../../config/theme.config";

// export default function LeadsRow({ row, onView,index, onEdit, onDelete }) {
//   return (
//     <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>


//       <td className="px-4 py-3 text-center w-[5%]">{index + 1}</td>

//       <td className="px-4 py-3 text-center w-[14%]">{row.business_name}</td>
//       <td className="px-4 py-3 text-center w-[10%]">{row.lead_type}</td>
//       <td className="px-4 py-3 text-center w-[12%]">{row.contact_person}</td>
//       <td className="px-4 py-3 text-center w-[12%]">{row.phone}</td>

//       <td className="px-4 py-3 text-center w-[16%] truncate">
//         {row.email}
//       </td>

//       <td className="px-4 py-3 text-center w-[8%]">{row.interest_level}</td>
//       <td className="px-4 py-3 text-center w-[8%]">{row.lead_status}</td>

//       <td className="px-4 py-3 text-center w-[20%]">
//         <TableActions
//           onView={() => onView(row)}
//           onEdit={() => onEdit(row)}
//           onDelete={() => onDelete(row.id)}
//         />
//       </td>

//     </tr>
//   );
// }




// import TableActions from "./TableActions";
// import { themes } from "../../config/theme.config";

// export default function LeadsRow({ row, index, onView, onEdit, onDelete }) {
//   return (
//     <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>

//       <td className="px-4 py-3 text-center font-medium">{index + 1}</td>

//       <td className="px-4 py-3 text-center break-words">{row.business_name}</td>
//       <td className="px-4 py-3 text-center">{row.lead_type}</td>
//       <td className="px-4 py-3 text-center">{row.contact_person}</td>
//       <td className="px-4 py-3 text-center">{row.phone}</td>

//       <td className="px-4 py-3 text-center truncate">{row.email}</td>

//       <td className="px-4 py-3 text-center">{row.interest_level}</td>
//       <td className="px-4 py-3 text-center">{row.lead_status}</td>

//       <td className="px-4 py-3 text-center whitespace-nowrap">
//         <TableActions
//           onView={() => onView(row)}
//           onEdit={() => onEdit(row)}
//           onDelete={() => onDelete(row.id)}
//         />
//       </td>

//     </tr>
//   );
// }





// import TableActions from "./TableActions";

// export default function LeadsRow({ row, index, employees, onView, onEdit, onDelete }) {
//   const emp = employees.find(e => e.id === row.assigned_to);

//   return (
//     <tr className="border-t">
//       <td className="px-4 py-3 text-center">{index + 1}</td>
//       <td className="px-4 py-3 text-center">{row.business_name}</td>
//       <td className="px-4 py-3 text-center">{row.lead_type}</td>
//       <td className="px-4 py-3 text-center">{row.contact_person}</td>
//       <td className="px-4 py-3 text-center">{row.phone}</td>
//       <td className="px-4 py-3 text-center">{row.email}</td>
//       <td className="px-4 py-3 text-center">{row.interest_level}</td>
//       <td className="px-4 py-3 text-center">{row.lead_status}</td>

//       {/* 🔥 Employee Code instead of ID */}
//       <td className="px-4 py-3 text-center">
//         {emp ? emp.employee_code : "-"}
//       </td>

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

import { LeadsAPI } from "../../services/apiService";
 import TableActions from "./TableActions";
export default function LeadsRow({
  row,
  index,
  employees,
  onView,
  onEdit,
  onDelete,
  onAssignUpdate
}) {

  // const handleAssignChange = async (e) => {
  //   const newEmpId = e.target.value;

  //   await updateLead(row.id, {
  //     assigned_to: newEmpId
  //   });

  //   onAssignUpdate(); // refresh list
  // };
const handleAssignChange = async (e) => {
  const newEmpId = e.target.value;

  try {
    await LeadsAPI.update(row.id, {
      assigned_to: newEmpId || null,
    });

    // 🔥 Find employee code for message
    const emp = employees.find(emp => emp.id == newEmpId);

    if (newEmpId) {
      alert(`Lead assigned to ${emp?.employee_code}`);
    } else {
      alert("Assignment removed");
    }

    onAssignUpdate(); // refresh list

  } catch (err) {
    alert("Assignment update failed");
  }
};

  return (
  <tr className="border-t text-sm">

  <td className="px-1 py-3 text-center w-[4%]">{index + 1}</td>

  <td className="px-1 py-3 text-center w-[14%] truncate">{row.business_name}</td>

  <td className="px-1 py-3 text-center w-[8%]">{row.lead_type}</td>

  <td className="px-1 py-3 text-center w-[10%] truncate">{row.contact_person}</td>

  <td className="px-1 py-3 text-center w-[9%]">{row.phone}</td>

  <td className="px-1 py-3 text-center w-[13%] truncate">{row.email}</td>

  <td className="px-1 py-3 text-center w-[6%]">{row.interest_level}</td>

  <td className="px-1 py-3 text-center w-[6%]">{row.lead_status}</td>

  <td className="px-1 py-3 text-center w-[10%]">
    <select
      value={row.assigned_to || ""}
      onChange={handleAssignChange}
      className="border rounded px-1 py-1 text-xs w-full"
    >
      <option value="">Unassigned</option>
      {employees.map(emp => (
        <option key={emp.id} value={emp.id}>
          {emp.employee_code}
        </option>
      ))}
    </select>
  </td>

  <td className="px-1 py-3 text-center w-[10%]">
    <TableActions
          onView={() => onView(row)}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
        />
  </td>
</tr>

  );
}
