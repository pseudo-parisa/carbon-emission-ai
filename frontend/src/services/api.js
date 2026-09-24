import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;

export const registerUser = async (email, password) => {
    const response = await api.post("/register", {
        email,
        password,
    });

    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await api.post("/login", {
        email,
        password,
    });

    localStorage.setItem(
        "access_token",
        response.data.access_token
    );

    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("access_token");
};

export const getCalculations = async () => {
    const response = await api.get("/calculations");
    return response.data;
};