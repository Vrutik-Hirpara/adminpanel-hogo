import { themes } from "../config/theme.config";

export default function PageContainer({ children }) {
  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: themes.backgroundGray }}
    >
      <div
        className="max-w-6xl mx-auto rounded-xl shadow p-6"
        style={{ backgroundColor: themes.textWhite }}
      >
        {children}
      </div>
    </div>
  );
}
