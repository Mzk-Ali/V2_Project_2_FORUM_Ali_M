import { createContext } from "react";

export interface ThemeContextType {
    isDarkMode: boolean,
    toggleDarkMode: () => void,
}

const defaultThemeContext: ThemeContextType = {
    toggleDarkMode: async () => {},
    isDarkMode: false,
}
export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);