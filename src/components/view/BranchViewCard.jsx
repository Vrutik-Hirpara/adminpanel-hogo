// import { themes } from "../../config/theme.config";

// export default function BranchViewCard({ branch }) {
//   return (
//     <div
//       className="rounded-xl overflow-hidden"
//       style={{
//         border: `1px solid ${themes.backgroundGray}`,
//         backgroundColor: themes.textWhite,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       <div
//         className="px-6 py-4"
//         style={{ backgroundColor: themes.primary, color: themes.textWhite }}
//       >
//         <h3 className="text-lg font-semibold">{branch.name}</h3>
//         <p className="text-sm opacity-90">Office Branch Details</p>
//       </div>

//       <div className="p-6 space-y-7">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//           <Detail label="Branch Name" value={branch.name} />
//           <Detail label="City" value={branch.city} />
//           <Detail label="State" value={branch.state} />
//           <Detail label="Country" value={branch.country} />
//         </div>

//         <div
//           className=""
//         >
//           <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>
//             Address
//           </p>
//           <p className="text-sm leading-relaxed" style={{ color: themes.backgroundDark }}>
//             {branch.address || "-"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>{label}</p>
//       <p className="font-medium text-sm" style={{ color: themes.backgroundDark }}>{value || "-"}</p>
//     </div>
//   );
// }
