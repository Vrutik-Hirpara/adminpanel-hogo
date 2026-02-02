import { themes } from "../../config/theme.config";

const BASE_URL = "https://hogofilm.pythonanywhere.com";

export default function EmployeeDocumentsViewCard({ docs, employeeName }) {
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
        <p className="text-sm opacity-90">Employee Documents</p>
      </div>

      {/* ⚪ BODY */}
      <div className="p-6 space-y-8">
        {/* DOCUMENT NUMBERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail label="PAN Number" value={docs.pancard_number} />
          <Detail label="Aadhar Number" value={docs.aadhar_number} />
          <Detail label="Driving License Number" value={docs.driving_license_number} />
          <Detail label="Uploaded At" value={docs.uploaded_at?.slice(0, 10)} />
        </div>

        {/* DOCUMENT IMAGES */}
        <div>
          <h4 className="font-semibold mb-4">Uploaded Documents</h4>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <ImagePreview label="Photo" src={docs.photo} />
            <ImagePreview label="Aadhar Front" src={docs.aadhar_front} />
            <ImagePreview label="Aadhar Back" src={docs.aadhar_back} />
            <ImagePreview label="PAN Card" src={docs.pan_card} />
            <ImagePreview label="DL Front" src={docs.driving_license_front} />
            <ImagePreview label="DL Back" src={docs.driving_license_back} />
          </div>
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

function ImagePreview({ label, src }) {
  if (!src) return null;

  return (
    <div>
      <p className="text-xs mb-2 text-gray-500">{label}</p>
      <img
        src={`${BASE_URL}${src}`}
        alt={label}
        className="rounded-lg border shadow-md h-32 w-full object-cover"
      />
    </div>
  );
}
