import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'cancelled' | 'submit' | 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean; // Cette prop peut être redondante avec l'HTML natif, mais on la garde pour la flexibilité
}

export default function Button({ variant, children, className = '', disabled = false, ...props } : ButtonProps) {
  // Définir les classes Tailwind pour chaque variante
  const variantClasses = {
    cancelled: 'w-full bg-slate-200 text-slate-700 hover:bg-slate-400 hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-opacity-50 dark:bg-slate-300',
    submit: 'w-full bg-gradient-to-r from-blue-600 to-blue-300 text-white hover:from-blue-700 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-500',
    primary: 'rounded-xl bg-red-500 hover:bg-red-600 text-white drop-shadow-2xl dark:bg-red-700 dark:hover:bg-red-800',
    secondary: 'rounded-xl bg-orange-300 hover:bg-orange-500 border border-orange-400',
  };

  // Classes de base pour le bouton
  const baseClasses = 'px-4 py-2 rounded-md shadow-xl font-semibold transition-colors duration-300';

  // Classes conditionnelles si le bouton est désactivé
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  return (
    <button
      className={combinedClasses} 
      disabled={disabled}
      {...props}  // Spread operator pour accepter les autres props HTML natifs
    >
      {children}
    </button>
  );
};
