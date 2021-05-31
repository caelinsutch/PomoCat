import { createTheme } from "@shopify/restyle";
import palette from "./palette";

const theme = createTheme({
  colors: {
    brand: palette.primary500,
    secondary: palette.accent500,
    primaryBackground: palette.white,
    secondaryBackground: palette.gray50,
    primaryForeground: palette.gray800,
    secondaryForeground: palette.gray500,
    ...palette,
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  borderRadii: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 36,
    xxl: 48,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    "6xl": {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: 64,
      color: "primaryForeground",
    },
    "5xl": {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: 48,
      color: "primaryForeground",
    },
    "4xl": {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: 36,
      color: "primaryForeground",
    },
    "3xl": {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: 30,
      color: "primaryForeground",
    },
    "2xl": {
      fontFamily: "Inter_500Medium",
      fontSize: 24,
      color: "primaryForeground",
    },
    xl: {
      fontFamily: "Inter_500Medium",
      fontSize: 22,
      color: "primaryForeground",
    },
    lg: {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: 20,
      color: "primaryForeground",
    },
    md: {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: 18,
      color: "primaryForeground",
    },
    sm: {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: 16,
      color: "primaryForeground",
    },
    xs: {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: 14,
      color: "primaryForeground",
    },
  },
  inputVariants: {
    defaults: {
      backgroundColor: "gray100",
      color: "gray800",
      minWidth: 350,
      fontSize: 18,
      borderRadius: "sm",
      padding: "md",
    },
    warning: {
      borderColor: "accent400",
      borderWidth: 2,
    },
    error: {
      borderColor: "red500",
      borderWidth: 2,
    },
    disabled: {
      backgroundColor: "gray500",
      color: "gray400",
    },
  },
});

export type Theme = typeof theme;

export default theme;
