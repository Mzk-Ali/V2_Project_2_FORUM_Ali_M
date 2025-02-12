import express from "express";
import { getAuthenticatedUser, login, logout, register, requestPasswordReset, resetPasswordHandler, verifyEmail } from "../controllers/auth.controller";
import { loginValidator, registerValidator, resetPasswordValidator } from "../validators/auth.validator";
import { handleValidationErrors } from "../middlewares/validationError.middleware";
import { checkAuthenticate } from "../middlewares/authenticate.middleware";

const router = express.Router();

// Route vérifier le status de l'utilisateur
router.get('/status', checkAuthenticate, getAuthenticatedUser);

// Route pour l'inscription (register)
router.post('/register', registerValidator, handleValidationErrors, register);

// Route pour la connexion avec Forum (login)
router.post('/login/forum', loginValidator, handleValidationErrors, login);

// Route pour la déconnexion
router.get('/logout', logout);

// Route pour la vérification du compte via email
router.get('/verify-email', verifyEmail);

// Route pour demander une réinitialisation de mot de passe
router.post('/request-password-reset', requestPasswordReset);

// Route pour réinitialiser le mot de passe
router.post('/reset-password', resetPasswordValidator, resetPasswordHandler);

export default router;