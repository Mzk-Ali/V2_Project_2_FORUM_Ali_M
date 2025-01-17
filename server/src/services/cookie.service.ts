import { Response } from "express";
import { createAuthToken } from "../utils/jwt";

export const setAuthTokenCookie = (res: Response, userId: number, email: string, expiresIn: string) => {
    const authToken = createAuthToken(userId, email, expiresIn);

    res.cookie('authToken', authToken, {
        httpOnly: true, // Pour éviter l'accès JavaScript côté client
        secure: process.env.NODE_ENV === 'production', // Utilise "secure" uniquement en production (https)
        maxAge: parseInt(expiresIn) * 60 * 60 * 1000, // Durée du cookie en millisecondes
        sameSite: 'strict',
    });
};

export const deleteCookie = (res: Response, cookieName: string) => {
    // Supprimer le cookie
    res.clearCookie(cookieName, {
        httpOnly: true,  // Empêche l'accès au cookie via JavaScript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',  // Protection contre les attaques CSRF
    });
}