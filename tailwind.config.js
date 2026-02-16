// import { themes } from "./src/config/theme.config";

// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: themes.primary,
//         hover: themes.hover,
//         active: themes.active,
//         dark: themes.backgroundDark,
//         blackish: themes.backgroundBlack,
//         grayCustom: themes.backgroundGray,
//       },
//       fontFamily: {
//         primary: ["Oxanium", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };

import { themes } from "./src/config/theme.config";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: themes.primary,
        hover: themes.hover,
        active: themes.active,
        dark: themes.backgroundDark,
        blackish: themes.backgroundBlack,
        grayCustom: themes.backgroundGray,
      },
      fontFamily: {
        primary: ["Oxanium", "sans-serif"],
      },
    },

    // 👇 Add this block (global dynamic text sizes)
    fontSize: {
      xs: "0.75rem",   // 12px
      sm: "0.875rem",  // 14px
      base: "1rem",    // 16px
      lg: "1.125rem",  // 18px
      xl: "1.25rem",   // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
  },
  plugins: [],
};
