import TableActions from "./TableActions";
import { themes } from "../../config/theme.config";

export default function EmployeePersonalDetailsRow({
  row,
  employeeName,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>
      
      <td className="px-3 py-3 text-center text-sm">{employeeName}</td>

      <td className="px-3 py-3 text-center text-sm">{row.father_name}</td>

      <td className="px-3 py-3 text-center text-sm">{row.mother_name}</td>

      <td className="px-3 py-3 text-center text-sm">{row.marital_status}</td>

      <td className="px-3 py-3 text-center text-sm break-words max-w-[160px]">
        {row.emergency_contact_phone}
      </td>

      {/* 🔥 SAME ACTION COLUMN AS EMPLOYEE */}
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
