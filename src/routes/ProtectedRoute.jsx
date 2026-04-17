// import { Navigate } from "react-router-dom";
 
// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
 
//   if (!token) return <Navigate to="/login" />;
 
//   return children;
// }



// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isValidToken = (t) =>
    !!t && t !== "undefined" && t !== "null" && String(t).trim() !== "";

  if (!isValidToken(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}