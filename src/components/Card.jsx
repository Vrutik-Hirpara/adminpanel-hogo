

import { themes } from "../config/theme.config";

export default function Card({ title, value, color }) {
  return (
    <div
      className="rounded-xl p-6 shadow"
      style={{
        backgroundColor: color,
        color: themes.textWhite,
        fontFamily: themes.fontPrimary,
      }}
    >
      <h4 className="text-lg">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
