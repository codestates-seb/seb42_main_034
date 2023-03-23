import useAPI from '../hooks/uesAPI';
import { axiosInstanceAuth } from './instance';

export interface loginProps {
  username: string;
  password: string;
}

export interface IAccessToken {
  authorization: string;
}

export interface userInfo {
  id: string;
  email: string;
  nickname: string;
  headers?: IAccessToken;
}

export interface IAccessTokenRefresh {
  headers: IAccessToken;
}

export const useAuthAPI = () => {
  const api = useAPI();

  const postLogin = async (payload: loginProps) => {
    return await axiosInstanceAuth.post<userInfo>('/trip/login', payload);
  };

  const getAccessTokenRefresh = async () => await api.get<IAccessTokenRefresh>('/reissue');

  const deleteLogout = async () => await api.delete('/logout');

  return { getAccessTokenRefresh, postLogin, deleteLogout };
};
