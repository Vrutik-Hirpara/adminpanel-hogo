import { themes } from "../../config/theme.config";

export default function DepartmentViewCard({ department }) {
  return (
    <div className="rounded-xl overflow-hidden"
      style={{ border:`1px solid ${themes.backgroundGray}`, backgroundColor:themes.textWhite }}>
      <div className="px-6 py-4" style={{ backgroundColor:themes.primary, color:themes.textWhite }}>
        <h3 className="text-lg font-semibold">{department.name}</h3>
        <p className="text-sm opacity-90">Department Details</p>
      </div>

      <div className="p-6 space-y-7">
        <Detail label="Department Name" value={department.name} />
        <Detail label="Status" value={department.status} />
        <div className="pt-6 border-t" style={{ borderColor:themes.backgroundGray }}>
          <p className="text-xs mb-1" style={{ color:themes.backgroundGray }}>Description</p>
          <p style={{ color:themes.backgroundDark }}>{department.description || "-"}</p>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color:themes.backgroundGray }}>{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
