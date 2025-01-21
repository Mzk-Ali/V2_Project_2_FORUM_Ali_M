import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderSkeleton() {
    return(
        <header className='fixed z-30 top-0 left-0 bg-gradient-to-b from-blue-500 via-indigo-300 to-blue-100/20 w-full h-14'>
            <nav className="flex justify-between items-center px-4 h-full">
                <span className="text-lg animate-pulse"><strong>OpenTalk</strong></span>
                <FontAwesomeIcon icon={faBars} className="animate-pulse sm:hidden" />
                <div className="hidden sm:flex rounded-full cursor-pointer bg-white size-10 justify-center items-center animate-pulse"></div>
            </nav>
        </header>
    )
};
