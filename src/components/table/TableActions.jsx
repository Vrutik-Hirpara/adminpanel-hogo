// import {
//   EyeIcon,
//   PencilSquareIcon,
//   TrashIcon,
// } from "@heroicons/react/24/solid";
// import { themes } from "../../config/theme.config";

// export default function TableActions({ onView, onEdit, onDelete }) {
//   return (
//     <div className="flex items-center gap-3">
//       <button
//         type="button"
//         onClick={onView}
//         className="p-1 rounded cursor-pointer hover:opacity-80"
//         title="View"
//       >
//         <EyeIcon className="w-5 h-5" style={{ color: themes.backgroundGray }} />
//       </button>

//       <button
//         type="button"
//         onClick={onEdit}
//         className="p-1 rounded cursor-pointer hover:opacity-80"
//         title="Edit"
//       >
//         <PencilSquareIcon className="w-5 h-5" style={{ color: themes.primary }} />
//       </button>

//       <button
//         type="button"
//         onClick={onDelete}
//         className="p-1 rounded cursor-pointer hover:opacity-80"
//         title="Delete"
//       >
//         <TrashIcon className="w-5 h-5" style={{ color: themes.active }} />
//       </button>
//     </div>
//   );
// }













import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { themes } from "../../config/theme.config";

export default function TableActions({ onView, onEdit, onDelete }) {
  return (
    <div className="flex justify-center items-center gap-3">
      <button onClick={onView} className="cursor-pointer">
        <EyeIcon className="w-5 h-5" style={{ color: themes.backgroundGray }} />
      </button>

      <button onClick={onEdit} className="cursor-pointer">
        <PencilSquareIcon className="w-5 h-5" style={{ color: themes.primary }} />
      </button>

      <button onClick={onDelete} className="cursor-pointer">
        <TrashIcon className="w-5 h-5 text-red-600" />
      </button>
    </div>
  );
}
