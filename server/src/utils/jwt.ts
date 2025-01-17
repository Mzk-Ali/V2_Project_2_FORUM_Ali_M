import jwt, { JwtPayload } from 'jsonwebtoken';

// Créer un token 'authToken' avec une expiration
export const createAuthToken = (userId: number, email: string, expiresIn: string) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET!,  // Clé secrète pour signer le token
        { expiresIn }  // Durée d'expiration
    );
};

export const decodedToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        return decoded;  // Retourne le JwtPayload
    } catch (error) {
        return null; // Retourne null
    }
}