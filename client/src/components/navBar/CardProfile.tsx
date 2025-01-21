import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function CardProfile() {
    const {isAuthenticated, user} = useContext(AuthContext);
    return(
        isAuthenticated && (
            <Link to="/myProfile" className="relative flex items-center rounded-md gap-5 p-4 border border-slate-300 shadow dark:bg-slate-600 dark:border-slate-400">
                <img className="size-14 rounded-full" src={user?.photoProfile} alt="" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg">{user?.lastName} {user?.firstName}</span>
                    <span>{user?.email}</span>
                </div>
                <FontAwesomeIcon className="absolute right-4 text-xl" icon={faChevronRight}/>
            </Link>
        )
    )
};
