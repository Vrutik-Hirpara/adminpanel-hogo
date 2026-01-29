import { themes } from "../../config/theme.config";

export default function FormButton({ label }) {
  return (
    <button
      type="submit"
      className="px-8 py-2.5 rounded-lg font-medium transition"
      style={{
        backgroundColor: themes.primary,
        color: themes.textWhite,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = themes.hover)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = themes.primary)
      }
    >
      {label}
    </button>
  );
}
