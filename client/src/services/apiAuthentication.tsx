import { API_CONFIG } from "../configs/api.config"
import { LoginFormData, RegisterFormData } from "../types/authentication.d";

const route = "/api/auth";

export const fetchRegister = async (data: RegisterFormData) => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
    })

    if(!response.ok){
        throw new Error('Inscription échouée. Veuillez réessayer!');
    }

    return response.json();
}


export const fetchLogin = async ( data:LoginFormData) => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/login/proser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Échec de la connexion. Vérifiez vos identifiants.");
    }
  
    return response.json();
}

export const fetchLogout = async () => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/logout`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    if(!response.ok){
        throw new Error('Échec de la déconnexion.');
    }

    return response.json();
}