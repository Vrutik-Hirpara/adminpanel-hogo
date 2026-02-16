

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { themes } from "../config/theme.config";

export default function Card({ title, value, color, path, icon: Icon }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => navigate(path)}
      style={{ backgroundColor: themes.textWhite , borderColor: themes.borderLight}}
      className="cursor-pointer  rounded-2xl border  shadow-sm p-6 
                 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      {/* 🔵 TOP ACCENT LINE (RESTORED) */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: color }}
      />

      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider"style={{ color: themes.textMuted }}>
            {title}
          </p>
          <h2 className="text-3xl font-bold mt-2" style={{ color: themes.backgroundBlack }}>{value}</h2>
        </div>

        {/* ICON BOX */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + "20" }}
        >
          {Icon && <Icon className="w-6 h-6" style={{ color }} />}
        </div>
      </div>
    </motion.div>
  );
}
