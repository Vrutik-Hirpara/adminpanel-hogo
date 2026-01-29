


// import { themes } from "../../config/theme.config";

// export default function Table({ header, children }) {
//   return (
//     <div
//       className="overflow-x-auto rounded-xl border"
//       style={{ borderColor: themes.backgroundGray }}
//     >
//       <table
//         className="w-full text-sm border-collapse table-fixed"
//         style={{ fontFamily: themes.fontPrimary }}
//       >
//         {header}
//         <tbody>{children}</tbody>
//       </table>
//     </div>
//   );
// }













import { themes } from "../../config/theme.config";

export default function Table({ header, children }) {
  return (
    <div
      className="w-full overflow-x-auto rounded-xl border"
      style={{ borderColor: themes.backgroundGray }}
    >
      <table
        className="min-w-[900px] w-full text-sm border-collapse"
        style={{ fontFamily: themes.fontPrimary }}
      >
        {header}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
