import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from './consts';
import { useAppSelector } from '../redux/hooks';
import { login, logout } from '../redux/userSlice';
import Swal from 'sweetalert2';
import { deleteUserInfo } from 'redux/userInfoSlice';

axios.defaults.withCredentials = true;

const useAPI = () => {
  const navigate = useNavigate();
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

      return success;
    },
    (err) => {
      console.log(err);

      return err;
    },
  );
  axiosWithAccessToken.interceptors.response.use(
    (seccess) => {
      //요청이 다 성공으로 가지고있음
      return seccess;
    },
    (err) => {
      console.log(err.response.data.message);

      if (err.response.data.message === 'Unauthorized')
        Swal.fire('로그인 시간이 만료되었습니다. 보안을 위해 다시 로그인 해주시기 바랍니다').then((res) => {
          localStorage.clear();
          navigate(`/home`);
          dispatch(logout());
          dispatch(deleteUserInfo());
        });
      return;
    },
  );
  return axiosWithAccessToken;
};

export default useAPI;
