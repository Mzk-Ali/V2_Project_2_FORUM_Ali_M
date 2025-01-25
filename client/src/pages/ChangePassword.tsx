import ChangePasswordForm from "../components/forms/ChangePasswordForm";


export default function ChangePassword() {
    return(
        <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-10">Changer votre mot de passe</h1>
            <p className="text-xs text-gray-700 font-semibold text-center mb-6">
                Pour garantir la sécurité de votre compte, nous vous demandons de choisir un mot de passe respectant les critères suivants :
                <ul className="text-left pl-5 pt-5 list-disc list-inside ">
                    <li>Au moins 12 caractères</li>
                    <li>Contenant au moins une lettre majuscule</li>
                    <li>Contenant au moins une lettre minuscule</li>
                    <li>Contenant au moins un caractère spécial</li>
                </ul>
            </p>
            <ChangePasswordForm/>
        </div>
    )
};
