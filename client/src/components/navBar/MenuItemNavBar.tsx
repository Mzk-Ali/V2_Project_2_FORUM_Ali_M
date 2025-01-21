import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface MenuItemProps{
    icon?: IconProp,
    label: string,
    to: string,
}


export default function MenuItemNavBar({ icon, label, to }:MenuItemProps) {
    return(
        <Link to={to} className="w-full bg-slate-200 hover:bg-slate-300 transition duration-300 shadow-sm rounded-xl py-4 px-7 flex items-center gap-3 text-base font-medium dark:bg-slate-600 dark:hover:bg-slate-500">
            {icon && <FontAwesomeIcon icon={icon} className="text-xl" />}
            <span className="menu-label">{label}</span>
        </Link>
    )
};
