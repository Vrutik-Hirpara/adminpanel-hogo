import { themes } from "../../config/theme.config";

export default function PageHeader({
  title,
  actionText,
  onAction,
  showAction = true,
  showBack = false,
  onBack,
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      {/* LEFT: TITLE */}
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      {/* RIGHT: BUTTON */}
      {showAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded cursor-pointer"
          style={{ backgroundColor: themes.primary,color: themes.textWhite  }}
        >
          {actionText}
        </button>
      )}

      {showBack && (
       <ActionButtons
  showBack
  onBack={() => setMode("list")}
/>

      )}
    </div>
  );
}
