import { API_CONFIG } from "../configs/api.config";
import { Category } from "../types/index.d";

const route = "/api/category";

interface CategoryResponse {
    status: 'success' | 'error';
    message: string;
    data: Category[],
    error?: string;
}

export const fetchAllCategory = async (): Promise <CategoryResponse['data']> => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    if(!response.ok){
        throw new Error('Échec de la récupération des Catégories');
    }

    const responseData: CategoryResponse = await response.json();
    if (responseData.status === 'success') {
        return responseData.data;
    } else {
        throw new Error(responseData.message || 'Erreur inconnue');
    }
}