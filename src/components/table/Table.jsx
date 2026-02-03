


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













// import { themes } from "../../config/theme.config";

// export default function Table({ header, children }) {
//   return (
//     <div
//       className="w-full overflow-x-auto rounded-xl border"
//       style={{ borderColor: themes.backgroundGray }}
//     >
//       <table
//         className="min-w-[900px] w-full text-sm border-collapse"
//         style={{ fontFamily: themes.fontPrimary }}
//       >
//         {header}
//         <tbody>{children}</tbody>
//       </table>
//     </div>
//   );
// }



// import { themes } from "../../config/theme.config";

// export default function Table({ header, children }) {
//   return (
//     <div
//       className="w-full rounded-xl border overflow-hidden bg-white"
//       style={{ borderColor: themes.backgroundGray }}
//     >
//       {/* scroll only inside */}
//       <div className="w-full overflow-x-auto">
//         <table
//           className="w-full table-fixed text-sm border-collapse"
//           style={{ fontFamily: themes.fontPrimary }}
//         >
//           {header}
//           <tbody>{children}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






import { themes } from "../../config/theme.config";

export default function Table({ header, children, showIndex = true }) {
  return (
    <div
      className="w-full overflow-x-auto rounded-xl border"
      style={{ borderColor: themes.backgroundGray }}
    >
      <table
        className="w-full table-fixed text-sm border-collapse"
        style={{ fontFamily: themes.fontPrimary }}
      >
        {/* 🔹 HEADER */}
        {header}

        {/* 🔹 BODY */}
        <tbody>
          {showIndex
            ? children.map((child, index) =>
                child
                  ? {
                      ...child,
                      props: {
                        ...child.props,
                        index: index,   // 👈 inject index globally
                      },
                    }
                  : child
              )
            : children}
        </tbody>
      </table>
    </div>
  );
}
