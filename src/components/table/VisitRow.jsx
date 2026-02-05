// import TableActions from "./TableActions";
// import { themes } from "../../config/theme.config";
// import { VisitsAPI } from "../../services/apiService";

// export default function VisitRow({
//     row,
//     index,
//     onView,
//     onEdit,
//     onDelete,
//     refreshData,
// }) {
//     const handleFollowupChange = async (e) => {
//         const newValue = e.target.value;

//         // ❗ If same value, do nothing
//         if (newValue === row.followup_type) return;

//         const confirmChange = window.confirm(
//             `Change followup type to "${newValue}" ?`
//         );

//         if (!confirmChange) {
//             // revert dropdown visually
//             e.target.value = row.followup_type || "";
//             return;
//         }

//         try {
//             await VisitsAPI.update(row.id, { followup_type: newValue });
//             refreshData();
//         } catch (err) {
//             console.log("Followup update failed", err);
//             alert("Update failed!");
//             e.target.value = row.followup_type || "";
//         }
//     };


//     return (
//         <tr className="border-t" style={{ borderColor: themes.backgroundGray }}>

//             <td className="px-4 py-3 text-center">{index + 1}</td>
//             <td className="px-4 py-3 text-center">{row.employee_id || "-"}</td>
//             <td className="px-4 py-3 text-center">{row.lead_id || "-"}</td>

//             {/* CHECK IN TIME */}
//             {/* ⏰ CHECK-IN / CHECK-OUT */}
//             <td className="px-4 py-3 text-center whitespace-nowrap">
//                 {row.check_in_time && row.checkout_time
//                     ? `${new Date(row.check_in_time).toLocaleTimeString()} / ${new Date(row.checkout_time).toLocaleTimeString()}`
//                     : "-"}
//             </td>


//         {/* 🔔 FOLLOWUP TYPE BADGE */}
// <td className="px-4 py-3 text-center w-[140px]">
//   {row.followup_type ? (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-semibold
//         ${row.followup_type === "CALL" && "bg-blue-100 text-blue-700"}
//         ${row.followup_type === "MEETING" && "bg-green-100 text-green-700"}
//         ${row.followup_type === "VISIT" && "bg-purple-100 text-purple-700"}
//       `}
//     >
//       {row.followup_type}
//     </span>
//   ) : "-"}
// </td>



//       {/* 📝 NOTES ICON */}
// {/* 📝 NOTES ICON */}
// <td className="px-4 py-3 text-center">
//   {row.notes ? (
//     <div className="relative inline-block group">

//       <span className="cursor-pointer text-blue-600 text-lg">📝</span>

//       {/* TOOLTIP */}
// <div className="absolute z-50 hidden group-hover:block bg-black text-white text-xs rounded px-3 py-2 top-full -mt-8 left-1/2 -translate-x-1/2 w-56 text-left break-words shadow-xl">
//   {row.notes}
// </div>


//     </div>
//   ) : "-"}
// </td>



//             <td className="px-4 py-3 text-center">
//                 <TableActions
//                     onView={() => onView(row)}
//                     onEdit={() => onEdit(row)}
//                     onDelete={() => onDelete(row.id)}
//                 />
//             </td>

//         </tr>
//     );
// }
