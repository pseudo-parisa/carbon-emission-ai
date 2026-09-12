import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export default api;

export const getCalculations = async () => {
  const response = await api.get("/calculations");
  return response.data;
};