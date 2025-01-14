import request from 'supertest'; // Supertest permet d'envoyer des requêtes HTTP
import app from '../src/index'; // Importer l'application Express à tester


//  ===========================
//  Root Route Test
//  ===========================
describe('Test Application', () => {
    // Test de la route principale
    it('should return 200 for the root route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200); // Vérifie que le statut de la réponse est 200
        expect(response.body).toEqual({ message: 'Hello, World!' }); // Vérifie que la réponse est bien ce que l'on attend
    });
});

//  ===========================
//  Cors Test
//  ===========================
describe('CORS Middleware Tests', () => {
    // Test que les en-têtes CORS sont appliqués
    it('should allow requests from allowed origins', async () => {
        const response = await request(app)
            .get('/') // Requête sur la racine
            .set('Origin', 'https://localhost:3000'); // Définir l'origine autorisée
    
        // Vérifie que la réponse contient les en-têtes CORS
        expect(response.header['access-control-allow-origin']).toBe('https://localhost:3000');
        expect(response.header['access-control-allow-credentials']).toBe('true');
    });
  
    // Test que CORS rejette une origine non autorisée
    it('should reject requests from disallowed origins', async () => {
        const response = await request(app)
            .get('/') // Requête sur la racine
            .set('Origin', 'https://unauthorized-origin.com'); // Définir une origine non autorisée
    
        // Vérifie que l'origine non autorisée est rejetée
        expect(response.header['access-control-allow-origin']).toBeUndefined();
    });
  
    // Test que les en-têtes CORS sont bien présents pour la méthode OPTIONS (pré-vol)
    it('should respond to OPTIONS preflight requests', async () => {
        const response = await request(app)
            .options('/') // Requête OPTIONS pour vérifier le pré-vol CORS
            .set('Origin', 'https://localhost:3000'); // Origine autorisée
    
        // Vérifie les en-têtes CORS dans la réponse
        expect(response.header['access-control-allow-origin']).toBe('https://localhost:3000');
        expect(response.header['access-control-allow-methods']).toBe('GET,POST,PUT,DELETE,OPTIONS');
        expect(response.header['access-control-allow-headers']).toBe('Content-Type,Authorization,Origin,X-Requested-With');
        expect(response.header['access-control-allow-credentials']).toBe('true');
    });
});

//  ===========================
//  Helmet Tests
//  ===========================
describe('Helmet Middleware Tests', () => {
    // Test que Helmet applique la Content Security Policy (CSP)
    it('should apply Content Security Policy (CSP)', async () => {
      const response = await request(app)
        .get('/'); // Requête sur la racine
  
      // Vérifie que l'en-tête Content-Security-Policy est bien présent et contient la directive `default-src` avec la valeur `'self'`
      expect(response.header['content-security-policy']).toContain("default-src 'self'");
      expect(response.header['content-security-policy']).toContain("script-src 'self' 'unsafe-inline'");
    });
  
    // Test que Helmet applique la politique Referrer
    it('should apply Referrer Policy', async () => {
      const response = await request(app)
        .get('/'); // Requête sur la racine
  
      // Vérifie que l'en-tête Referrer-Policy est bien défini sur 'no-referrer'
      expect(response.header['referrer-policy']).toBe('no-referrer');
    });
  
    // Test que Helmet masque le header X-Powered-By
    it('should hide X-Powered-By header', async () => {
      const response = await request(app)
        .get('/'); // Requête sur la racine
  
      // Vérifie que le header `X-Powered-By` est absent
      expect(response.header['x-powered-by']).toBeUndefined();
    });
  
    // Test que Helmet applique le Frameguard (interdire l'affichage dans un frame)
    it('should apply Frameguard', async () => {
      const response = await request(app)
        .get('/'); // Requête sur la racine
  
      // Vérifie que l'en-tête `X-Frame-Options` est bien défini sur 'DENY'
      expect(response.header['x-frame-options']).toBe('DENY');
    });
  
    // Test que Helmet applique le DNS prefetch control
    it('should apply DNS prefetch control', async () => {
      const response = await request(app)
        .get('/'); // Requête sur la racine
  
      // Vérifie que l'en-tête `X-DNS-Prefetch-Control` est bien défini sur 'off'
      expect(response.header['x-dns-prefetch-control']).toBe('off');
    });
});

