// import { themes } from "../../config/theme.config";

// export default function FormInput({
//   label,
//   name,
//   type = "text",
//   register,
//   required = false,
//   readOnly = false,
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
//         {...register(name, { required })}
//         readOnly={readOnly}
//         className="px-4 py-2 rounded outline-none"
//         style={{
//           backgroundColor: readOnly ? "#f3f4f6" : themes.textWhite, // ✅ light gray for view
//           color: themes.backgroundDark,                              // ✅ FIX
//           border: `1px solid ${themes.backgroundGray}`,              // ✅ VISIBLE BORDER
//           cursor: readOnly ? "not-allowed" : "text",
//         }}
//       />
//     </div>
//   );
// }





import { themes } from "../../config/theme.config";

export default function FormInput({
  label,
  name,
  type = "text",
  register,
  required = false,
  readOnly = false,
  autoComplete,   // ⭐ ADD THIS
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-medium"
        style={{ color: themes.backgroundDark }}
      >
        {label}
      </label>

      <input
        type={type}
        autoComplete={autoComplete}   // ⭐ ADD THIS
        {...register(name, { required })}
        readOnly={readOnly}
        className="px-4 py-2 rounded outline-none"
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
