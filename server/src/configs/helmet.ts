import { Application } from 'express';
import helmet from 'helmet';

export const useHelmet = (app: Application) => {
  // Appliquer Helmet avec une configuration de base et CSP
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],        // Autoriser les ressources uniquement du même domaine
          scriptSrc: ["'self'", "'unsafe-inline'"], // Autoriser les scripts inline (au besoin, sinon évite `'unsafe-inline'`)
          styleSrc: ["'self'", "'unsafe-inline'"],  // Autoriser les styles inline
          imgSrc: ["'self'", "data:"],   // Autoriser les images du même domaine et les images en base64
          fontSrc: ["'self'"],           // Autoriser les polices uniquement du même domaine
          connectSrc: ["'self'"],        // Autoriser les connexions AJAX, WebSocket, etc., uniquement sur le même domaine
          objectSrc: ["'none'"],         // Interdit les objets (comme Flash, Java applets, etc.)
          upgradeInsecureRequests: []    // Encourage le navigateur à forcer les requêtes HTTP en HTTPS
        }
      },
      referrerPolicy: { policy: 'no-referrer' }, // Referrer Policy
      // Autres protections Helmet comme XSS, HSTS, etc.
      hidePoweredBy: true, // Masquer le header `X-Powered-By`
      frameguard: { action: 'deny' }, // Empêcher l'affichage de la page dans un frame
      dnsPrefetchControl: { allow: false }, // Empêcher le pré-chargement DNS
    })
  );
};