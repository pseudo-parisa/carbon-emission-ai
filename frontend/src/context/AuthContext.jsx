import { createContext, useContext, useState } from "react";
import { loginUser, logoutUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem("access_token"))
    );

    const login = async (email, password) => {
        await loginUser(email, password);
        setIsAuthenticated(true);
    };

    const logout = () => {
        logoutUser();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};