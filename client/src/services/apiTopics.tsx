import { Topic } from "../components/topics/TopicsList";
import { API_CONFIG } from "../configs/api.config";

const route = "/api/topic";

interface TopicResponse {
    status: 'success' | 'error';
    message: string;
    data: Topic[],
    error?: string;
}

export const fetchGetTopics = async (filterParams: string): Promise <TopicResponse['data']> => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/getFiltersTopics${filterParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    if(!response.ok){
        throw new Error('Échec de la récupération des Topics');
    }

    const responseData: TopicResponse = await response.json();
    if (responseData.status === 'success') {
        return responseData.data;
    } else {
        throw new Error(responseData.message || 'Erreur inconnue');
    }
}

export const fetchGetMyTopics = async (filterParams: string): Promise <TopicResponse['data']> => {
    const response = await fetch(`${API_CONFIG.baseUrl + route}/getMyTopics${filterParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })

    if(!response.ok){
        throw new Error('Échec de la récupération de mes Topics');
    }

    const responseData: TopicResponse = await response.json();
    if (responseData.status === 'success') {
        return responseData.data;
    } else {
        throw new Error(responseData.message || 'Erreur inconnue');
    }
}