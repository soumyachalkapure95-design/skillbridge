import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [role, setRole] = useState(localStorage.getItem("role"));
    const navigate = useNavigate();

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        const { access_token, role: userRole } = res.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("role", userRole);
        setRole(userRole);
        navigate(`/${userRole.toLowerCase()}`);
    };

    const register = async (payload) => {
        await api.post("/auth/register", payload);
        navigate("/login");
    };

    const logout = () => {
        localStorage.clear();
        setRole(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ role, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);