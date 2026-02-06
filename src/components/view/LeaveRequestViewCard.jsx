import { themes } from "../../config/theme.config";

export default function LeaveRequestViewCard({ leave }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${themes.backgroundGray}`,
        backgroundColor: themes.textWhite,
        fontFamily: themes.fontPrimary,
      }}
    >
      <div
        className="px-6 py-4"
        style={{ backgroundColor: themes.primary, color: themes.textWhite }}
      >
        <h3 className="text-lg font-semibold">Leave Details</h3>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <Detail label="Leave Type" value={leave.leave_type} />
        <Detail label="Start Date" value={leave.start_date} />
        <Detail label="End Date" value={leave.end_date} />
        <Detail label="Total Leaves" value={leave.total_leaves} />
        <Detail label="Reason" value={leave.reason} />
        <Detail label="Status" value={leave.status} />
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs mb-1 text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
