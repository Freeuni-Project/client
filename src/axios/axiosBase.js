import axios from "axios";
import { store } from "../store";

const state = store.getState();

const instance = axios.create({
  baseURL: "http://localhost:8000/backend/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token-short")}
`,
  },
});

export default instance;
