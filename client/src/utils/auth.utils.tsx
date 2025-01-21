import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { useMutation } from "react-query";
import { fetchLogout } from "../services/apiAuthentication";


export const useLogout = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { mutate, isLoading} = useMutation(fetchLogout, {
        onSuccess: () => {
            showToast("A très bientôt", "success");
            navigate("/");
        },
        onError: (err) => {
            showToast("Déconnexion échouée", "error");
            console.error("Erreur lors de la déconnexion:", err);
        }
    });

    const logoutUser = () => {
        mutate();
    };

    return {
        logoutUser,
        isLoading,
    };
}