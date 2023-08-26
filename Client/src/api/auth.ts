import useAPI from '../hooks/uesAPI';
import { axiosInstanceAuth } from './instance';

export interface loginProps {
  username: string;
  password: string;
}
export interface SignupProps {
  nickname: string;
  email: string;
  password: string;
}
export interface IAccessToken {
  authorization: string;
}

export interface userInfo {
  id: string;
  username: string;
  email: string;
  nickname: string;
  headers?: IAccessToken;
  memberId: string;
  location: string;
}

export interface IAccessTokenRefresh {
  headers: IAccessToken;
}

export const useAuthAPI = () => {
  const api = useAPI();

  const postLogin = async (payload: loginProps) => {
    return await axiosInstanceAuth.post<userInfo>('/trip/login', payload);
  };
  const postSignUp = async (payload: SignupProps) => {
    console.log(payload);

    return await axiosInstanceAuth.post('/members', payload);
  };

  const deleteLogout = async () => await api.delete('/logout');

  return { postLogin, postSignUp, deleteLogout };
};
