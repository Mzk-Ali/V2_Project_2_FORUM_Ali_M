import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuProfile from "./MenuProfile";
import { AuthContext } from "../../contexts/AuthContext";

export default function NavBarDesktop() {
    const [isOpenProfile, setOpenProfile] = useState(false);
    const location = useLocation();
    const {isAuthenticated, user} = useContext(AuthContext);

    const handleOpenProfile = () => {
        setOpenProfile(!isOpenProfile);
    }

    useEffect(()=>{
        setOpenProfile(false);
    },[location])

    return(
        <nav className="hidden sm:flex justify-between items-center px-4 h-full">
            <Link to="/" className="text-lg"><strong>OpenTalk</strong></Link>
            <div className="flex gap-5 font-semibold">
                <Link to="about" className="p-2 hover:underline decoration-blue-700 hover:text-blue-700 decoration-2 hover:underline-offset-4 hover:font-bold hover:-translate-y-1 duration-300">A Propos</Link>
                <Link to="categories" className="p-2 hover:underline decoration-blue-700 hover:text-blue-700 decoration-2 hover:underline-offset-4 hover:font-bold hover:-translate-y-1 duration-300">Catégories</Link>
                <Link to="topics" className="p-2 hover:underline decoration-blue-700 hover:text-blue-700 decoration-2 hover:underline-offset-4 hover:font-bold hover:-translate-y-1 duration-300">Topics</Link>
                {isAuthenticated &&
                    <Link to="myTopics" className="p-2 hover:underline decoration-blue-700 hover:text-blue-700 decoration-2 hover:underline-offset-4 hover:font-bold hover:-translate-y-1 duration-300">Mes Topics</Link>
                }
            </div>
            <div onClick={handleOpenProfile} className="rounded-full cursor-pointer bg-white size-10 flex justify-center items-center">
                {isAuthenticated ?
                    user?.photoProfile !== null ? 
                        <img src={user?.photoProfile} className="w-full h-full" alt="Image de profil de l'utilisateur" />
                    :
                        <FontAwesomeIcon icon={faUser} />
                :
                    <FontAwesomeIcon icon={faUser} />
                }
            </div>
            {isOpenProfile && (<MenuProfile handleOpenProfile={handleOpenProfile} />)}
        </nav>
    )
};
