import rateLimit from 'express-rate-limit';

// Rate limiter pour le login
const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // 5 requêtes par IP
    message: 'Trop de tentatives de connexion. Veuillez réessayer après 5 minutes.',
    handler: (req, res) => {
        res.status(429).json({ message: 'Trop de tentatives de connexion. Veuillez réessayer après 5 minutes.' });
    }
});

// Rate limiter pour l'enregistrement
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // 3 tentatives d'inscription par IP
    message: 'Trop de tentatives d\'inscription. Veuillez réessayer après 15 minutes.',
    handler: (req, res) => {
        res.status(429).json({ message: 'Trop de tentatives d\'inscription. Veuillez réessayer après 15 minutes.' });
    }
});

// Rate limiter pour les autres méthodes POST, PUT, PATCH, DELETE
const methodLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 20, // 20 requêtes par IP
    // keyGenerator: (req) => {
    //     // Utiliser un identifiant unique pour l'utilisateur, par exemple dans un token JWT ou dans la session
    //     return req.user ? req.user.id : req.ip; // Si l'utilisateur est authentifié, utilise son ID
    // },
    message: 'Trop de requêtes pour cette méthode. Veuillez réessayer plus tard.',
    handler: (req, res) => {
        res.status(429).json({ message: 'Trop de requêtes pour cette méthode. Veuillez réessayer plus tard.' });
    }
});

// Rate limiter général pour les requêtes GET
const getLimiter = rateLimit({
    windowMs: 1 * 60 * 60 * 1000, // 1 heure
    max: 100, // 100 requêtes par IP pour les requêtes GET
    message: 'Trop de requêtes GET. Veuillez réessayer plus tard.',
    handler: (req, res) => {
        res.status(429).json({ message: 'Trop de requêtes GET. Veuillez réessayer plus tard.' });
    }
});

export { loginLimiter, registerLimiter, methodLimiter, getLimiter };