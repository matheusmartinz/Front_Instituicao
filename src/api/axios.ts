import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // troque pela URL do seu 
  headers: {
    Accept: 'application/json',
  }
});
export default api;
