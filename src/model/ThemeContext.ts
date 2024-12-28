import { ReactNode } from "react";

export enum ThemeEnum {
  Light = "light",
  Dark = "dark",
}

export type ThemeContextType = {
  theme: ThemeEnum;
  toggleTheme: () => void;
};
export type ThemeProviderProps = {
  children: ReactNode;
};
