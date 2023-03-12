import axios from "axios";


const config = {
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
}

const axiosInstance = axios.create(config);

const axiosInstanceAuth = axios.create(config);
axiosInstanceAuth.defaults.withCredentials = true;

export {axiosInstance, axiosInstanceAuth };