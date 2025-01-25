import { API_CONFIG } from "../configs/api.config"
import { ChangePasswordFormData, ForgotPasswordFormData, LoginFormData, RegisterFormData } from "../types/authentication.d";

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
    const response = await fetch(`${API_CONFIG.baseUrl + route}/login/forum`, {
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

export const fetchResetPassword = async ( data:ForgotPasswordFormData) => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.emailForForgetPassword }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la réinitialisation de mot de passe");
    }
  
    return response.json();
}

export const fetchChangePassword = async ( data:ChangePasswordFormData & { token: string }) => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la réinitialisation de mot de passe");
    }
  
    return response.json();
}