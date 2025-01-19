import app from './index'; // Importez l'application express
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Charge les variables d'environnement
dotenv.config();
// Récupère le port du backend des variables d'environnement
const PORT = process.env.PORT_BACKEND || 3000;

// Charger les certificats SSL (clé privée et certificat public)
const privateKey = fs.readFileSync(path.resolve(__dirname, 'cert', 'key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, 'cert', 'cert.pem'));

const credentials = { key: privateKey, cert: certificate };

// Démarrer le serveur
// app.listen(PORT, () => {
//     console.log(`Serveur démarré sur http://localhost:${PORT}`);
// });

https.createServer(credentials, app).listen(PORT, () => {
    console.log('Server is running on https://localhost:${port}');
});

// Créer un serveur HTTP qui redirige vers HTTPS (Port 80)
http.createServer((req, res) => {
    const host = req.headers.host;

    // Si `host` est défini, on effectue la redirection HTTPS
    if (host) {
        res.writeHead(301, { Location: `https://${host.replace(/:\d+$/, '')}:${PORT}${req.url}` });
    } else {
        // En cas d'absence de host, on peut choisir de ne pas effectuer de redirection, ou gérer l'erreur
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request: Host header is missing.');
        return;
    }
    res.end();
}).listen(3002, () => {
    console.log('HTTP server running on http://localhost:3002, redirecting to HTTPS');
});