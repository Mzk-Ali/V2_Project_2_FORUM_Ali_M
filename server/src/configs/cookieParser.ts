import cookieParser from 'cookie-parser';
import { Application } from 'express';

export const useCookieParser = (app: Application) => {
    // Le middleware prend une clé secrète pour signer les cookies
    const secret = process.env.COOKIE_SECRET || 'your-secret-key';
    app.use(cookieParser(secret));
};