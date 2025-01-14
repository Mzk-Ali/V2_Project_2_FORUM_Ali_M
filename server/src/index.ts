import express, { Application } from "express";
import dotenv from "dotenv";
import { useCors } from "./configs/cors";
import { useHelmet } from "./configs/helmet";
import { useRateLimit } from "./configs/rateLimit";
import { useCookieParser } from "./middlewares/cookieParser";

// Charge les variables d'environnement
dotenv.config();
// Récupère le port du backend des variables d'environnement
const PORT = process.env.PORT_BACKEND || 3000;

// Créer une instance de l'application Express
const app : Application = express();

// Utilisation des middlewares de sécurité et utilitaires
useCors(app);            // Appliquer CORS
useHelmet(app);          // Appliquer Helmet
useRateLimit(app);       // Appliquer le rate limiter
useCookieParser(app);    // Appliquer cookie-parser

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });

// Retourne un message d'erreur si route non trouvée
app.all(/.*/, (req, res) => {
    res.status(404).send("Message erreur 404")
})

// Lance le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

export default app;