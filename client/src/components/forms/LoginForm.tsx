import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from "../shared/Button";
import Input from '../shared/Input';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { fetchLogin } from '../../services/apiAuthentication';
import { LoginFormData } from '../../types/authentication.d';
import { useToast } from '../../hooks/useToast';

// Définir le schéma de validation avec Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('L\'email doit être valide')  // Email doit être valide
        .required('L\'email est requis'),    // Email est obligatoire

    password: Yup.string()
        .min(12, 'Le mot de passe doit comporter au moins 12 caractères')  // Mot de passe doit avoir au moins 8 caractères
        .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')  // Doit contenir au moins une majuscule
        .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')  // Doit contenir au moins un chiffre
        .matches(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial') // Vérifie un caractère spécial
        .required('Le mot de passe est requis'),  // Mot de passe est obligatoire

    rememberMe: Yup.boolean().default(false),  // "Se souvenir de moi" est un booléen
});

type LoginFormProps = {
    openForgotPassword: () => void;
};

export default function LoginForm({openForgotPassword}:LoginFormProps) {
    const { register: formLogin, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>({
        resolver: yupResolver(validationSchema),
    });
    const [error, setError] = useState('');
    const {showToast} = useToast();
    const navigate = useNavigate();

    const mutation = useMutation(fetchLogin, {
        onSuccess: () => {
            reset();
            navigate('/');
            showToast("Authentification réussie.", 'success');
        },
        onError: (error) => {
            showToast("Authentification échouée.", 'error');
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erreur lors de la connexion');
            }
            console.error('Erreur lors de l\'authentification:', error);
        },
    });

    const handleLogin = async (data: LoginFormData) => {
        mutation.mutate(data)
    }

    return(
        <form onSubmit={handleSubmit(handleLogin)}>
            {error && <div className="text-red-500 text-centers text-sm mb-4">{error}</div>}
            <div className='flex flex-col'>
                <div className="mb-4">
                    <Input variant="primary" label="Email" type="email" id="email" {...formLogin('email')}></Input>
                    {/* Affichage des erreurs pour l'email */}
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <Input variant="primary" label="Mot de passe" type="password" id="password" {...formLogin('password')}></Input>
                    {/* Affichage des erreurs pour le mot de passe */}
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
            </div>

            <div className='flex justify-between items-center mt-2 mb-10'>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        {...formLogin('rememberMe')}
                        className="h-4 w-4 border shadow-sm text-blue-600 accent-blue-300 focus:ring-blue-500 border-gray-300 rounded-md"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm">Se souvenir de moi</label>
                </div>
                <button onClick={openForgotPassword} type='button' className='text-blue-600 underline underline-offset-2 text-xs font-medium hover:-translate-y-1 duration-300 dark:text-blue-400 dark:hover:text-blue-700'>Mot de passe oublié ?</button>
            </div>

            <div>
                <Button variant='submit' type='submit'>Se connecter</Button>
            </div>
      </form>
    )
};
