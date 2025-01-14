import RegisterForm from "../components/forms/RegisterForm";

export default function Register() {
    return(
        <div className="w-11/12 max-w-[700px] mx-auto">
            <h1 className="text-4xl text-center my-10 font-bold bg-gradient-to-r from-blue-800 via-blue-400 to-indigo-400 text-transparent bg-clip-text"><strong>Rejoindre le Forum</strong></h1>
            <RegisterForm />
        </div>
    )
};
