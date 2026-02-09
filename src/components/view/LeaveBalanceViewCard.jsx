// import { themes } from "../../config/theme.config";

// export default function LeaveBalanceViewCard({ data }) {
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
//         <h3 className="text-lg font-semibold">{data.leave_type}</h3>
//         <p className="text-sm opacity-90">Leave Balance Details</p>
//       </div>

//       <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//         <Detail label="Total Allocated" value={data.total_allocated} />
//         <Detail label="Used Days" value={data.used_days} />
//         <Detail label="Remaining Days" value={data.remaining_days} />
//         <Detail label="Employee ID" value={data.employee_id} />
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>{label}</p>
//       <p className="font-medium text-sm" style={{ color: themes.backgroundDark }}>
//         {value || "-"}
//       </p>
//     </div>
//   );
// }
