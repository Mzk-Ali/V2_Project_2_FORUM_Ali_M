import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import xss from "xss";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { createUser, getUserByEmail, updateUser } from "../models/user.model";
import { deleteCookie, setAuthTokenCookie } from "../services/cookie.service";
import { sendPasswordResetEmail, sendVerificationEmail } from "../services/email.service";
import { decodedToken } from "../utils/jwt";
import { Prisma } from "@prisma/client";
import { RequestWithUser } from "../interfaces/requestWithUser.interface";


interface Role {
    name: string;
}
// Controller pour récupérer le informations de l'utilisateur connecté
export const getAuthenticatedUser = async (req: RequestWithUser, res: Response) => {
    try {
        // Récupérer l'utilisateur depuis `req.user` (ajouté par le middleware)
        const user = req.user;

        if (!user) {
            return errorResponse(res, 'Utilisateur non trouvé', { isAuthenticated: false}, 404);
        }

        // Vérifier si l'utilisateur a le rôle "Admin"
        const hasRoleAdmin = user.roles.some(role => role.name === 'Admin');

        // Retourne les informations de l'utilisateur et le statut d'authentification
        successResponse(res, 200, '', {
            isAuthenticated: true,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                photoProfile: user.photoProfile,
                status: user.status
            },
            hasRoleAdmin,
        });
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}


// Controller pour l'inscription d'un utilisateur
export const register = async (req: Request, res: Response) => {
    const { data } = req.body;

    // Échapper les entrées utilisateur pour éviter XSS
    const safeEmail = xss(data.email);
    const safePassword = xss(data.password);
    const safeConfirmPassword = xss(data.confirmPassword);
    const safeLastName = xss(data.lastName);
    const safeFirstName = xss(data.firstName);

    try {
        const existingUser = await getUserByEmail(safeEmail);
        if(existingUser){
            return errorResponse(res, 'Cet email est déjà utilisé', null, 409);
        }

        const hashedPassword = await bcrypt.hash(safePassword, 10);

        // Création de l'utilisateur
        const user = await createUser(safeEmail, hashedPassword, safeLastName, safeFirstName);

        // Envoi de l'email de vérification
        await sendVerificationEmail(user.email);

        successResponse(res, 201, 'Utilisateur créé avec succès. Un email de vérification a été envoyé.',)
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Controller pour l'authentification (connexion)
export const login = async (req: Request, res: Response) => {
    const { data } = req.body;

    // Échapper les entrées utilisateur pour éviter XSS
    const safeEmail = xss(data.email);
    const safePassword = xss(data.password);
    const safeRememberMe = xss(data.rememberMe);

    try {
        const user = await getUserByEmail(safeEmail);
        if (!user) {
            return errorResponse(res, 'Email ou mot de passe incorrect', null, 404);
        }

        // Vérification de la présence du mot de passe de l'utilisateur
        if (!user.password) {
            return errorResponse(res, 'Email ou mot de passe incorrect', null, 404);
        }

        // Vérification de la comparaison des mots de passe
        const passwordMatch = await bcrypt.compare(safePassword, user.password);
        if (!passwordMatch) {
            return errorResponse(res, 'Email ou mot de passe incorrect', null, 404);
        }
      
        // Vérifie que le compte est vérifié par email
        if (!user.verified) {
            return errorResponse(res, 'Veuillez vérifier votre adresse email', null, 401);
        }

        // Gérer le token et le cookie
        setAuthTokenCookie(res, user.id, user.email, safeRememberMe ? '7d' : '1h'); // 7 jours si 'remember me' est activé sinon 1 heure
        
        successResponse(res, 200, 'Authentification réussie.')
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Controller pour la déconnexion
export const logout = async (req: Request, res: Response) => {
    try {
        deleteCookie(res, 'authToken');
        successResponse(res, 201, 'Utilisateur deconnecté.')
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Controller pour la vérification par Email
export const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;

    // Vérification du token
    if (typeof token !== 'string') {
        return errorResponse(res, 'Token manquant ou invalide', null, 400);
    }

    try {
        const decoded = decodedToken(token);
        if (!decoded) {
            return errorResponse(res, 'Token invalide', null, 400);
        }
        const user = await getUserByEmail(decoded.email);
    
        if (!user) {
            return errorResponse(res, 'Utilisateur non trouvé', null, 404);
        }
    
        if (user.verified) {
            return errorResponse(res, 'Compte déjà vérifié', null, 409);
        }
    
        await updateUser(user.id, { verified: true, status: "Active" });
        res.redirect('/login');
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Controller pour demander une réinitialisation de mot de passe
export const requestPasswordReset = async (req : Request, res : Response) => {
    const { email } = req.body;

    const safeEmail = xss(email);

    try {
        const user = await getUserByEmail(safeEmail);
        if (!user) {
            return errorResponse(res, 'Email non trouvé', null, 400)
        }

        await sendPasswordResetEmail(safeEmail);
        return successResponse(res, 200, 'Un email de réinitialisation de mot de passe a été envoyé.')
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Controller pour réinitialiser le mot de passe
export const resetPasswordHandler = async (req: Request, res: Response) => {
    const { data } = req.body;

    // Échapper les entrées utilisateur pour éviter XSS
    const safeToken = xss(data.token);
    const safePassword = xss(data.password);
    const safeConfirmPassword = xss(data.confirmPassword);
    
    // Vérification du token
    if (typeof safeToken !== 'string') {
        return errorResponse(res, 'Token manquant ou invalide', null, 400);
    }

    try {
        const decoded = decodedToken(safeToken);
        if (!decoded) {
            return errorResponse(res, 'Token invalide', null, 400);
        }
        const user = await getUserByEmail(decoded.email);
      
        if (!user) {
            return errorResponse(res, 'Utilisateur non trouvé', null, 404);
        }
      
        const hashedPassword = await bcrypt.hash(safePassword, 10);
        await updateUser(user.id, { password: hashedPassword });

        return successResponse(res, 200, 'Votre mot de passe a été réinitialisé avec succès.')
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}