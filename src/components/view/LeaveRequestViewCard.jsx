// import { themes } from "../../config/theme.config";

// export default function LeaveRequestViewCard({ leave }) {
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
//         <h3 className="text-lg font-semibold">Leave Details</h3>
//       </div>

//       <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
//         <Detail label="Leave Type" value={leave.leave_type} />
//         <Detail label="Start Date" value={leave.start_date} />
//         <Detail label="End Date" value={leave.end_date} />
//         <Detail label="Total Leaves" value={leave.total_leaves} />
//         <Detail label="Reason" value={leave.reason} />
//         <Detail label="uploaded document" value={leave.status} />
//         <Detail label="Status" value={leave.status} />

//         <Detail label="employee id" value={leave.status} />

//         <Detail label="approved by" value={leave.status} />


//       </div>
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs mb-1 text-gray-500">{label}</p>
//       <p className="font-medium">{value || "-"}</p>
//     </div>
//   );
// }
import { themes } from "../../config/theme.config";

const BASE_URL = "https://hogofilm.pythonanywhere.com";

export default function LeaveRequestViewCard({ leave }) {
  const statusText = leave.status || "pending";

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${themes.backgroundGray}`,
        backgroundColor: themes.textWhite,
        fontFamily: themes.fontPrimary,
      }}
    >
      {/* 🔵 HEADER */}
      <div
        className="px-6 py-4"
        style={{
          backgroundColor: themes.primary,
          color: themes.textWhite,
        }}
      >
        <h3 className="text-lg font-semibold">Leave Request</h3>
        <p className="text-sm opacity-90">Leave Details</p>
      </div>

      {/* ⚪ BODY */}
      <div className="p-6 space-y-8">

        {/* STATUS BADGE */}
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              statusText === "approved"
                ? "bg-green-100 text-green-700"
                : statusText === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {statusText}
          </span>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail label="Employee" value={leave.employee_name || leave.employee_id} />
          <Detail label="Leave Type" value={leave.leave_type} />
          <Detail label="Start Date" value={formatDate(leave.start_date)} />
          <Detail label="End Date" value={formatDate(leave.end_date)} />
          <Detail label="Total Leaves" value={leave.total_leaves} />
          <Detail label="Approved By" value={leave.approved_by_name || leave.approved_by} />
          <Detail label="Approved At" value={formatDateTime(leave.approved_at)} />
        </div>

        {/* REASON */}
        <div>
          <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>
            Reason
          </p>
          <p className="text-sm leading-relaxed" style={{ color: themes.backgroundDark }}>
            {leave.reason || "-"}
          </p>
        </div>

        {/* 📎 DOCUMENT PREVIEW */}
        {leave.upload_doc && (
          <div>
            <p className="text-xs mb-2 text-gray-500">Uploaded Document</p>

            {isImage(leave.upload_doc) ? (
              <img
                src={`${BASE_URL}${leave.upload_doc}`}
                alt="Leave Document"
                className="rounded-lg border shadow-md h-40 object-cover"
              />
            ) : (
              <a
                href={`${BASE_URL}${leave.upload_doc}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Document
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>
        {label}
      </p>
      <p className="font-medium text-sm" style={{ color: themes.backgroundDark }}>
        {value || "-"}
      </p>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
}

function formatDateTime(date) {
  if (!date) return "-";
  return new Date(date).toLocaleString();
}

function isImage(url) {
  return /\.(jpeg|jpg|png|webp|gif)$/i.test(url);
}
