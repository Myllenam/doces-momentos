const palette = {
  pink: "#E89BAA",
  pinkDark: "#C76D85",
  pinkLight: "#F8D7DA",
  cream: "#FFF8F0",
  white: "#FFFFFF",
  chocolate: "#694A3F",
  chocolateLight: "#92786D",
  border: "#F3E1E3",
  success: "#5F9C78",
  error: "#D65D6E",
} as const;

export const Colors = {
  light: {
    text: palette.chocolate,
    background: palette.cream,
    tint: palette.pinkDark,
    tabIconDefault: palette.chocolateLight,
    tabIconSelected: palette.pinkDark,
    card: palette.white,
    border: palette.border,
    primary: palette.pink,
    primaryDark: palette.pinkDark,
    secondary: palette.pinkLight,
    muted: palette.chocolateLight,
    success: palette.success,
    error: palette.error,
  },
  dark: {
    text: "#FFF1ED",
    background: "#241B20",
    tint: "#F2B5C3",
    tabIconDefault: "#BEA7AC",
    tabIconSelected: "#F2B5C3",
    card: "#35272F",
    border: "#59414B",
    primary: "#E89BAA",
    primaryDark: "#F2B5C3",
    secondary: "#59414B",
    muted: "#D0B5BD",
    success: "#8BC4A1",
    error: "#EF8895",
  },
} as const;

export default Colors;
