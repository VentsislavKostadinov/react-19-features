import { ThemeEnum } from "../../../model/ThemeContext";
import { useTheme } from "./ThemeContext";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === ThemeEnum.Light ? "#fff" : "#333",
        color: theme === ThemeEnum.Light ? "#000" : "#fff",
        padding: "20px",
      }}
    >
      <h1>Current Theme: {theme}</h1>
      <button
        style={{
          backgroundColor: theme === ThemeEnum.Dark ? "#fff" : "#333",
          color: theme === ThemeEnum.Dark ? "#000" : "#fff",
        }}
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </div>
  );
};
