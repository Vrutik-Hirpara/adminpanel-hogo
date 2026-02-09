


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
{/* 
      <button onClick={onDelete} className="cursor-pointer">
        <TrashIcon className="w-5 h-5 text-red-600" />
      </button> */}


      <button
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      onDelete();
    }
  }}
  className="cursor-pointer"
>
  <TrashIcon className="w-5 h-5 text-red-600" />
</button>

    </div>
  );
}
