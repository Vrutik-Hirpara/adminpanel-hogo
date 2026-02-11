// // export default function FormSelect({
// //   label,
// //   name,
// //   options,
// //   register,
// //   readOnly = false,
// // }) {
// //   return (
// //     <div className="flex flex-col gap-2">
// //       <label className="text-sm font-medium">
// //         {label}
// //       </label>

// //       <select
// //         {...register(name)}
// //         disabled={readOnly}
// //         className={`px-4 py-2 rounded
// //           ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
// //       >
// //         {options.map((o) => (
// //           <option key={o.value} value={o.value}>
// //             {o.label}
// //           </option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // }






// import { themes } from "../../config/theme.config";

// export default function FormSelect({
//   label,
//   name,
//   options,
//   register,
//   disabled = false,
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         className="text-sm font-medium"
//         style={{ color: themes.backgroundDark }}
//       >
//         {label}
//       </label>

//       <select
//         {...register(name)}
//         disabled={disabled}
//         className="px-4 py-2 rounded outline-none"
//         style={{
//           backgroundColor: disabled ? themes.surfaceMuted : themes.textWhite,
//           color: themes.backgroundDark,
//           border: `1px solid ${themes.backgroundGray}`,
//           cursor: disabled ? "not-allowed" : "pointer",
//         }}
//       >
//         <option value="">Select</option>
//         {options.map((o) => (
//           <option key={o.value} value={o.value}>
//             {o.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// import { themes } from "../../config/theme.config";

// export default function FormSelect({
//   label,
//   name,
//   options,
//   register,
//   rules = {},       // ⭐ ADD
//   error,            // ⭐ ADD
//   disabled = false,
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         className="text-sm font-medium"
//         style={{ color: themes.backgroundDark }}
//       >
//         {label}
//       </label>

//       <select
//         {...register(name, rules)}   // ⭐ RULES HERE
//         disabled={disabled}
//         className="px-4 py-2 rounded outline-none"
//         style={{
//           backgroundColor: disabled ? themes.surfaceMuted : themes.textWhite,
//           color: themes.backgroundDark,
//           border: `1px solid ${error ? "#ef4444" : themes.backgroundGray}`, // 🔴 border on error
//           cursor: disabled ? "not-allowed" : "pointer",
//         }}
//       >
//         <option value="">Select</option>
//         {options.map((o) => (
//           <option key={o.value} value={o.value}>
//             {o.label}
//           </option>
//         ))}
//       </select>

//       {error && (
//         <p className="text-red-500 text-sm">{error.message}</p>
//       )}
//     </div>
//   );
// }
import { themes } from "../../config/theme.config";

export default function FormSelect({
  label,
  name,
  options,
  register,
  rules = {},
  error,
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: themes.backgroundDark }}>
        {label}
      </label>

      <select
        {...register(name, rules)}
        disabled={disabled}
        className="px-4 py-2 rounded outline-none"
        style={{
          backgroundColor: disabled ? themes.surfaceMuted : themes.textWhite,
          color: themes.backgroundDark,
          border: `1px solid ${error ? "#ef4444" : themes.backgroundGray}`,
        }}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {error?.message && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
}
