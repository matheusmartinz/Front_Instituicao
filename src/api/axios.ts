import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // troque pela URL do seu backend
});

export default api;
