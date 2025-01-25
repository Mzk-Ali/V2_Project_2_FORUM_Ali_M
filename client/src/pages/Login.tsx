import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { Helmet } from "react-helmet-async";
import ForgotPassword from "../components/ForgotPassword";

export default function Login() {
    const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);
    return(
        <div className="w-11/12 max-w-[700px] mx-auto">
            <Helmet>
                <title>Connexion Forum V2</title>
                <meta name="description" content="Page de connexion du Forum V2" />
                <meta name="keywords" content="forum, connexion, login" />
            </Helmet>
            <h1 className="text-4xl text-center py-10 font-bold bg-gradient-to-r from-blue-800 via-blue-400 to-indigo-400 text-transparent bg-clip-text"><strong>Connexion au Forum</strong></h1>
            <LoginForm openForgotPassword={()=>{setForgotPasswordVisible(true);}} />
            {isForgotPasswordVisible && (
                <ForgotPassword setForgotPasswordVisible={setForgotPasswordVisible} />
            )}
        </div>
    )
};
