import RegisterForm from "../components/forms/RegisterForm";
import { Helmet } from "react-helmet-async";

export default function Register() {
    return(
        <div className="w-11/12 max-w-[700px] mx-auto">
            <Helmet>
                <title>Inscription Forum V2</title>
                <meta name="description" content="Page d'Inscription du Forum V2" />
                <meta name="keywords" content="forum, inscription, register" />
            </Helmet>
            <h1 className="text-4xl text-center py-10 font-bold bg-gradient-to-r from-blue-800 via-blue-400 to-indigo-400 text-transparent bg-clip-text"><strong>Rejoindre le Forum</strong></h1>
            <RegisterForm />
        </div>
    )
};
