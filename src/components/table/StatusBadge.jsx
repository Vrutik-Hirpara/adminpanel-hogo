


export default function StatusBadge({ status }) {
  const isActive = status === true || status === "Active";

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap
        ${
          isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
