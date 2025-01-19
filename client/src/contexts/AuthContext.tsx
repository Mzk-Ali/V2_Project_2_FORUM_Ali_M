import { createContext } from 'react';
import { User } from '../types/index.d';


// Typage pour le contexte d'authentification
export interface AuthContextType {
  isAuthenticated: boolean;
  hasRoleAdmin: boolean;
  loadingUser: boolean;
  checkAuthentication: () => Promise<void>;
  user: User | null;
  forceRefresh: () => void;
}

// Valeur par défaut (par défaut, l'utilisateur n'est pas authentifié et on est en mode chargement)
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  hasRoleAdmin: false,
  loadingUser: true,
  checkAuthentication: async () => {},
  user: null,
  forceRefresh: async () => {},
};

// Création du contexte avec une valeur par défaut
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
