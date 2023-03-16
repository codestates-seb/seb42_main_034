import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "./consts";
import { useAppSelector } from "../redux/hooks";
import { login } from "../redux/user";


const useAPI = () => {
    const dispatch = useDispatch();
    const { accessToken } = useAppSelector(state => state.loginInfo);
    const config = {
        baseURL: BASE_URL,
        withCredentials: true,
        headers: { ContentType: 'application/json', Authorization: accessToken},

    };

    const axiosWithAccessToken = axios.create(config);
    axiosWithAccessToken.interceptors.response.use(undefined, err => {
        if (err.response.data.message !== 'Token Expired') return;
        dispatch(login({ accessToken: 'Bearer', isLogin: true}));
    })
        return axiosWithAccessToken; 
};

export default useAPI;