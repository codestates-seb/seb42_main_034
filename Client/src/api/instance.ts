import axios from "axios";
import { BASE_URL } from "../hooks/consts";


const config = {
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
}

const axiosInstance = axios.create(config);
const axiosInstanceAuth = axios.create(config);
axiosInstanceAuth.defaults.withCredentials = true;

export {axiosInstance, axiosInstanceAuth };