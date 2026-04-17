export default function LeadInfoHeader({ data, title = "Lead Information" }) {
  if (!data || data.length === 0) return null;

  const firstItem = data[0];

  return (
    <div className="bg-gray-50 border rounded-lg p-4 mb-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
         <div>
          <p className="text-gray-500">Contact Person</p>
          <p className="font-semibold">{firstItem?.contact_person || "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Contact Number</p>
          <p className="font-semibold">{firstItem?.contact_person_display || "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Lead Type</p>
          <p className="font-semibold">{firstItem?.lead_type || "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Lead Status</p>
          <p className="font-semibold">{firstItem?.lead_status || "-"}</p>
        </div>
       
      </div>
    </div>
  );
}