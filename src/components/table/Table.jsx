


import { themes } from "../../config/theme.config";

export default function Table({ header, children, showIndex = true }) {
  return (
    <div
      className="w-full overflow-x-auto rounded-xl border"
      style={{ borderColor: themes.backgroundGray }}
    >
      <table
        className="w-full table-fixed text-md border-collapse"
        style={{ fontFamily: themes.fontPrimary }}
      >
        {/* 🔹 HEADER */}
        {header}

        {/* 🔹 BODY */}
        <tbody>
          {showIndex
            ? children.map((child, index) =>
                child
                  ? {
                      ...child,
                      props: {
                        ...child.props,
                        index: index,   // 👈 inject index globally
                      },
                    }
                  : child
              )
            : children}
        </tbody>
      </table>
    </div>
  );
}
