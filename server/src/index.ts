import express from "express";
import dotenv from "dotenv";

// Charge les variables d'environnement
dotenv.config();

// Créer une instance de l'application Express
const app = express();

// Récupère le port du backend des variables d'environnement
const PORT = process.env.PORT_BACKEND || 3000;

// Retourne un message d'erreur si route non trouvée
app.all(/.*/, (req, res) => {
    res.status(404).send("Message erreur 404")
})

// Lance le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });