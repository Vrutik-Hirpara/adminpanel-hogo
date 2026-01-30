// import { themes } from "../../config/theme.config";

// export default function DepartmentViewCard({ department }) {
//   return (
//     <div className="rounded-xl overflow-hidden"
//       style={{ border:`1px solid ${themes.backgroundGray}`, backgroundColor:themes.textWhite }}>
//       <div className="px-6 py-4" style={{ backgroundColor:themes.primary, color:themes.textWhite }}>
//         <h3 className="text-lg font-semibold">{department.name}</h3>
//         <p className="text-sm opacity-90">Department Details</p>
//       </div>

//       <div className="p-6 space-y-7">
// <Detail label="Department Name" value={department.name} />
// <Detail
//   label="Status"
//   value={department.status ? "Active" : "Inactive"}
// />
//         <div className="pt-6 border-t" style={{ borderColor:themes.backgroundGray }}>
//           <p className="text-xs mb-1" style={{ color:themes.backgroundGray }}>Description</p>
//           <p style={{ color:themes.backgroundDark }}>{department.description || "-"}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs mb-1" style={{ color:themes.backgroundGray }}>{label}</p>
//       <p className="font-medium">{value}</p>
//     </div>
//   );
// }







import { themes } from "../../config/theme.config";

export default function DepartmentViewCard({ department }) {
  const statusText = department.status ? "Active" : "Inactive";

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
        <h3 className="text-lg font-semibold">{department.name}</h3>
        <p className="text-sm opacity-90">Department Details</p>
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
          <Detail label="Department Name" value={department.name} />
          <Detail label="Status" value={statusText} />
        </div>

        {/* DESCRIPTION */}
        <div>
          <p
            className="text-xs mb-1"
            style={{ color: themes.backgroundGray }}
          >
            Description
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: themes.backgroundDark }}
          >
            {department.description || "-"}
          </p>
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
