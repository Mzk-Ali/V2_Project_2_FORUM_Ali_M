import { createContext } from 'react';
import { ToastOptions } from 'react-toastify';

// Définir les types pour la fonction du toast
export type ToastContextType = {
    showToast: (message: string, type?: 'success' | 'warning' | 'error', options?: ToastOptions) => void;
};

// Création du contexte Toast avec une valeur par défaut (undefined)
export const ToastContext = createContext<ToastContextType | undefined>(undefined);