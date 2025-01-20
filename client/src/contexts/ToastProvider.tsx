import React, { ReactNode } from 'react';
import { ToastContext } from './ToastContext';  // Importation du contexte
import { toast, ToastOptions } from 'react-toastify';

// Type pour les props du ToastProvider
type ToastProviderProps = {
    children: ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    // Fonction pour afficher les toasts avec différents types
    const showToast = (message: string, type: 'success' | 'warning' | 'error' = 'success', options?: ToastOptions) => {
        const defaultOptions: ToastOptions = {
            className: 'mt-20 lg:mt-14',
            ...options,
        };
        switch (type) {
        case 'success':
            toast.success(message, defaultOptions);
            break;
        case 'warning':
            toast.warning(message, defaultOptions);
            break;
        case 'error':
            toast.error(message, defaultOptions);
            break;
        default:
            toast.success(message, defaultOptions);
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
        </ToastContext.Provider>
    );
};