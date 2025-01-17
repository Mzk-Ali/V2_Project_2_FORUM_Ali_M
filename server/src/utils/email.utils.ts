import nodemailer from 'nodemailer';

export const createMailerTransporter = () => {
    const isDevelopment = process.env.NODE_ENV === 'dev';

    return nodemailer.createTransport({
        host: isDevelopment ? 'localhost' : 'smtp.gmail.com',  // Si en dev, utiliser MailHog, sinon Gmail
        port: isDevelopment ? 1025 : 587,  // MailHog utilise le port 1025 en développement
        secure: !isDevelopment,  // Utiliser SSL en production (Gmail)
        auth: isDevelopment
        ? undefined  // Pas d'authentification avec MailHog
        : {
            user: process.env.EMAIL_USER,  // Par exemple, 'your-email@gmail.com'
            pass: process.env.EMAIL_PASS,  // Votre mot de passe ou application password
        },
    });
};