import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Topic } from "./TopicsList";
import TopicCard from "./TopicCard";
import { fetchGetMyTopics } from "../../services/apiTopics";


export default function MyTopicsList() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    
    const page = queryParams.get('page');

    const filterParams = `?page=${page || 1}`;

    const {data: topics, isLoading, isError, refetch} = useQuery({
        queryKey: ['getMyTopics', filterParams],
        queryFn: () => fetchGetMyTopics(filterParams),
    })

    if(isLoading){
        return(
            <div className="flex justify-center items-center bg-blue-50 p-10">
                <div className="size-5 rounded-full border-2 border-y-blue-400 border-l-blue-400 animate-spin"></div>
            </div>
        )
    }

    if(isError){
        return(
            <div className="flex flex-col justify-center items-center gap-5 bg-blue-50 p-10 text-red-600">
                <div className="italic">Echec de la récupération de données</div>
                <button onClick={() => refetch()} className="rounded-md bg-red-200 shadow-md px-4 py-2 hover:bg-red-300 cursor-pointer transition duration-300">Réessayer</button>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-5 bg-blue-50 p-4">
            {topics?.map((topic: Topic) => {
                return <TopicCard key={topic.id} topic={topic}/>
            })}
        </div>
    )
};
