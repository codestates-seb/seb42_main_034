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
    headers: { ContentType: 'application/json', Authorization: accessToken, refresh },
  };

  const axiosWithAccessToken = axios.create(config);
  axiosWithAccessToken.interceptors.request.use(
    (success) => {
      console.log(success);
      console.log(success.headers);
      return success;
    },
    (error) => {
      console.log(error.response.data.message);

      console.log('에ㅐ러남', error);
    },
  );
  axiosWithAccessToken.interceptors.response.use(
    (seccess) => {
      console.log(seccess.status);
      //요청이 다 성공으로 가지고있음
      return seccess;
    },
    (err) => {
      if (err.response.data.message !== 'Token Expired') return;
      console.log(err);
      console.log('실패');

      dispatch(login({ accessToken, isLogin: true }));
    },
  );
  return axiosWithAccessToken;
};

export default useAPI;
