import TableActions from "./TableActions";
import { themes } from "../../config/theme.config";

export default function EmployeeDocumentsRow({ row, employeeName,index, onView, onEdit, onDelete }) {
  return (
    <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>
<td className="px-4 py-3 text-center w-[5%] font-medium">
  {index + 1}
</td>

      <td className="px-3 py-3 text-center">{employeeName}</td>
      <td className="px-3 py-3 text-center">{row.pancard_number}</td>
      <td className="px-3 py-3 text-center">{row.aadhar_number}</td>
      <td className="px-3 py-3 text-center">{row.driving_license_number}</td>
      <td className="px-3 py-3 text-center">{row.uploaded_at?.slice(0,10)}</td>
      <td className="px-3 py-3 text-center">
<TableActions
  onView={() => onView?.(row)}
  onEdit={() => onEdit?.(row)}
  onDelete={() => onDelete?.(row.id)}
/>

      </td>
    </tr>
  );
}
