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




import TableActions from "./TableActions";
import { themes } from "../../config/theme.config";

export default function LeadsRow({ row, index, onView, onEdit, onDelete }) {
  return (
    <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>

      <td className="px-4 py-3 text-center font-medium">{index + 1}</td>

      <td className="px-4 py-3 text-center break-words">{row.business_name}</td>
      <td className="px-4 py-3 text-center">{row.lead_type}</td>
      <td className="px-4 py-3 text-center">{row.contact_person}</td>
      <td className="px-4 py-3 text-center">{row.phone}</td>

      <td className="px-4 py-3 text-center truncate">{row.email}</td>

      <td className="px-4 py-3 text-center">{row.interest_level}</td>
      <td className="px-4 py-3 text-center">{row.lead_status}</td>

      <td className="px-4 py-3 text-center whitespace-nowrap">
        <TableActions
          onView={() => onView(row)}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
        />
      </td>

    </tr>
  );
}
