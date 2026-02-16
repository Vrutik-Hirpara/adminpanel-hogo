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

import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");   // ✅ SAME KEY AS LOGIN
  const location = useLocation();

  // 🔒 If not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ If logged in → allow page
  return children;
}
