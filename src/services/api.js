import axios from "axios";

const api = axios.create({
  baseURL: "https://hogofilm.pythonanywhere.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
