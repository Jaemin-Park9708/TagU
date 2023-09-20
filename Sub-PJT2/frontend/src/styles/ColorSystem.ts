import { themeProps } from "@emotion/react";

export const palette = {
  /* pink */
  pink_50: "#fff1f2",
  pink_100: "#ffe4e6",
  pink_200: "#fecdd3",
  pink_300: "#fda4af",
  pink_400: "#fb7185",
  pink_500: "#f43f5e",

  /* gray */
  white: "#ffffff",
  gray_100: "#f6f6f6",
  gray_200: "#e6e6e6",
  gray_300: "#c6c6c6",
  gray_400: "#a9a9a9",
  gray_500: "#707070",
  gray_600: "#5a5a5a",
  gray_700: "#484848",
  gray_800: "#373737",
  gray_900: "#212121",
  black: "#000000",

  /* neutral */
  neutral_50: "#fafafa",
  neutral_100: "#f5f5f5",
  neutral_200: "#e5e5e5",
  neutral_300: "#d4d4d4",
  neutral_400: "#a3a3a3",
  neutral_500: "#737373",
  neutral_600: "#525252",
  neutral_700: "#404040",
  neutral_800: "#262626",
  neutral_900: "#171717",
  neutral_950: "#0a0a0a",
};

export const darkTheme: themeProps = {
  bg: {
    deep: palette.neutral_800,
    mid: palette.gray_800,
    light: palette.neutral_700,
  },
  font: {
    deep: palette.neutral_800,
    mid: palette.neutral_400,
    light: palette.neutral_50,
    text: palette.neutral_50,
  },
  point: {
    deep: palette.pink_500,
    mid: palette.pink_400,
    light: palette.pink_300,
  },
};

export const lightTheme: themeProps = {
  bg: {
    deep: palette.pink_500,
    mid: palette.pink_200,
    light: palette.neutral_50,
  },
  font: {
    deep: palette.neutral_800,
    mid: palette.neutral_400,
    light: palette.neutral_50,
    text: palette.neutral_800,
  },
  point: {
    deep: palette.pink_500,
    mid: palette.pink_400,
    light: palette.pink_300,
  },
};
