import TableActions from "./TableActions";
import { themes } from "../../config/theme.config";

export default function DepartmentRow({ row, index, onView, onEdit, onDelete, onToggleStatus }) {
  return (
    <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>

      {/* SERIAL */}
      <td className="px-4 py-3 text-center w-[5%] font-medium">
        {index + 1}
      </td>

      <td className="px-4 py-3 text-center whitespace-nowrap">
        {row.name}
      </td>

      <td className="px-4 py-3 text-center break-words max-w-[260px]">
        {row.description}
      </td>

      {/* 🔥 SAME STATUS BUTTON — NOT CHANGED */}
<td className="px-4 py-3 text-center">
  <button
    onClick={() => onToggleStatus(row)}
    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
      row.status ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
        row.status ? "translate-x-6" : ""
      }`}
    />
  </button>
</td>


      <td className="px-4 py-3 text-center">
        <TableActions
          onView={() => onView(row)}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
        />
      </td>

    </tr>
  );
}
