
import { themes } from "../config/theme.config";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      className="flex justify-between items-center px-6 py-4 shadow"
      style={{
        backgroundColor: themes.textWhite,
        fontFamily: themes.fontPrimary,
      }}
    >
      {/* LEFT SIDE → 3 BARS */}
      <button onClick={toggleSidebar} className="p-2">
        <Menu size={26} />
      </button>

      {/* RIGHT SIDE → LOGOUT */}
      <button
        className=" px-5 py-2 rounded transition"
        style={{ backgroundColor: themes.primary , color: themes.textWhite }}
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
