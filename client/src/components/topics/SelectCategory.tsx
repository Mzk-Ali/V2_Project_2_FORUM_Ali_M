import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllCategory } from "../../services/apiCategory";
import { Category } from "../../types/index.d";

export default function SelectCategory() {
    const [isOpenListCategories, setOpenListCategories] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    const handleListCategories = () => {
        setOpenListCategories(!isOpenListCategories);
    }

    const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("category", selectedCategory); // Ajouter ou mettre à jour le paramètre `category`
        
        // Utiliser `navigate` pour changer l'URL sans recharger la page
        navigate({
            search: searchParams.toString(),
        });

        setOpenListCategories(false); // Fermer la liste une fois qu'une catégorie est sélectionnée
    };

    const {data: categories} = useQuery({
        queryKey: ['getCategories'],
        queryFn: fetchAllCategory,
    })

    return(
        <div className="relative">
            {/* <div onClick={handleListCategories} className="flex items-center gap-2 px-4 py-2 font-bold rounded-md hover:bg-slate-100 cursor-pointer dark:hover:bg-slate-800">
                <span>{category ? category : 'Catégories'}</span>
                <FontAwesomeIcon icon={faAngleDown} className={`${isOpenListCategories && 'rotate-180'} duration-500`} />
            </div>
            {isOpenListCategories &&
                <div className="absolute w-44 top-full left-0 p-2 rounded-md bg-white border border-slate-200 dark:bg-slate-700 dark:border-slate-900">
                    {categories?.map((categoryItem: Category) => (
                        <div
                            key={categoryItem.id} // Utilisation d'un `key` unique basé sur l'id de la catégorie
                            onClick={() => handleCategorySelect(categoryItem.name)}
                            className="p-2 hover:bg-blue-100 cursor-pointer dark:hover:bg-slate-600"
                        >
                            <span>{categoryItem.name}</span>
                        </div>
                    ))}
                </div>
            } */}
            <select
                id="category-select"
                value={category || "Catégories"}
                onChange={handleCategorySelect}
                className="block w-full appearance-none px-4 py-2 font-bold rounded-md border-none ring-0 hover:bg-slate-100 outline-blue-400 cursor-pointer focus:border-none dark:hover:bg-slate-800"
            >
                <option value="" className="font-bold ">{category ? category : 'Catégories'}</option>
                {categories?.map((categoryItem: Category) => (
                    <option key={categoryItem.id} value={categoryItem.name}>
                        {categoryItem.name}
                    </option>
                ))}
            </select>
        </div>
    )
};
