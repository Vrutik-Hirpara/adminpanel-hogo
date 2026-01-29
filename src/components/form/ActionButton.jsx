import { themes } from "../../config/theme.config";

export default function ActionButtons({
  showAdd = false,
  addText = "",
  onAdd,
  showBack = false,
  onBack,
}) {
  return (
    <div className="flex gap-3">
      {showAdd && (
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded text-white cursor-pointer"
          style={{ backgroundColor: themes.primary }}
        >
          {addText}
        </button>
      )}

      {showBack && (
        <button
          onClick={onBack}
          className="px-4 py-2 rounded text-white cursor-pointer"
          style={{ backgroundColor: themes.primary }}
        >
          Back to List
        </button>
      )}
    </div>
  );
}
