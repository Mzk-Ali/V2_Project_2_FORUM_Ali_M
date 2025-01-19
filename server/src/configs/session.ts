import { NextFunction, Request, Response } from 'express';
import session from 'express-session';

// Middleware pour la gestion des sessions
const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const secretKey = process.env.SECRET_KEY || 'fallback_secret';
    const sessionSecret = process.env.SESSION_SECRET;
    const domain = process.env.DOMAIN 
    // Configurer express-session
    session({
        secret: sessionSecret!, // Utilisation du secret de session provenant du fichier .env
        // keys:['some random key'], 
        resave: false,
        saveUninitialized: true,
        name:'sessid',
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Active secure cookies en production
            maxAge: parseInt (process.env.COOKIE_EXPIRESIN! ),
            sameSite: 'strict',
            domain : domain,
        }
    })(req, res, next);;
};

export default sessionMiddleware;