import { themes } from "../../config/theme.config";

export default function FormContainer({ title, children }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: themes.textWhite,
        border: `1px solid ${themes.backgroundGray}`, // ✅ BORDER ADDED
      }}
    >
      {/* HEADER */}
      {title && (
        <div
          className="px-6 py-4"
          style={{
            backgroundColor: themes.primary,
            color: themes.textWhite,
          }}
        >
          <h2 className="text-lg font-semibold">
            {title}
          </h2>
        </div>
      )}

      {/* BODY */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
