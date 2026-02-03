import TableActions from "./TableActions";
import { themes } from "../../config/theme.config";

export default function EmployeeTableRow({
  row,
  onView,
  index,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>
<td className="px-4 py-3 text-center w-[5%] font-medium">
  {index + 1}
</td>

      <td className="px-3 py-3 text-center text-sm">{row.employee_code}</td>

      <td className="px-3 py-3 text-center text-sm">{row.first_name}</td>

      <td className="px-3 py-3 text-center text-sm">{row.last_name}</td>

      {/* <td className="px-3 py-3 text-center text-sm">{row.gender}</td> */}

      <td className="px-3 py-3 text-center text-sm">{row.date_of_birth}</td>

      <td className="px-3 py-3 text-center text-sm break-words max-w-[160px]">
        {row.email}
      </td>

      <td className="px-3 py-3 text-center text-sm">{row.phone}</td>

      <td className="px-3 py-3 text-center text-sm">{row.joining_date}</td>

      {/* <td className="px-3 py-3 text-center text-sm">{row.employment_type}</td> */}

      {/* STATUS TOGGLE */}
      <td className="px-3 py-3 text-center">
     <button
  onClick={() => onToggleStatus?.(row)}
  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 ease-in-out ${
    row.status ? "bg-green-500" : "bg-gray-400"
  }`}
>
  <span
    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-all duration-500 ease-in-out ${
      row.status ? "translate-x-6" : "translate-x-1"
    }`}
  />
</button>

      </td>

      {/* ACTIONS */}
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
