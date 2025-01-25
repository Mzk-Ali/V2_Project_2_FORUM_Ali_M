import { Link } from "react-router-dom";
import { Category } from "../../types/index.d";

interface CategoryItemProps{
    category: Category,
}

export default function CategoryItem({category}: CategoryItemProps) {
    return(
        <Link to={`${category.slug}`} className="flex justify-center items-end w-40 h-24 md:w-60 md:h-32 p-3 cursor-pointer hover:-translate-y-1 duration-300 rounded-xl border-2 border-blue-400 bg-gradient-to-tr from-indigo-200 via-blue-300 to-indigo-400 drop-shadow-xl dark:from-slate-700 dark:via-blue-800 dark:hover:bg-indigo-900 dark:border-blue-900">
            <span className="text-2xl">{category.name}</span>
        </Link>
    )
};
