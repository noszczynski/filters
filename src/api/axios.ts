import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:54321",
  headers: {
    "Content-Type": "application/json",
  },
});
