// export default function FormSection({ title }) {
//   return (
//     <div className="mt-8 mb-4">
//       <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
//         {title}
//       </h3>
//       <div className="mt-1 h-[2px] w-10 bg-red-600" />
//     </div>
//   );
// }


import { themes } from "../../config/theme.config";

export default function FormSection({ title }) {
  return (
    <div className="mt-8 mb-4">
      <h3
        className="text-sm font-semibold uppercase tracking-wide"
        style={{
          color: themes.backgroundDark,
          fontFamily: themes.fontPrimary,
        }}
      >
        {title}
      </h3>

      <div
        className="mt-1 h-[2px] w-10"
        style={{ backgroundColor: themes.primary }}
      />
    </div>
  );
}
