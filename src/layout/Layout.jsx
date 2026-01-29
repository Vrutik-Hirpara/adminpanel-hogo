// import Sidebar from "../layout/Sidebar";
// import Navbar from "../layout/Navbar";
// import { themes } from "../config/theme.config";

// export default function Layout({ children }) {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <main className="p-8 min-h-screen" style={{ backgroundColor: themes.backgroundGray }}>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { Outlet } from "react-router-dom";
import { themes } from "../config/theme.config";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main
          className="p-4 sm:p-6 lg:p-8 min-h-screen"
          style={{ backgroundColor: themes.backgroundGray }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

