import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

type InputVariant = 'primary' | 'secondary' | 'error' | 'outline';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: InputVariant;
  disabled?: boolean;
  name: string;
  label: string;
  className?: string;
  // ref: string;
}

const FormInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ variant, className = '', disabled = false, name, id, label, type, ...otherProps }, ref) => {
  // Définir les classes Tailwind pour chaque variante
  const variantClasses = {
    primary: 'mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    secondary: 'border-blue-300 focus:ring-blue-500 focus:border-blue-500',
    error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
    outline: 'border-gray-300 focus:ring-gray-500 focus:border-gray-500',
  };

  // Classes de base pour l'input
  const baseClasses = 'block w-full px-4 py-2 rounded-md shadow-sm transition-colors duration-300';

  // Classes conditionnelles si l'input est désactivé
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  // Fonction pour choisir l'icône en fonction du type d'input HTML
  const getIcon = (inputType: string | undefined): IconProp | null => {
    switch (inputType) {
      case 'email':
        return faEnvelope;
      case 'password':
        return faLock; // Icône pour mot de passe
      default:
        return null; // Pas d'icône si le type est non pris en charge
    }
  };

  const icon = getIcon(type);

  return (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
          <span className='dark:text-gray-100'>{label}</span>
          <div className={`relative ${className}`}>
            {/* Affichage conditionnel de l'icône si elle existe */}
            {icon && (
              <FontAwesomeIcon 
                icon={icon} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
              />
            )}

            <input
              id={id}
              className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${icon ? 'pl-10' : ''}`} // Ajout de padding-left si icône présente
              disabled={disabled}
              {...otherProps}
              name={name}
              type={type}
              ref={ref}
            />
          </div>
        </label>
    );
};

const Input = React.forwardRef(FormInput);

export default Input;
