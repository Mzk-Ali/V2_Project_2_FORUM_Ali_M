import { body } from 'express-validator';
import xss from 'xss';

export const registerValidator = [
    body('data.email')
        .isEmail()
        .withMessage("L'email doit être valide.")
        .isLength({ min: 2, max: 100})
        .withMessage("L'email doit comporter entre 2 et 100 caractères.")
        .customSanitizer(value => xss(value)),

    body('data.password')
        .isLength({ min: 12 })
        .withMessage('Le mot de passe doit comporter au moins 12 caractères.')
        .matches(/[A-Z]/)
        .withMessage('Le mot de passe doit contenir au moins une lettre majuscule.')
        .matches(/[0-9]/)
        .withMessage('Le mot de passe doit contenir au moins un chiffre.')
        .matches(/[^A-Za-z0-9]/)
        .withMessage('Le mot de passe doit contenir au moins un caractère spécial.')
        .customSanitizer(value => xss(value)),
    
    body('data.confirmPassword')
    .custom((value, { req }) => {
        // Vérification de la correspondance entre confirmPassword et password
        if (value !== req.body.data.password) {
            throw new Error('Les mots de passe doivent correspondre.');
        }
        return true;
    })
    .customSanitizer(value => xss(value)),

    body('data.lastName')
        .isLength({ min: 2, max: 50 })
        .withMessage('Le nom de famille doit comporter entre 2 et 50 caractères.')
        .matches(/^[A-Za-zÀ-ÿ\s-]+$/)
        .withMessage('Le nom de famille ne peut contenir que des lettres, des espaces et des tirets.')
        .customSanitizer(value => xss(value)),

    body('data.firstName')
        .isLength({ min: 2, max: 50 })
        .withMessage('Le prénom doit comporter entre 2 et 50 caractères.')
        .matches(/^[A-Za-zÀ-ÿ\s-]+$/)
        .withMessage('Le prénom ne peut contenir que des lettres, des espaces et des tirets.')
        .customSanitizer(value => xss(value)),

    body('data.agreeTerms')
        .isBoolean()
        .withMessage('Vous devez accepter les termes et conditions.')
        .custom(value => value === true)
        .withMessage('Vous devez accepter les termes et conditions pour continuer.'),
]

// Validation pour la connexion d'un utilisateur
export const loginValidator = [
    body('data.email')
        .isEmail().withMessage('L\'email est invalide.')
        .normalizeEmail(),
    body('data.password')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.')
];