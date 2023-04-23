import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from './consts';
import { useAppSelector } from '../redux/hooks';
import { login } from '../redux/userSlice';

axios.defaults.withCredentials = true;

const useAPI = () => {
  const dispatch = useDispatch();
  // const { postLogin } = useAuthAPI();
  const { accessToken, refresh } = useAppSelector((state) => state.loginInfo);

  const config = {
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { ContentType: 'application/json', Authorization: accessToken, Refresh: refresh },
  };

  const axiosWithAccessToken = axios.create(config);

  axiosWithAccessToken.interceptors.response.use(
    (seccess) => {
      return seccess;
    },
    (err) => {
      if (err.response.data.message !== 'Token Expired') return;

      dispatch(login({ accessToken, isLogin: true }));
    },
  );
  return axiosWithAccessToken;
};

export default useAPI;
