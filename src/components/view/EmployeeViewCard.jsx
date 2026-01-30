// // export default function EmployeeViewCard({ employee }) {
// //   if (!employee) return null;

// //   const InfoRow = ({ label, value }) => (
// //     <div className="flex justify-between border-b py-2">
// //       <span className="font-medium text-gray-600">{label}</span>
// //       <span className="text-gray-800">{value || "-"}</span>
// //     </div>
// //   );

// //   return (
// //     <div className="bg-white shadow rounded-xl p-6 max-w-3xl mx-auto">
// //       <h2 className="text-xl font-semibold mb-4">Employee Information</h2>

// //       <InfoRow label="Employee Code" value={employee.employee_code} />
// //       <InfoRow label="First Name" value={employee.first_name} />
// //       <InfoRow label="Last Name" value={employee.last_name} />
// //       <InfoRow label="Gender" value={employee.gender} />
// //       <InfoRow label="Date of Birth" value={employee.date_of_birth} />
// //       <InfoRow label="Email" value={employee.email} />
// //       <InfoRow label="Phone" value={employee.phone} />
// //       <InfoRow label="Joining Date" value={employee.joining_date} />
// //       <InfoRow label="Employment Type" value={employee.employment_type} />
// //       <InfoRow label="Status" value={employee.status ? "Active" : "Inactive"} />
// //     </div>
// //   );
// // }





// import { themes } from "../../config/theme.config";

// export default function EmployeeViewCard({ employee }) {
//   if (!employee) return null;

//   return (
//     <div
//       className="rounded-xl overflow-hidden"
//       style={{
//         border: `1px solid ${themes.backgroundGray}`,
//         backgroundColor: themes.textWhite,
//       }}
//     >
//       {/* HEADER */}
//       <div
//         className="px-6 py-4"
//         style={{ backgroundColor: themes.primary, color: themes.textWhite }}
//       >
//         <h3 className="text-lg font-semibold">
//           {employee.first_name} {employee.last_name}
//         </h3>
//         <p className="text-sm opacity-90">Employee Details</p>
//       </div>

//       {/* BODY */}
//       <div className="p-6 space-y-7">
//         <Detail label="Employee Code" value={employee.employee_code} />
//         <Detail label="First Name" value={employee.first_name} />
//         <Detail label="Last Name" value={employee.last_name} />
//         <Detail label="Gender" value={employee.gender} />
//         <Detail label="Date of Birth" value={employee.date_of_birth} />
//         <Detail label="Email" value={employee.email} />
//         <Detail label="Phone" value={employee.phone} />
//         <Detail label="Joining Date" value={employee.joining_date} />
//         <Detail label="Employment Type" value={employee.employment_type} />
//         <Detail label="Status" value={employee.status} />
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>
//         {label}
//       </p>
//       <p className="font-medium">{value || "-"}</p>
//     </div>
//   );
// }










import { themes } from "../../config/theme.config";

export default function EmployeeViewCard({ employee }) {
  const statusText = employee.status === "Active" ? "Active" : "Inactive";

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${themes.backgroundGray}`,
        backgroundColor: themes.textWhite,
        fontFamily: themes.fontPrimary,
      }}
    >
      {/* 🔴 HEADER */}
      <div
        className="px-6 py-4"
        style={{
          backgroundColor: themes.primary,
          color: themes.textWhite,
        }}
      >
        <h3 className="text-lg font-semibold">
          {employee.first_name} {employee.last_name}
        </h3>
        <p className="text-sm opacity-90">Employee Details</p>
      </div>

      {/* ⚪ BODY */}
      <div className="p-6 space-y-7">
        {/* STATUS BADGE */}
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              statusText === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {statusText}
          </span>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail label="Employee Code" value={employee.employee_code} />
          <Detail label="First Name" value={employee.first_name} />
          <Detail label="Last Name" value={employee.last_name} />
          {/* <Detail label="Gender" value={employee.gender} /> */}
          <Detail label="Date of Birth" value={employee.date_of_birth} />
          <Detail label="Email" value={employee.email} />
          <Detail label="Phone" value={employee.phone} />
          <Detail label="Joining Date" value={employee.joining_date} />
          {/* <Detail label="Employment Type" value={employee.employment_type} /> */}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p
        className="text-xs mb-1"
        style={{ color: themes.backgroundGray }}
      >
        {label}
      </p>
      <p
        className="font-medium text-sm"
        style={{ color: themes.backgroundDark }}
      >
        {value || "-"}
      </p>
    </div>
  );
}
