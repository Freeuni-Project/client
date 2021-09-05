import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/backend/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token-short")}
`,
  },
});

export default instance;
