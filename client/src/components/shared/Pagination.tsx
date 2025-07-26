import { faAngleLeft, faAngleRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";

interface PaginationProps {
    itemsLength: number,
    itemsPerPage: number,
}

export default function Pagination({itemsLength, itemsPerPage}: PaginationProps) {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Récupérer la page actuelle depuis l'URL
    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = queryParams.get('page');
    const currentPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;

    const totalPages = Math.ceil(itemsLength / itemsPerPage);

    const handlePageChange = (page: number) => {
        // navigate(`?page=${page}`);
        queryParams.set("page", page.toString());
        navigate({
            search: queryParams.toString(),
        });
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return(
        <div className="flex justify-between items-center font-semibold p-2">
            <div onClick={() => handlePageChange(currentPage - 1)} className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-100 cursor-pointer dark:hover:bg-slate-800">
                <FontAwesomeIcon icon={faAngleLeft} />
                <span>Précédent</span>
            </div>
            <div className="space-x-2">
                {currentPage > 1 &&
                    <button
                        key={currentPage - 1} 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="rounded-md px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                    >
                        {currentPage - 1}
                    </button>
                }
                <button
                    key={currentPage} 
                    className="rounded-md px-4 py-2 border border-slate-200 shadow-sm dark:border-slate-800"
                    disabled={true}
                >
                    {currentPage}
                </button>
                {currentPage < totalPages && 
                    <button
                        key={currentPage + 1}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="rounded-md px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                    >
                        {currentPage + 1}
                    </button>
                }
                {currentPage < totalPages - 1 && 
                    <FontAwesomeIcon icon={faEllipsis} />
                }
            </div>
            <div onClick={() => handlePageChange(currentPage + 1)} className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-100 cursor-pointer dark:hover:bg-slate-800">
                <span>Suivant</span>
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </div>
    )
};
