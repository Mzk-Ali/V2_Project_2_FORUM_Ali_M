import { faComments, faLock, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Topic } from "./TopicsList";
import { formatSmartDate } from "../../utils/formatDate.utils";

interface TopicCardProps {
    topic: Topic,
}

export default function TopicCard({topic} : TopicCardProps) {
    return(
        <Link to={`/categories/${topic.category.slug}/topic/${topic.slug}`}>
            <div className="flex flex-col lg:hidden gap-5 p-4 bg-white rounded-md shadow-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src={topic.author.photoProfile} alt={"Photo de profil de l'autheur du Topic : " + topic.author.firstName} className="size-8 bg-slate-500 rounded-full shadow-md" />
                        <span>Par : <strong>{topic.author.lastName + " " + topic.author.firstName}</strong></span>
                    </div>
                    <FontAwesomeIcon icon={faLock} className="text-red-600 text-xl" />
                </div>
                <div className=" flex flex-col">
                    <span className="font-semibold line-clamp-2">{topic.title}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 italic">
                        <FontAwesomeIcon icon={faMessage} className="text-blue-300 text-xl" />
                        {topic.nbrPosts}
                    </div>
                    <div className="italic">{formatSmartDate(topic.createdAt)}</div>
                </div>
            </div>

            <div className="hidden lg:flex justify-between items-center p-4 gap-5 bg-white rounded-md shadow-md">
                <FontAwesomeIcon icon={faComments} className="bg-blue-300 text-white rounded-md p-2 text-xl" />
                <div className="flex flex-col gap-2">
                    <span className="font-semibold line-clamp-2 text-blue-600">{topic.slug}</span>
                    <p className="line-clamp-2 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod voluptatum corrupti beatae facere natus libero magni dolores officiis similique ipsum. Magni eum doloribus a voluptatibus ducimus doloremque rem maiores optio itaque sapiente asperiores tenetur impedit, exercitationem sequi tempore placeat assumenda dolorem nihil porro autem est, beatae deleniti eaque! Nemo, sed.</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-slate-400">Posts</span>
                    <span className="font-semibold">{topic.nbrPosts}</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src={topic.author.photoProfile} alt={"Photo de profil de l'autheur du Topic : " + topic.author.firstName} className="size-8 bg-slate-500 rounded-full shadow-md" />
                    <div className="flex flex-col items-center w-36">
                        <span className="flex items-center gap-2">Par :<strong>{topic.author.lastName + " " + topic.author.firstName}</strong></span>
                        <div className="italic">{formatSmartDate(topic.createdAt)}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
};
