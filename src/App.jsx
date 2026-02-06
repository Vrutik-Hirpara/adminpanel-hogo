import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { themes } from "./config/theme.config";


export default function App() {
    useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--primary", themes.primary);
    root.style.setProperty("--primary-hover", themes.hover);
    root.style.setProperty("--sidebar-bg", themes.sidebar);
    root.style.setProperty("--page-bg", themes.backgroundBlack);
    root.style.setProperty("--card-bg", themes.textWhite);
    root.style.setProperty("--text-main", themes.textDark);
    root.style.setProperty("--text-muted", themes.textMuted);
    root.style.setProperty("--text-white", themes.textWhite);
    root.style.setProperty("--border-color", themes.borderColor);
    root.style.setProperty("--success", themes.success);
    root.style.setProperty("--danger", themes.danger);
    root.style.setProperty("--warning", themes.warning);
  }, []);

  return <AppRoutes />;
}
