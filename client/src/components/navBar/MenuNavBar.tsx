import { faCircleInfo, faCircleQuestion, faClipboardList, faLayerGroup, faList, faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import Logout from "../shared/Logout";
import MenuItemNavBar from "./MenuItemNavBar";
import CardProfile from "./CardProfile";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function MenuNavBar() {
    const {isAuthenticated} = useContext(AuthContext);
    const date = new Date;
    return(
        <div className="absolute top-14 right-0 space-y-6 p-3 bg-gradient-to-r from-blue-50 via-white to-blue-50 drop-shadow-xl border-l border-b w-full max-w-96 overflow-y-auto" style={{ height: 'calc(100vh - 56px)' }}>
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
                <h2 className="text-blue-600 dark:text-blue-400 font-semibold">Navigation</h2>
                <div className="flex flex-col gap-4 my-2">
                    <MenuItemNavBar icon={faCircleInfo} label="A propos" to="/about" />
                    <MenuItemNavBar icon={faNetworkWired} label="Catégories" to="/categories" />
                    <MenuItemNavBar icon={faLayerGroup} label="Topics" to="/topics" />
                    {isAuthenticated && 
                        <MenuItemNavBar icon={faList} label="Mes Topics" to="/myTopics" />
                    }
                </div>
            </section>
            <section>
                <h2 className="text-blue-600 dark:text-blue-400 font-semibold">Paramètres</h2>
                <div className="flex flex-col gap-4 my-2">
                    <MenuItemNavBar icon={faClipboardList} label="Mentions légales & CGU" to="/document" />
                    <MenuItemNavBar icon={faCircleQuestion} label="FAQ & Support" to="/support" />
                </div>
            </section>
            <Logout />

            <div className="text-center font-semibold">@ {date.getFullYear()}</div>
        </div>
    )
};
