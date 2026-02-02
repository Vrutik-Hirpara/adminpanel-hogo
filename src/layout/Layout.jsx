

// import Sidebar from "../layout/Sidebar";
// import Navbar from "../layout/Navbar";
// import { Outlet } from "react-router-dom";
// import { themes } from "../config/theme.config";

// export default function Layout() {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />

//       <div className="flex-1">
//         <Navbar />

//         <main
//           className="p-4 sm:p-6 lg:p-8 min-h-screen"
//           style={{ backgroundColor: themes.backgroundGray }}
//         >
//           <Outlet />
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
    <div className="h-screen w-screen overflow-hidden flex">

      {/* 🔥 FIXED SIDEBAR */}
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>

      {/* 🔥 RIGHT CONTENT AREA */}
      <div className="flex-1 flex flex-col ml-56"> 
        <Navbar />

        {/* Only content scrolls */}
        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
          style={{ backgroundColor: themes.backgroundGray }}
        >
          <Outlet />
        </main>
      </div>

    </div>
  );
}
