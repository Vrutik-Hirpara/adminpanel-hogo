import { themes } from "../../config/theme.config";

export default function EmployeePersonalDetailsViewCard({ details, employeeName }) {
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
        <h3 className="text-lg font-semibold">{employeeName}</h3>
        <p className="text-sm opacity-90">Personal Details</p>
      </div>

      {/* ⚪ BODY */}
      <div className="p-6 space-y-7">

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail label="Father Name" value={details.father_name} />
          <Detail label="Mother Name" value={details.mother_name} />
          <Detail label="Marital Status" value={details.marital_status} />
          <Detail label="Spouse Name" value={details.spouse_name} />
        </div>

        {/* ADDRESS */}
        <div>
          <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>
            Address
          </p>
          <p className="text-sm leading-relaxed" style={{ color: themes.backgroundDark }}>
            {details.address || "-"}
          </p>
        </div>

        {/* EMERGENCY CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail label="Emergency Contact Name" value={details.emergency_contact_name} />
          <Detail label="Emergency Contact Phone" value={details.emergency_contact_phone} />
        </div>

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
