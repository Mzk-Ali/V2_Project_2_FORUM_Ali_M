import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Link } from 'react-router-dom';
import { RegisterFormData } from '../../types/authentication.d';
import { useMutation } from 'react-query';
import { fetchRegister } from '../../services/apiAuthentication';


// Définir le schéma de validation avec Yup
const validationSchema = Yup.object({
    lastName: Yup.string()
        .required("Le nom de famille est requis")
        .min(2, "Le nom de famille doit comporter au moins 2 caractères")
        .max(50, "Le nom de famille ne peut pas dépasser 50 caractères")
        .matches(/^[A-Za-zÀ-ÿ\s-]+$/, "Le nom de famille ne peut contenir que des lettres, des espaces et des tirets"),
    firstName: Yup.string()
        .required("Le prénom est requis")
        .min(2, "Le prénom doit comporter au moins 2 caractères")
        .max(50, "Le prénom ne peut pas dépasser 50 caractères")
        .matches(/^[A-Za-zÀ-ÿ\s-]+$/, "Le prénom ne peut contenir que des lettres, des espaces et des tirets"),
  
    email: Yup.string()
        .email('L\'email doit être valide')
        .required('L\'email est requis')
        .min(2, "L'email' doit comporter au moins 2 caractères")
        .max(100, "L'email' ne peut pas dépasser 100 caractères"),
  
    password: Yup.string()
        .min(12, 'Le mot de passe doit comporter au moins 12 caractères')  // Mot de passe doit avoir au moins 12 caractères
        .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')  // Doit contenir au moins une majuscule
        .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')  // Doit contenir au moins un chiffre
        .matches(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial') // Vérifie un caractère spécial
        .required('Le mot de passe est requis'),  // Mot de passe est obligatoire
  
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Les mots de passe doivent correspondre') // Confirmer que le mot de passe et la confirmation sont identiques
        .required('La confirmation du mot de passe est requise'),  // Confirmer le mot de passe est obligatoire

    agreeTerms: Yup.boolean()
        .required('Vous devez accepter les termes et conditions')
        .oneOf([true],"Vous devez accepter les termes et conditions")
});

export default function RegisterForm() {
    const { register: formRegister, handleSubmit, formState: { errors }, reset, watch } = useForm<RegisterFormData>({
        resolver: yupResolver(validationSchema),  // Utilisation de Yup pour la validation
    });
    const [error, setError] = useState('');
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const mutation = useMutation(fetchRegister, {
        onSuccess: () => {
            reset();
            navigate('/login');
        },
        onError: (error) => {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erreur lors de l\'inscription');
            }
        }
    })

    const handleRegister = async (data:RegisterFormData) =>{
        mutation.mutate(data)
    }

    const handleNextStep = () => {
        if (step === 0) {
          // Vérifier si les champs prénom et nom sont valides
          const firstName = watch('firstName');
          const lastName = watch('lastName');
    
          if (firstName && lastName && !errors.firstName && !errors.lastName) {
            setStep(1);
          } else {
            setError('Veuillez compléter tous les champs requis pour continuer');
          }
        }
    };

    return(
        <form onSubmit={handleSubmit(handleRegister)}>
            {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
            {step === 0 &&
            <>
                <div className="mb-4">
                    <Input variant='primary' label='Nom de famille' type='text' id='lastName' {...formRegister('lastName')}></Input>
                    {/* Affichage des erreurs pour le nom de famille */}
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>

                <div className="mb-10">
                    <Input variant='primary' label='Prénom' type='text' id='firstName' {...formRegister('firstName')}></Input>
                    {/* Affichage des erreurs pour le prénom */}
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <Button variant='submit' onClick={handleNextStep}>Suivant</Button>
            </>
            }
            {step === 1 &&
            <>
                <div className="mb-4">
                    <Input variant="primary" label="Email" type="email" id="email" {...formRegister('email')}></Input>
                    {/* Affichage des erreurs pour l'email */}
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <Input variant="primary" label="Mot de passe" type="password" id="password" {...formRegister('password')}></Input>
                    {/* Affichage des erreurs pour le mot de passe */}
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="mb-4">
                    <Input variant="primary" label="Confirmer le mot de passe" type="password" id="confirmPassword" {...formRegister('confirmPassword')}></Input>
                    {/* Affichage des erreurs pour la confirmation du mot de passe */}
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>

                <div className='flex items-center mt-8'>
                    <input
                        type="checkbox"
                        id="agreeTerms"
                        className='h-4 w-4 border shadow-sm text-blue-600 accent-blue-300 focus:ring-blue-500 border-gray-300 rounded-md'
                        {...formRegister('agreeTerms')}
                    />
                    <label htmlFor='agreeTerms' className="ml-2 text-sm">
                        J'accepte les termes et conditions
                    </label>
                </div>
                {errors.agreeTerms && <p className="text-red-500 text-sm mt-3">{errors.agreeTerms.message}</p>}
                <p className='italic text-sm mt-5 max-w-[500px]'>En acceptant les termes et conditions, vous reconnaissez avoir lu et accepté <Link to="/documents/politiqueDeConfidentialite" className='underline font-semibold'>l'Avis de confidentialité</Link> ainsi que les <Link to="/documents/conditionsUtilisations" className='underline font-semibold'>Conditions d'utilisation</Link> de ProSer. Vous autorisez ProSer à vous contacter pour la gestion de votre compte aux coordonnées fournies.</p>

                <div className='flex gap-8 mt-10'>
                    <Button variant='cancelled' type='button' onClick={()=>{setStep(0)}}>Retour</Button>
                    <Button variant='submit' type='submit'>S'inscrire</Button>
                </div>
            </>
            }
        </form>
    )
};
