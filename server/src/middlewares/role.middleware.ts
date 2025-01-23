import { NextFunction, Request, Response } from "express"
import prisma from "../lib/prismaClient";
import { errorResponse } from "../utils/responseHandler";
import { RequestWithUser } from "../interfaces/requestWithUser.interface";

export const checkRole = (allowedRoles: string[]) => {
    return async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;

            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                  roles: true,
                },
            });

            if (!user) {
                return errorResponse(res, "Utilisateur non trouvé", '', 404)
            }

            const userRoles = user.roles.map(role => role.name);
            const hasRole = userRoles.some(role => allowedRoles.includes(role));

            if (!hasRole) {
                return errorResponse(res, "Accès interdit, rôle insuffisant", '', 403)
            }
        
            next();
        } catch (error) {
            return errorResponse(res, 'Erreur du serveur', error)
        }
    }
}