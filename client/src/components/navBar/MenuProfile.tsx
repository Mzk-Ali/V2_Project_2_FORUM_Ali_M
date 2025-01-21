import { faCircleQuestion, faClipboardList, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Logout from "../shared/Logout";
import CardProfile from "./CardProfile";
import { Link } from "react-router-dom";
import MenuItemNavBar from "./MenuItemNavBar";

interface MenuProfileProps{
    handleOpenProfile: ()=> void,
}

export default function MenuProfile({handleOpenProfile}:MenuProfileProps) {
    const {isAuthenticated} = useContext(AuthContext);
    return(
        <div className="absolute top-14 right-0 bg-white w-96 border-2 rounded-lg">
            <div className="flex justify-center items-center p-4 border-b-2 text-xl">
                <span className="font-semibold text-blue-500">Menu</span>
                <FontAwesomeIcon icon={faClose} onClick={handleOpenProfile} className="absolute right-2 p-3 text-red-400 rounded-lg cursor-pointer hover:bg-slate-100" />
            </div>
            <div className="p-3 overflow-y-auto max-h-4/6 space-y-4">
                <CardProfile />
                {!isAuthenticated && (
                    <section className="flex flex-col bg-slate-100 p-3 rounded-xl gap-2 items-center dark:bg-slate-600">
                        <span className="text-base p-3">Vous n'êtes pas authentifié</span>
                        <div className="flex gap-5">
                            <Link to='login' className="px-4 py-2 bg-slate-50 hover:bg-blue-300 rounded-lg shadow dark:bg-slate-700 dark:hover:bg-blue-800">Se Connecter</Link>
                            <Link to='register' className="px-4 py-2 bg-slate-50 hover:bg-blue-300 rounded-lg shadow dark:bg-slate-700 dark:hover:bg-blue-800">S'inscrire</Link>
                        </div>
                    </section>
                )}
                <section>
                    <h2 className="text-blue-600 dark:text-blue-400 font-semibold">Paramètres</h2>
                    <div className="flex flex-col gap-4 my-2">
                        <MenuItemNavBar icon={faClipboardList} label="Mentions légales & CGU" to="/document" />
                        <MenuItemNavBar icon={faCircleQuestion} label="FAQ & Support" to="/support" />
                    </div>
                </section>
                <Logout />
            </div>
        </div>
    )
};
