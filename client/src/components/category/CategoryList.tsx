import { useQuery } from "react-query";
import { fetchAllCategory } from "../../services/apiCategory";
import { useToast } from "../../hooks/useToast";
import CategorySkeleton from "../skeletons/CategorySkeleton";
import CategoryItem from "./CategoryItem";
import { Category } from "../../types/index.d";

export default function CategoryList() {
    const {showToast} = useToast();
    const { data, isLoading } = useQuery(
        'categories',  // clé unique pour la requête
        fetchAllCategory,
        {
            onError: (error) => {
                showToast('Erreur lors de la récupération des catégories', "error");
                console.error('Erreur lors de la récupération des catégories', error);
            },
            refetchOnWindowFocus: false, // Eviter de refetch quand la fenêtre reprend le focus
            retry: false,  // ne pas essayer de refetch en cas d'échec
            enabled: true, // la requête est activée dès le début
        }
    );

    if(isLoading){
        return <CategorySkeleton />
    }

    return(
        data && data.length > 0 ?
            <section className="flex justify-center flex-wrap p-5 gap-x-8 gap-y-8">
                {data.map((category : Category) => (
                    <CategoryItem key={category.id} category={category} />
                ))}
                </section>
        :
            <p className='pt-20 text-xl text-center font-semibold'>
                Aucune Catégorie trouvée
            </p>
        
    )
};
