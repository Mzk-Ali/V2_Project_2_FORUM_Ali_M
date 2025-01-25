import { Helmet } from "react-helmet-async";
import CategoryList from "../components/category/CategoryList";

export default function Categories() {
    return(
        <>
            <Helmet>
                <title>Catégories OpenTalk</title>
                <meta name="description" content="Page de la liste des Catégories d'OpenTalk'" />
                <meta name="keywords" content="OpenTalk" />
            </Helmet>
            <h1 className="ml-10 md:ml-20 my-5 text-2xl bg-gradient-to-r from-blue-800 via-blue-400 to-indigo-400 text-transparent bg-clip-text dark:from-blue-400"><strong className="flex flex-col">
                <span>Choisis ta</span>
                <span className="text-4xl">Catégorie</span>
            </strong></h1>
            <CategoryList />
        </>
    )
};
