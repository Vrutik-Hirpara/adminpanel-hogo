// import TableActions from "./TableActions";
// import { themes } from "../../config/theme.config";
// import api from "../../services/api";

// export default function BlogTableRow({ row, onView, onEdit, onDelete }) {
//   const baseURL = api.defaults.baseURL;

//   return (
//     <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>
//       <td className="px-4 py-3 text-center">
//         <img
//           src={`${baseURL}${row.image}`}
//           alt="blog"
//           className="h-14 w-20 object-cover rounded mx-auto border"
//         />
//       </td>

//       <td className="px-4 py-3 text-center">{row.title}</td>
//       <td className="px-4 py-3 text-center break-words">{row.shortcontent}</td>
//       <td className="px-4 py-3 text-center break-words max-w-xs">{row.content}</td>
//       <td className="px-4 py-3 text-center">{row.tag}</td>
//       <td className="px-4 py-3 text-center">{row.month}</td>
//       <td className="px-4 py-3 text-center">{row.date}</td>

//       <td className="px-4 py-3 text-center">
//         <TableActions
//           onView={() => onView?.(row)}
//           onEdit={() => onEdit?.(row)}
//           onDelete={() => onDelete?.(row.id)}
//         />
//       </td>
//     </tr>
//   );
// }

import TableActions from "./TableActions";
import { themes } from "../../config/theme.config";
import api from "../../services/api";

export default function BlogTableRow({ row, onView, onEdit, onDelete }) {
  const imageUrl = row.image ? `${api.defaults.baseURL}${row.image}` : null;

  return (
    <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>
      {/* IMAGE */}
      <td className="px-3 py-3 text-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="blog"
            className="h-12 w-16 sm:h-14 sm:w-20 object-cover rounded border mx-auto"
          />
        )}
      </td>

      <td className="px-3 py-3 text-center text-xs sm:text-sm break-words max-w-[140px]">
        {row.title}
      </td>

      <td className="px-3 py-3 text-center text-xs sm:text-sm break-words max-w-[160px]">
        {row.shortcontent}
      </td>

      <td className="px-3 py-3 text-center text-xs sm:text-sm break-words max-w-[180px] line-clamp-2">
        {row.content}
      </td>

      <td className="px-3 py-3 text-center text-xs sm:text-sm">{row.tag}</td>
      <td className="px-3 py-3 text-center text-xs sm:text-sm">{row.month}</td>
      <td className="px-3 py-3 text-center text-xs sm:text-sm">{row.date}</td>

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
