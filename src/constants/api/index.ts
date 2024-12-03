import axios from "axios";
import { baseURL } from "./URLS";
import { toast } from "react-toastify";
export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});
