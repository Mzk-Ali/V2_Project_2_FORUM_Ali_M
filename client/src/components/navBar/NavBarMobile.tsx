import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MenuNavBar from "./MenuNavBar";
import { Link, useLocation } from "react-router-dom";
import ButtonDarkMode from "../shared/ButtonDarkMode";

export default function NavBarMobile() {
    const [isOpenMenuMobile, setOpenMenuMobile] = useState(false);
    const location = useLocation();

    const handleOpenMenu = () => {
        setOpenMenuMobile(!isOpenMenuMobile);
    }

    useEffect(()=>{
        setOpenMenuMobile(false);
    },[location])

    return(
        <nav className="flex sm:hidden justify-between items-center px-4 h-full">
            <Link to="/" className="text-lg"><strong>OpenTalk</strong></Link>
            <div className="text-xl space-x-3">
                <ButtonDarkMode />
                {isOpenMenuMobile ? 
                    <FontAwesomeIcon icon={faClose} onClick={handleOpenMenu} className={`p-2 cursor-pointer rounded-lg text-red-700 hover:bg-blue-300 dark:hover:bg-blue-800 duration-300 ${isOpenMenuMobile ? "rotate-90" : ""}`} />
                :
                    <FontAwesomeIcon icon={faBars} onClick={handleOpenMenu} className={`p-2 cursor-pointer rounded-lg hover:bg-blue-400 dark:hover:bg-blue-800 duration-300 ${isOpenMenuMobile ? "rotate-90" : ""}`} />
                }
            </div>
            {isOpenMenuMobile && 
                <MenuNavBar />
            }
        </nav>
    )
};
