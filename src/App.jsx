// import AppRoutes from "./routes/AppRoutes";
// import { useEffect } from "react";
// import { themes } from "./config/theme.config";


// export default function App() {
//     useEffect(() => {
//     const root = document.documentElement;

//     root.style.setProperty("--primary", themes.primary);
//     root.style.setProperty("--primary-hover", themes.hover);
//     root.style.setProperty("--sidebar-bg", themes.sidebar);
//     root.style.setProperty("--page-bg", themes.backgroundBlack);
//     root.style.setProperty("--card-bg", themes.textWhite);
//     root.style.setProperty("--text-main", themes.textDark);
//     root.style.setProperty("--text-muted", themes.textMuted);
//     root.style.setProperty("--text-white", themes.textWhite);
//     root.style.setProperty("--border-color", themes.borderColor);
//     root.style.setProperty("--success", themes.success);
//     root.style.setProperty("--danger", themes.danger);
//     root.style.setProperty("--warning", themes.warning);
//   }, []);

//   return <AppRoutes />;
// }

import AppRoutes from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import { themes } from "./config/theme.config";
import NotificationSnackbar from "./components/common/NotificationSnackbar";

export default function App() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  return (
    <>
      <AppRoutes setError={setError} setSuccess={setSuccess} />

      <NotificationSnackbar
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
      />
    </>
  );
}