import jwt from "jsonwebtoken";
import { createMailerTransporter } from "../utils/email.utils";

// Service pour envoyer un email de vérification
export const sendVerificationEmail = async (email: string) => {
    const transporter = createMailerTransporter();
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Vérification de votre email',
        text: `Cliquez sur ce lien pour vérifier votre compte : ${process.env.REACT_APP_API_URL}/api/auth/verify-email?token=${verificationToken}`,
    };
  
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Échec de l\'envoi de l\'email');
    }
};

export const sendPasswordResetEmail = async(email : string) => {
    const transporter = createMailerTransporter();
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${process.env.REACT_APP_FRONT_URL}/reset-password?token=${resetToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Échec de l\'envoi de l\'email');
    }
}