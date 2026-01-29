

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


