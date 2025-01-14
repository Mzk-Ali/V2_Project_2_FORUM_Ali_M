import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));

export default function Main() {
    return(
        <main className="mt-14 mb-10">
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Suspense>
        </main>
    )
};
