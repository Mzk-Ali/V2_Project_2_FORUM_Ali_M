import express, { Application } from "express";
import dotenv from "dotenv";

// Importation des Configurations
import { useCors } from "./configs/cors";
import { useHelmet } from "./configs/helmet";
import { useRateLimit } from "./configs/rateLimit";
import { useCookieParser } from "./configs/cookieParser";

// Importation des Routes
import authRoute from "./routes/auth.routes";
import categoryRoute from "./routes/category.routes";
import topicRoute from "./routes/topic.routes";
import postRoute from "./routes/post.routes";
import sessionMiddleware from "./configs/session";

// Charge les variables d'environnement
dotenv.config();

// Créer une instance de l'application Express
const app : Application = express();

// Utilisation des configurations de sécurité
useCors(app);            // Appliquer CORS
useHelmet(app);          // Appliquer Helmet
useRateLimit(app);       // Appliquer le rate limiter
useCookieParser(app);    // Appliquer cookie-parser

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/topic", topicRoute);
app.use("/api/post", postRoute);



app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });

// Retourne un message d'erreur si route non trouvée
app.all(/.*/, (req, res) => {
    res.status(404).send("Message erreur 404")
})

export default app;