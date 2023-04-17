import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from './consts';
import { useAppSelector } from '../redux/hooks';
import { login } from '../redux/userSlice';

axios.defaults.withCredentials = true;

const useAPI = () => {
  const dispatch = useDispatch();
  const { accessToken } = useAppSelector((state) => state.loginInfo);
  const config = {
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { ContentType: 'application/json', Authorization: accessToken },
  };

  const axiosWithAccessToken = axios.create(config);

  axiosWithAccessToken.interceptors.response.use(
    (seccess) => {
      console.log(seccess);

      return seccess;
    },
    (err) => {
      if (err.response.data.message !== 'Token Expired') return;
      console.log(err);

      dispatch(login({ accessToken, isLogin: true })); //토큰 재발급할때 토큰 제대로 안들어가서 고쳣음
    },
  );
  return axiosWithAccessToken;
};

export default useAPI;
