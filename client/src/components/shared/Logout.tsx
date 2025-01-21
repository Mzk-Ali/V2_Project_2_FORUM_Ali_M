import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLogout } from "../../utils/auth.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Logout() {
    const {isAuthenticated} = useContext(AuthContext);
    const {logoutUser, isLoading} = useLogout();
    return(
        isAuthenticated ?
            <button 
                onClick={logoutUser} 
                disabled={isLoading} 
                className={`rounded-xl my-5 bg-red-200 hover:bg-red-300 transition duration-300 w-full py-4 px-8 text-red-700 flex gap-3 items-center ${isLoading ? "bg-red-400" : "bg-red-200"} ${isLoading ? "cursor-wait" : ""}`}
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full border-t-4 border-r-4 border-white h-5 w-5 mr-3"></div>
                        <span className="opacity-80 text-slate-50">Déconnexion...</span>
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon className="rotate-180" icon={faArrowRightFromBracket} />
                        Déconnexion
                    </>
                )}
            </button>
        : <></>
    )
};
