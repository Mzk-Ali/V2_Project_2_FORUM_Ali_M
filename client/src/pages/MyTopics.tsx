import Pagination from "../components/shared/Pagination";
import MyTopicsList from "../components/topics/MyTopicsList";

export default function MyTopics() {
    return(
        <>
            <Pagination itemsLength={34} itemsPerPage={10} />
            <MyTopicsList />
            <Pagination itemsLength={34} itemsPerPage={10} />
        </>
    )
};
