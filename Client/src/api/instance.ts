import axios from 'axios';
import { BASE_URL } from '../hooks/consts';
axios.defaults.withCredentials = true;
const config = {
  baseURL: 'http://ec2-3-35-230-52.ap-northeast-2.compute.amazonaws.com:8080',
  headers: { 'Content-Type': 'application/json' },
};

const axiosInstance = axios.create(config);

const axiosInstanceAuth = axios.create(config);

export { axiosInstance, axiosInstanceAuth };
