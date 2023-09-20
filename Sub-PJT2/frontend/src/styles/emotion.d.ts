import "@emotion/react";

type theme = "light" | "dark";

declare module "@emotion/react" {
  export interface themeProps {
    bg: {
      deep: string;
      mid: string;
      light: string;
    };
    font: {
      deep: string;
      mid: string;
      light: string;
      text: string;
    };
    point: {
      deep: string;
      mid: string;
      light: string;
    };
  }
}
