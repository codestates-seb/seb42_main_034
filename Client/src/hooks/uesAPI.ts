import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "./consts";

const useAPI = () => {
    const dispatch = useDispatch();
    const { accessToken } = useAppSelector(state => state.loginInfo);
    const config = {
        baseURL: BASE_URL,
        withCredentials: true,
        headers: { ContentType: 'application/json', Authorization: accessToken},

    };

    const axiosWtihAccessToken = axios.create(config);
    axiosWithAcceessToken.interceptors.response.use(undefined, err => {
        if (err.response.data.message !== 'Token Expired') return;
        dispatch(login({ accessToken: 'Bearer', isLogin: true}));
    })


        return axiosWtihAccessToken; 
};

export default useAPI;