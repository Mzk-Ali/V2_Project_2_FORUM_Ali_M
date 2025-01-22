import { useContext } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ButtonDarkMode() {
    const {isDarkMode, toggleDarkMode} = useContext(ThemeContext);

    return(
        <button onClick={toggleDarkMode} className="rounded-lg cursor-pointer size-10 hover:bg-blue-300 dark:hover:bg-blue-800 transition-colors duration-300" >
            <FontAwesomeIcon 
                icon={isDarkMode ? faSun : faMoon} 
                className={`p-2 ${isDarkMode ? "text-yellow-500" : "text-slate-500"}`}
            />
        </button>
    )
};
