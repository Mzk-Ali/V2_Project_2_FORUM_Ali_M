import { NextFunction, Response } from "express";
import { decodedToken } from "../utils/jwt";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { getUserByEmail } from "../models/user.model";
import { RequestWithUser } from "../interfaces/requestWithUser.interface";

export const checkAuthenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authToken = req.cookies.authToken;

    // Vérification de la présence du token
    if (!authToken) {
        return successResponse(res, 200, '', { isAuthenticated: false});
    }

    try {
        const decoded = decodedToken(authToken);
        if (!decoded) {
            return successResponse(res, 200, 'Test', { isAuthenticated: false});
        }

        // Récupère l'utilisateur via Email
        const user = await getUserByEmail(decoded?.email);

        if (!user) {
            return errorResponse(res, 'Utilisateur non trouvé', { isAuthenticated: false}, 404);
        }

        // Attache l'utilisateur à la requête pour l'utiliser dans les contrôleurs
        req.user = user;

        // On continue
        return next();

    } catch (error) {
        errorResponse(res, 'Erreur du serveur', error)
    }
}