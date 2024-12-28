import { createContext, useState, use } from "react";
import {
  ThemeContextType,
  ThemeEnum,
  ThemeProviderProps,
} from "../../../model/ThemeContext";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.Light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
