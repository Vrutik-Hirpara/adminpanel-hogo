import { themes } from "../config/theme.config";

export default function PageContainer({ children }) {
  return (
    <div
      className="min-h-screen p-3 sm:p-6"
      style={{ backgroundColor: themes.backgroundGray }}
    >
      <div
        className="max-w-7xl mx-auto rounded-xl shadow p-4 sm:p-4"
        style={{ backgroundColor: themes.textWhite }}
      >
        {children}
      </div>
    </div>
  );
}
