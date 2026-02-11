
// import { themes } from "../../config/theme.config"; // ✅ REQUIRED IMPORT


// export default function FormTextarea({
//   label,
//   name,
//   register,
//   readOnly = false,
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label className="text-sm font-medium">
//         {label}
//       </label>

//       <textarea
//         {...register(name)}
//         readOnly={readOnly}
//         className="px-4 py-2 rounded outline-none resize-none"
//         rows={4}
//         style={{
//           backgroundColor: readOnly ? themes.surfaceMuted : themes.textWhite,
//           color: themes.backgroundDark,
//           border: `1px solid ${themes.backgroundGray}`,
//           cursor: readOnly ? "not-allowed" : "text",
//         }}
//       />
//     </div>
//   );
// }

// import { themes } from "../../config/theme.config";

// export default function FormTextarea({
//   label,
//   name,
//   register,
//   rules = {},      // ⭐ validation rules from parent
//   readOnly = false,
//   error,           // ⭐ error object from React Hook Form
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         className="text-sm font-medium"
//         style={{ color: themes.backgroundDark }}
//       >
//         {label}
//       </label>

//       <textarea
//         {...register(name, rules)}   // 🔥 apply validation
//         readOnly={readOnly}
//         className="px-4 py-2 rounded outline-none resize-none"
//         rows={4}
//         style={{
//           backgroundColor: readOnly ? themes.surfaceMuted : themes.textWhite,
//           color: themes.backgroundDark,
//           border: `1px solid ${error ? "#ef4444" : themes.backgroundGray}`, // red border on error
//           cursor: readOnly ? "not-allowed" : "text",
//         }}
//       />

//       {error && (
//         <p className="text-red-500 text-sm">{error.message}</p>  // 🔥 show message
//       )}
//     </div>
//   );
// }
import { themes } from "../../config/theme.config";

export default function FormTextarea({
  label,
  name,
  register,
  rules = {},
  readOnly = false,
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: themes.backgroundDark }}>
        {label}
      </label>

      <textarea
        {...register(name, rules)}
        readOnly={readOnly}
        rows={4}
        className="px-4 py-2 rounded outline-none resize-none"
        style={{
          backgroundColor: readOnly ? themes.surfaceMuted : themes.textWhite,
          color: themes.backgroundDark,
          border: `1px solid ${error ? "#ef4444" : themes.backgroundGray}`,
        }}
      />

      {error?.message && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
}
