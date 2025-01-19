import { API_CONFIG } from "../configs/api.config";
import { User } from "../types/index.d";

const route = "/api";

// Vérifie l'authentification de l'utilisateur et récupère l'état + token + infos
export const fetchAuthStatus = async (): Promise<{ isAuthenticated: boolean; user: User; hasRoleAdmin : boolean }> => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/auth/status`, {
        method: 'GET',
        credentials: 'include',
    });
  
    if (!response.ok) {
        throw new Error('Erreur lors de la vérification de l\'authentification');
    }
  
    const data:{ isAuthenticated: boolean; user: User; hasRoleAdmin : boolean } = await response.json();
    return data;
};