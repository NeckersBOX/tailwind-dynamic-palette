const Color = require("color");

const lighten = (clr, val) =>
  Color(clr).mix(Color("white"), val).rgb().string();

const darken = (clr, val) => 
  Color(clr).mix(Color("black"), val).rgb().string();

const generateContrasts = (variant, palette) => ({
  [variant]: palette,
  [`on-${variant}`]: Object.keys(palette).reduce(
    (enhancedPalette, shade) => ({
      ...enhancedPalette,
      [shade]: Color(palette[shade]).isLight() ? "#000000" : "#ffffff",
    }),
    {}
  ),
});

const palette = {
  primary: "#006E90",
  secondary: "#99C24D",
  accent: "#F18F01",
  background: "#ffffff",
  disabled: "#dadada",
  success: "#2fa81b",
  info: "#0284c7",
  warning: "#fdd230",
  error: "#be1931",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  safelist: [{ pattern: /(bg|text)-/ }], // Ignore this line, it's defined only for this example
  theme: {
    extend: {
      colors: Object.keys(palette).reduce(
        (colors, variant) => ({
          ...colors,
          ...generateContrasts(variant, {
            DEFAULT: palette[variant],
            50: lighten(palette[variant], 0.9),
            100: lighten(palette[variant], 0.8),
            200: lighten(palette[variant], 0.6),
            300: lighten(palette[variant], 0.4),
            400: lighten(palette[variant], 0.2),
            500: palette[variant],
            600: darken(palette[variant], 0.2),
            700: darken(palette[variant], 0.4),
            800: darken(palette[variant], 0.6),
            900: darken(palette[variant], 0.8),
          }),
        }),
        {}
      ),
    },
  },
  plugins: [],
};
