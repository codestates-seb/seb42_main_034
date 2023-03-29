/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import useAPI from '../hooks/uesAPI';
import axios from 'axios';
import { setUserInfo } from '../redux/userInfoSlice';
import { useAppDispatch } from '../redux/hooks';

interface Member {
  [key: string]: any;
  memberId: number;
  nickname: string;
  username: string;
  location: {
    latitude: string;
    longitude: string;
  };
  address: string;
  totalCount: number;
  avatarUrl: string;
  key: string;
  value: string;
}

interface FixMyInfo {
  nickname: string;
  username: string;
  location: {
    latitude: string | number;
    longitude: string | number;
  } | null;
  address: string;
  avatarUrl: string;
}

export const useMypageAPI = () => {
  const api = useAPI();
  const dispatch = useAppDispatch();

  const getMemberInfo = async (id: string | undefined) => await api.get(`/members/me`).then((res) => res.data.data);

  const getMyInfo = async (id?: string | undefined) =>
    await api.get<Member>(`/members/me`).then((res) => {
      dispatch(setUserInfo(res.data));
      return res.data.data;
    });

  const patchFixMyInfo = (data: FixMyInfo) => api.patch(`/members/edit`, data);

  // const aixosAddPhoto = (data:any) => {
  //   axios.post(`/upload`, data).then(res => console.log(res));
  // }

  return {
    getMemberInfo,
    getMyInfo,
    patchFixMyInfo,
  };
};
