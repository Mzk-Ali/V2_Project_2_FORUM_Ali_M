import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchToolbar from "../shared/SearchToolbar";
import SelectCategory from "./SelectCategory";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function FilterPanel() {
    return(
        <div className="flex justify-between items-center w-full">
            <SelectCategory />
            <div className="flex items-center gap-4">
                <SearchToolbar />
                <button className="flex justify-center items-center gap-2 font-semibold rounded-md px-2 py-1 shadow-md lg:bg-blue-300 lg:hover:bg-blue-400 lg:dark:bg-blue-800 lg:dark:hover:bg-blue-900">
                    <FontAwesomeIcon icon={faPlus} className="lg:hidden size-5 p-1 text-blue-600" />
                    <span className="hidden lg:block p-1">Ajouter un Topic</span>
                </button>
                <button className="flex justify-center items-center gap-2 font-semibold rounded-md px-2 py-1 shadow-md lg:bg-slate-200 lg:hover:bg-slate-300 lg:dark:bg-slate-900 lg:dark:hover:bg-slate-950">
                    <span className="hidden lg:block p-1">Filtrer</span>
                    <FontAwesomeIcon icon={faFilter} className="size-5 p-1" />
                </button>
            </div>
        </div>
    )
};
