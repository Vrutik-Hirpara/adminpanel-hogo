// // import { themes } from "../../config/theme.config";

// // export default function FormInput({
// //   label,
// //   name,
// //   type = "text",
// //   register,
// //   required = false,
// //   readOnly = false,
// // }) {
// //   return (
// //     <div className="flex flex-col gap-2">
// //       <label
// //         className="text-sm font-medium"
// //         style={{ color: themes.backgroundDark }}
// //       >
// //         {label}
// //       </label>

// //       <input
// //         type={type}
// //         {...register(name, { required })}
// //         readOnly={readOnly}
// //         className="px-4 py-2 rounded outline-none"
// //         style={{
// //           backgroundColor: readOnly ? "#f3f4f6" : themes.textWhite, // ✅ light gray for view
// //           color: themes.backgroundDark,                              // ✅ FIX
// //           border: `1px solid ${themes.backgroundGray}`,              // ✅ VISIBLE BORDER
// //           cursor: readOnly ? "not-allowed" : "text",
// //         }}
// //       />
// //     </div>
// //   );
// // }





// import { themes } from "../../config/theme.config";

// export default function FormInput({
//   label,
//   name,
//   type = "text",
//   register,
//   required = false,
//   readOnly = false,
//   autoComplete,   // ⭐ ADD THIS
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         className="text-sm font-medium"
//         style={{ color: themes.backgroundDark }}
//       >
//         {label}
//       </label>

//       <input
//         type={type}
//         autoComplete={autoComplete}   // ⭐ ADD THIS
//         {...register(name, { required })}
//         readOnly={readOnly}
//         className="px-4 py-2 rounded outline-none"
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

// export default function FormInput({
//   label,
//   name,
//   type = "text",
//   register,
//   rules = {},          // ⭐ CHANGE (instead of required)
//   readOnly = false,
//   autoComplete,
//   error,                // ⭐ ADD THIS
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         className="text-sm font-medium"
//         style={{ color: themes.backgroundDark }}
//       >
//         {label}
//       </label>

//       <input
//         type={type}
//         autoComplete={autoComplete}
//         {...register(name, rules)}   
//         readOnly={readOnly}
//         className="px-4 py-2 rounded outline-none"
//         style={{
//           backgroundColor: readOnly ? themes.surfaceMuted : themes.textWhite,
//           color: themes.backgroundDark,
//           border: `1px solid ${error ? "#ef4444" : themes.backgroundGray}`, // red border on error
//           cursor: readOnly ? "not-allowed" : "text",
//         }}
//       />

//       {error && (
//         <p className="text-red-500 text-sm">{error.message}</p>
//       )}
//     </div>
//   );
// }


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
  style={type === "file" ? { "--file-bg": themes.primary } : {}}
  className={
    type === "file"
      ? "w-full text-sm border rounded px-3 py-2 file-btn file:text-white file:px-2 file:py-1 file:rounded file:border-0 file:mr-4 file:cursor-pointer"
      : "w-full px-4 py-2 rounded outline-none border"
  }
/>


      {/* <input
        type={type}
        autoComplete={autoComplete}
        {...register(name, rules)}
        readOnly={readOnly}
        className="px-4 py-2 rounded outline-none"
        style={{
          backgroundColor: readOnly ? themes.surfaceMuted : themes.textWhite,
          color: themes.backgroundDark,
          border: `1px solid ${error ? "#ef4444" : themes.backgroundGray}`,
          cursor: readOnly ? "not-allowed" : "text",
        }}
      /> */}

      {error?.message && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
}
