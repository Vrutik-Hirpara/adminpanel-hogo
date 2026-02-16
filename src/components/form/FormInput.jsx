

import { themes } from "../../config/theme.config";

export default function FormInput({
  label,
  name,
  type = "text",
  register,
  rules = {},
  readOnly = false,
  autoComplete,
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: themes.backgroundDark }}>
        {label}
      </label>
<input
  type={type}
  autoComplete={autoComplete}
  {...register(name, rules)}
  readOnly={readOnly}
  className={
    type === "file"
      ? `w-full text-sm rounded px-3 py-2
         file:text-[${themes.textWhite}]
         file:bg-[${themes.primary}]
         file:px-2 file:py-1 file:rounded file:border-0 file:mr-4 file:cursor-pointer`
      : "w-full px-4 py-2 rounded outline-none"
  }
  style={{
    border: `1px solid ${error ? "#ef4444" : themes.backgroundGray}`,  // ✅ YOUR BORDER
    color: themes.textPrimary,
    backgroundColor: themes.textWhite,
  }}
/>




      {error?.message && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
}
