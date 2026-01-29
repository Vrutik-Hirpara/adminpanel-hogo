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
  },
  plugins: [],
};
