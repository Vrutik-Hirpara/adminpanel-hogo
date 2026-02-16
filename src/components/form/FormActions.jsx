import { themes } from "../../config/theme.config";

export default function FormActions({
  onCancel,
  cancelLabel = "Cancel",
  submitLabel = "Save",
  hideCancel = false,
  hideSubmit = false,
}) {
  return (
    <div className="flex justify-end gap-3 mt-8">
      
      {/* Cancel Button (optional) */}
      {!hideCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded cursor-pointer"
          style={{
            backgroundColor: themes.backgroundGray,
            color: themes.backgroundDark,
          }}
        >
          {cancelLabel}
        </button>
      )}

      {/* Submit Button (optional) */}
      {!hideSubmit && (
        <button
          type="submit"
          className="px-6 py-2 rounded  cursor-pointer"
          style={{ backgroundColor: themes.primary, color: themes.textWhite  }}
        >
          {submitLabel}
        </button>
      )}
    </div>
  );
}
