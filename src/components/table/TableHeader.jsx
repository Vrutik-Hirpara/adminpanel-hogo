

import { themes } from "../../config/theme.config";

export default function TableHeader({ columns }) {
  return (
    <thead
      style={{
        backgroundColor: themes.primary,
        color: themes.textWhite,
      }}
    >
      <tr>
  {/* SERIAL NUMBER HEADER */}
  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap w-[5%]">
    No
  </th>

  {columns.map((col) => (
    <th
      key={col}
      className="px-4 py-3 text-center align-middle font-semibold whitespace-nowrap"
    >
      {col}
    </th>
  ))}
</tr>

    </thead>
  );
}


