import { themes } from "../../config/theme.config";

export default function UserViewCard({ user, employeeName }) {
  return (
    <div className="rounded-xl border" style={{ borderColor: themes.backgroundGray }}>
      <div className="px-6 py-4 text-white" style={{ backgroundColor: themes.primary }}>
        <h3 className="text-lg font-semibold">{user.username}</h3>
        <p className="text-sm opacity-90">User Details</p>
      </div>

      <div className="p-6 grid grid-cols-2 gap-6 text-sm">
        <Detail label="Employee" value={employeeName} />
        <Detail label="Role" value={user.role} />
        <Detail label="Active" value={user.is_active ? "Yes" : "No"} />
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
