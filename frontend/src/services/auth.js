export const isAuthenticated = () => {
    return Boolean(localStorage.getItem("access_token"));
};

export const getToken = () => {
    return localStorage.getItem("access_token");
};