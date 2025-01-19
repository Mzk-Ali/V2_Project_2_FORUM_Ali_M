import { ReactNode, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchAuthStatus } from "../services/apiContext";

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({children}:AuthProviderProps) {
    const location = useLocation();
    const { data, isLoading, refetch } = useQuery(
        'authStatus',
        fetchAuthStatus,
        {
            refetchOnWindowFocus: false, // Eviter de refetch quand la fenêtre reprend le focus
            retry: false,  // ne pas essayer de refetch en cas d'échec
            enabled: true, // la requête est activée dès le début
            refetchInterval: 60000,
        }
    );

    const isAuthenticated = data?.isAuthenticated || false;
    const hasRoleAdmin = data?.hasRoleAdmin || false;
    const user = data?.user || null;
    const loadingUser = isLoading; // || !data;

    useEffect(() => {
        refetch();
    }, [location, refetch]);

    const forceRefresh = () => {
        refetch().then(() => {});
    };

    return(
        <AuthContext.Provider value={{ isAuthenticated, hasRoleAdmin, loadingUser, checkAuthentication:  async () => { await refetch(); }, user, forceRefresh }}>
            {children}
        </AuthContext.Provider>
    )
};
