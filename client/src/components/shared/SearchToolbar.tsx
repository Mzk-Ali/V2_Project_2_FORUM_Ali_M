import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchToolbar() {
    return(
        <div className="flex items-center rounded-md border border-blue-400 overflow-hidden p-2 gap-2">
            <input type="text" className="hidden lg:block" placeholder="Rechercher ..." />
            <button type="button">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    )
};
