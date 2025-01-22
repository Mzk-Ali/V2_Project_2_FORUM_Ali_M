import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({children}: ThemeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            window.document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        }
      }, []);
    
    const toggleDarkMode = () => {
        if (isDarkMode) {
            window.document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
            window.document.documentElement.classList.add("dark");
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
};
