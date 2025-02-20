import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SelectCategory() {
    const [isOpenListCategories, setOpenListCategories] = useState(false);

    const handleListCategories = () => {
        setOpenListCategories(!isOpenListCategories);
    }

    return(
        <div className="relative">
            <div onClick={handleListCategories} className="flex items-center gap-2 px-4 py-2 font-bold rounded-md hover:bg-slate-100 cursor-pointer dark:hover:bg-slate-800">
                <span>Catégories</span>
                <FontAwesomeIcon icon={faAngleDown} className={`${isOpenListCategories && 'rotate-180'} duration-500`} />
            </div>
            {isOpenListCategories &&
                <div className="absolute top-full left-0 p-2 rounded-md bg-white border border-slate-200 dark:bg-slate-700 dark:border-slate-900">
                    test
                </div>
            }
        </div>
    )
};
