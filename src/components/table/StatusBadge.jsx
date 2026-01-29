// export default function StatusBadge({ status }) {
//   const isAvailable = status === "Available";

//   return (
//     <span
//       className={`px-3 py-1 text-xs font-medium rounded-full
//         ${
//           isAvailable
//             ? "bg-green-100 text-green-700"
//             : "bg-red-100 text-red-700"
//         }`}
//     >
//       {status}
//     </span>
//   );
// }









// export default function StatusBadge({ status }) {
//   const isActive = status === "Active";

//   return (
//     <span
//       className="px-3 py-1 text-xs font-medium rounded-full"
//       style={{
//         backgroundColor: isActive ? "#DCFCE7" : "#FEE2E2", // green / red bg
//         color: isActive ? "#166534" : "#991B1B", // green / red text
//       }}
//     >
//       {status}
//     </span>
//   );
// }












export default function StatusBadge({ status }) {
  const isActive = status === true || status === "Active";

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap
        ${
          isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
