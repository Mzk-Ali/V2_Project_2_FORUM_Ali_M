import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const About = lazy(() => import("../pages/About"));
const Categories = lazy(() => import("../pages/Categories"));
const Topics = lazy(() => import("../pages/Topics"));
const TopicsByCategory = lazy(() => import("../pages/TopicsByCategory"));
const PostsByTopic = lazy(() => import("../pages/PostsByTopic"));

export default function Main() {
    return(
        <main className="pt-14 pb-20">
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    
                    {/* Page des catégories */}
                    <Route path="/categories" element={<Categories />} />

                    {/* Page des topics d'une catégorie spécifique */}
                    <Route path="/categories/:categorySlug" element={<TopicsByCategory />} />

                    {/* Page des posts d'un topic dans une catégorie */}
                    <Route path="/categories/:categorySlug/topics/:topicSlug" element={<PostsByTopic />} />


                    {/* Page contenant la liste des topics independamment des catégories */}
                    <Route path="/topics" element={<Topics />} />
                </Routes>
            </Suspense>
        </main>
    )
};
