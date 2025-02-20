import Pagination from "../shared/Pagination";
import TopicsList from "./TopicsList";

export default function MainSection() {
    return(
        <div className="flex flex-col w-[800px] rounded-md lg:border-2 border-blue-50 dark:border-blue-900">
            <Pagination itemsLength={34} itemsPerPage={10} />
            <TopicsList />
            <Pagination itemsLength={34} itemsPerPage={10} />
        </div>
    )
};
