import React , { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from "./shared/Button";
import Input from "./shared/Input";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";
import { useToast } from "../hooks/useToast";
import { fetchResetPassword } from "../services/apiAuthentication";
import { ForgotPasswordFormData } from "../types/authentication.d";

interface ForgotPasswordProps {
    setForgotPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Définir le schéma de validation avec Yup
const validationSchema = Yup.object({
    emailForForgetPassword: Yup.string()
        .email('L\'email doit être valide')  // Email doit être valide
        .required('L\'email est requis'),    // Email est obligatoire

});

export default function ForgotPassword({setForgotPasswordVisible} : ForgotPasswordProps ) {
    const [isVisible, setIsVisible] = useState(false);
    const {showToast} = useToast();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(validationSchema),  // Utilisation de Yup pour la validation
    });

    const mutation = useMutation(fetchResetPassword, {
        onSuccess: () => {
            reset();
            handleModalClose();
            showToast("Envoi de l'email pour le reset password réussie.", 'success');
        },
        onError: (error) => {
            showToast("Envoi de l'email pour le reset password échouée.", 'error');
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Erreur lors de l'Envoi de l'email pour le reset password");
            }
        },
    })

    const handleResetPassword = async (data: ForgotPasswordFormData) => {
        mutation.mutate(data)
    }

    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
    }, []);

    const handleModalClose = () => {
        setIsVisible(false);
        setTimeout(() => setForgotPasswordVisible(false), 300); // Attendre la durée de l'animation
    };

    return createPortal(
        <div className={`fixed top-0 left-0 p-5 bg-slate-200/50 backdrop-blur-lg min-h-screen w-screen flex justify-center items-center transition-opacity duration-300 dark:bg-slate-700 dark:bg-opacity-50 ${
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
            <div className={`border-[1px] bg-white border-slate-200 rounded-lg p-6 transform transition-all duration-300 ease-out dark:bg-slate-700 dark:border-slate-500 ${
                    isVisible ? 'translate-y-0' : 'translate-y-full'
            }`}>
                <div className="flex justify-between items-center font-semibold text-xl">
                    <div></div>
                    <h1 className="text-center text-lg"><strong>Mot de passe oublié</strong></h1>
                    <FontAwesomeIcon icon={faClose} onClick={handleModalClose} className="p-3 rounded-md cursor-pointer text-red-500 hover:bg-slate-100 hover:dark:bg-slate-600" />
                </div>
                <p className="text-center text-sm mt-4 px-2 mb-4">Saisissez votre adresse Email pour réinitialiser votre Mot de passe. <br /> <i className="text-red-400 text-xs font-semibold">Un email vous sera envoyé.</i></p>
                {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                <form onSubmit={handleSubmit(handleResetPassword)}>
                    <div className="mt-2 mb-10">
                        <Input variant="primary" label="Email" type="email" id="emailForForgetPassword" {...register('emailForForgetPassword')}></Input>
                        {/* Affichage des erreurs pour l'email */}
                        {errors.emailForForgetPassword && <p className="text-red-500 text-sm">{errors.emailForForgetPassword.message}</p>}
                    </div>
                    <div className="flex gap-5">
                        <Button variant="cancelled" type="button" onClick={handleModalClose}>Annuler</Button>
                        <Button variant="submit" type="submit" >Valider</Button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};
