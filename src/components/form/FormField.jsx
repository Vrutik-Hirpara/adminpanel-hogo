import { themes } from "../../config/theme.config";

export default function FormField({
  label,
  name,
  type = "text",
  register,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm"style={{ color: themes.textSecondary }}>{label}</label>

      <input
        type={type}
        {...register(name)}
        className="px-3 py-2 rounded border outline-none focus:ring-1"
        style={{
          borderColor: themes.backgroundGray,
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = themes.primary)
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = themes.backgroundGray)
        }
      />
    </div>
  );
}
