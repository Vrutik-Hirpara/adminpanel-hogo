import { themes } from "../../config/theme.config";

export default function HolidayViewCard({ holiday }) {
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
        <h3 className="text-lg font-semibold">{holiday.holiday_name}</h3>
        <p className="text-sm opacity-90">Holiday Details</p>
      </div>

      {/* ⚪ BODY */}
      <div className="p-6 space-y-7">
        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail label="Holiday Name" value={holiday.holiday_name} />
          <Detail label="Holiday Date" value={holiday.holiday_date} />
          <Detail label="Holiday Type" value={holiday.holiday_type} />
          <Detail label="Paid Holiday" value={holiday.is_paid ? "Yes" : "No"} />
          <Detail label="Description" value={holiday.description} />
          <Detail label="Created At" value={holiday.created_at} />
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
