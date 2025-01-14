import { Application } from "express"
import { getLimiter, loginLimiter, methodLimiter, registerLimiter } from "../services/rateLimiters.service";

export const useRateLimit = (app : Application) => {
    // Applique le rate limiter pour la route de login
    app.use('/login', loginLimiter);

    // Applique le rate limiter pour la route d'enregistrement
    app.use('/register', registerLimiter);

    // Applique le rate limiter pour les autres méthodes sensibles (POST, PUT, PATCH, DELETE)
    app.use(['/post', '/put', '/patch', '/delete'], methodLimiter);

    // Applique le rate limiter général pour les requêtes GET
    app.use(getLimiter);
}