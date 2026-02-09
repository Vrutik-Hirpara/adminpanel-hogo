import TableActions from "./TableActions";
import { themes } from "../../config/theme.config";

export default function EntityTableRow({
  row,
  index,
  columns,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>
      {/* SERIAL */}
      <td className="px-4 py-3 text-center w-[5%] font-medium">
        {index + 1}
      </td>

      {/* DYNAMIC COLUMNS */}
{columns?.map((col, i) => (
        <td key={i} className={`px-0 py-1 text-center text-sm break-words max-w-[160px] ${col.className || ""}`}>
          {col.render ? col.render(row) : row[col.key]}
        </td>
      ))}

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
