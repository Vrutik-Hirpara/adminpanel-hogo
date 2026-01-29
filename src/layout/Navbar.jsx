
// import { themes } from "../config/theme.config";
// export default function Navbar() {
//   return (
//     <header
//       className="flex justify-between items-center px-8 py-4 shadow"
//       style={{
//         backgroundColor: themes.textWhite,
//         fontFamily: themes.fontPrimary,
//       }}
//     >
//       {" "}
//       <h2 className="text-xl font-semibold"></h2>{" "}
//       <button
//         className="text-white px-5 py-2 rounded transition"
//         style={{ backgroundColor: themes.primary }}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.backgroundColor = themes.hover)
//         }
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.backgroundColor = themes.primary)
//         }
//       >
//         {" "}
//         Logout{" "}
//       </button>{" "}
//     </header>
//   );
// }







import { themes } from "../config/theme.config";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      className="flex justify-end items-center px-8 py-4 shadow"
      style={{
        backgroundColor: themes.textWhite,
        fontFamily: themes.fontPrimary,
      }}
    >

      <button
        className="text-white px-5 py-2 rounded transition"
        style={{ backgroundColor: themes.primary }}
        onClick={handleLogout}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = themes.hover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = themes.primary)
        }
      >
        Logout
      </button>
    </header>
  );
}
