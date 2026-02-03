import TableActions from "./TableActions";
import { themes } from "../../config/theme.config";

export default function EmployeeSalaryRow({ row, employeeName,index, onView, onEdit, onDelete }) {
  return (
    <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>
<td className="px-4 py-3 text-center w-[5%] font-medium">
  {index + 1}
</td>

      <td className="px-3 py-3 text-center">{employeeName}</td>
      <td className="px-3 py-3 text-center">{row.basic_salary}</td>
      <td className="px-3 py-3 text-center">{row.alloances}</td>
      <td className="px-3 py-3 text-center">{row.deductions}</td>
      <td className="px-3 py-3 text-center font-semibold text-green-600">{row.gross_salary}</td>
      <td className="px-3 py-3 text-center">{row.effective_from}</td>
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
