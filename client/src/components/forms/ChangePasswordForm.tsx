import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useToast } from '../../hooks/useToast';
import { ChangePasswordFormData } from '../../types/authentication.d';
import { fetchChangePassword } from '../../services/apiAuthentication';

// Définir le schéma de validation avec Yup
const validationSchema = Yup.object({
    password: Yup.string()
        .min(12, 'Le mot de passe doit comporter au moins 12 caractères')  // Mot de passe doit avoir au moins 12 caractères
        .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')  // Doit contenir au moins une majuscule
        .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')  // Doit contenir au moins un chiffre
        .matches(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial') // Vérifie un caractère spécial
        .required('Le mot de passe est requis'),  // Mot de passe est obligatoire

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Les mots de passe doivent correspondre') // Confirmer que le mot de passe et la confirmation sont identiques
        .required('La confirmation du mot de passe est requise'),  // Confirmer le mot de passe est obligatoire
});

const useQuery = () => new URLSearchParams(useLocation().search);

export default function ChangePasswordForm() {
    const [error, setError] = useState('');
    const {showToast} = useToast();
    const { register: formChangePassword, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordFormData>({
        resolver: yupResolver(validationSchema),  // Utilisation de Yup pour la validation
    });
    const query = useQuery();
    const token = query.get('token');
    const navigate = useNavigate();

    const mutation = useMutation(fetchChangePassword, {
        onSuccess: () => {
            reset();
            navigate('/login');
            showToast("Réinitialisation de mot de passe réussie.", 'success');
        },
        onError: (error) => {
            showToast("Réinitialisation de mot de passe échouée.", 'error');
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erreur lors de la réinitialisation de mot de passe');
            }
            console.error('Erreur lors de la réinitialisation de mot de passe:', error);
        },
    })

    const handleChangePassword = async (data: ChangePasswordFormData) => {
        if (!token) {
            setError("Token de réinitialisation manquant.");
            return;
        }
        mutation.mutate({...data, token})
    }

    return (
        <form onSubmit={handleSubmit(handleChangePassword)}>
            {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
            <div className="mb-4">
                <Input variant="primary" label="Mot de passe" type="password" id="password" {...formChangePassword('password')}></Input>
                {/* Affichage des erreurs pour le mot de passe */}
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
                <Input variant="primary" label="Confirmer le mot de passe" type="password" id="confirmPassword" {...formChangePassword('confirmPassword')}></Input>
                {/* Affichage des erreurs pour la confirmation de mot de passe */}
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <Button variant='submit' type='submit' className='flex justify-center items-center gap-10' disabled={mutation.isLoading}>{mutation.isLoading && <div className='size-5 rounded-full border-t-2 border-r-2  border-white animate-spin'></div>}Valider</Button>
        </form>
    )

    
};
