
import { themes } from "../../config/theme.config"; // ✅ REQUIRED IMPORT


export default function FormTextarea({
  label,
  name,
  register,
  readOnly = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        {label}
      </label>

<textarea
  {...register(name)}
  readOnly={readOnly}
  className="px-4 py-2 rounded outline-none resize-none"
  rows={4}
  style={{
    backgroundColor: readOnly ? "#f3f4f6" : themes.textWhite,
    color: themes.backgroundDark,
    border: `1px solid ${themes.backgroundGray}`,
    cursor: readOnly ? "not-allowed" : "text",
  }}
/>
    </div>
  );
}
