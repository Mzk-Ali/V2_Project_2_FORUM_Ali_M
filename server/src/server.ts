import app from './index'; // Importez l'application express
import dotenv from 'dotenv';

// Charge les variables d'environnement
dotenv.config();
// Récupère le port du backend des variables d'environnement
const PORT = process.env.PORT_BACKEND || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});