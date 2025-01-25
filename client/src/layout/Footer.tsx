import { faFacebookF, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export default function Footer() {
    const today = new Date();
    return(
        <footer className={`hidden sm:flex z-30 text-lg font-semibold backdrop-blur-sm px-5 py-5 bg-gradient-to-tr from-blue-500 to-blue-200 text-slate-700 inset-x-0 bottom-0 w-full max-h-52 flex-col dark:bg-gradient-to-tr dark:from-blue-700 dark:to-blue-500 dark:text-slate-200`}>
            <div className="flex justify-between items-start p-3 bg-gradient-to-br from-blue-50/50 dark:from-blue-800/50 to-transparent rounded-sm">
                <div className="flex flex-col gap-2">
                    <span>Navigation</span>
                    <ul className="text-sm ml-10">
                        <li className="hover:text-blue-700 dark:hover:text-blue-300"><Link to="/">Home</Link></li>
                        <li className="hover:text-blue-700 dark:hover:text-blue-300"><Link to="about">A propos</Link></li>
                        <li className="hover:text-blue-700 dark:hover:text-blue-300"><Link to="adverts">Catégories</Link></li>
                        <li className="hover:text-blue-700 dark:hover:text-blue-300"><Link to="categories">Topics</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <span>Ressources</span>
                    <ul className="text-sm ml-10">
                        <li className="hover:text-blue-700 dark:hover:text-blue-300"><Link to="faqAndSupport">FAQ & Support</Link></li>
                        <li className="hover:text-blue-700 dark:hover:text-blue-300"><Link to="documents">Politique de Confidentialité</Link></li>
                        <li className="hover:text-blue-700 dark:hover:text-blue-300"><Link to="documents">Politique de Cookies</Link></li>
                        <li className="hover:text-blue-700 dark:hover:text-blue-300"><Link to="documents">Conformité à l'Accessibilité</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                    <span>Suivez Nous</span>
                    <div className="flex items-center gap-3 p-4">
                        <a href="#"><FontAwesomeIcon className="p-4 text-blue-500" icon={faFacebookF} /></a>
                        <a href="#"><FontAwesomeIcon className="p-4 text-red-500 dark:text-red-800" icon={faInstagram} /></a>
                        <a href="#"><FontAwesomeIcon className="p-4" icon={faXTwitter} /></a>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm py-4">
                @ {today.getFullYear()} - <Link to="documents/mentionsLegales" className="hover:text-blue-700 dark:hover:text-blue-300">Mentions légales</Link> - <Link to="documents" className="hover:text-blue-700 dark:hover:text-blue-300">Conditions générales d'utilisation</Link>
            </div>
        </footer>
    )
}