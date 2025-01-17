import express from "express";
import { login, logout, register, verifyEmail } from "../controllers/auth.controller";
import { loginValidator, registerValidator } from "../validators/auth.validator";
import { handleValidationErrors } from "../middlewares/validationError.middleware";

const router = express.Router();

// Route pour l'inscription (register)
router.post('/register', registerValidator, handleValidationErrors, register);

// Route pour la connexion avec Forum (login)
router.post('/login/forum', loginValidator, handleValidationErrors, login);

// Route pour la déconnexion
router.get('/logout', logout);

// Route pour la vérification du compte via email
router.get('/verify-email', verifyEmail);

export default router;