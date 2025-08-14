import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchToolbar() {
    return(
        <>
            <div className="relative hidden lg:block rounded-md">
                <input type="text" className="w-[500px] p-2 pr-10 border-2 border-blue-300 rounded-md focus:outline-blue-700" placeholder="Rechercher ..." />
                <FontAwesomeIcon icon={faSearch} onClick={()=>{}} className="absolute right-0 m-2 size-5 text-blue-500" />
            </div>
            <button className="flex justify-center items-center gap-2 font-semibold rounded-md px-2 py-1 shadow-md lg:hidden">
                <FontAwesomeIcon icon={faSearch} className="size-5 p-1" />
            </button>
        </>
    )
};
