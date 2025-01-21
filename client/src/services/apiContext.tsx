import { API_CONFIG } from "../configs/api.config";
import { User } from "../types/index.d";

const route = "/api";

interface AuthStatusResponse {
    status: 'success' | 'error';
    message: string;
    data?: {
        isAuthenticated: boolean;
        user: User;
        hasRoleAdmin: boolean;
    };
    error?: string;
}

// Vérifie l'authentification de l'utilisateur et récupère l'état + token + infos
export const fetchAuthStatus = async (): Promise<AuthStatusResponse['data']> => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/auth/status`, {
        method: 'GET',
        credentials: 'include',
    });
  
    if (!response.ok) {
        throw new Error('Erreur lors de la vérification de l\'authentification');
    }
  
    const responseData: AuthStatusResponse = await response.json();
    if (responseData.status === 'success') {
        return responseData.data;
    } else {
        throw new Error(responseData.message || 'Erreur inconnue');
    }
};