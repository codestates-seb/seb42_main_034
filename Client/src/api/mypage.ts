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

interface FixmemberInfo {
  nickname: string;
  location: {
    latitude: string|number;
    longitude: string|number;
  } | null;
  address: string;
  avatarUrl: string;
}
interface GetPost {
  content: {
    [x: string]: any;
    title: string;
    page:number;
    size:number;
  }
}

export const useMypageAPI = () => {
  const api = useAPI();
  const dispatch = useAppDispatch();

    const getMemberInfo = async (id: string | undefined) =>
      await api.get(`/members/me`).then((res) => res.data);

  const getMyInfo = async (id: string | undefined) =>
      await api.get<Member>(`/members/me`).then(res => {
          dispatch(setUserInfo(res.data));
          return res.data.data;
      });

      const patchFixMemberInfo = (data: FixmemberInfo) =>
      api.patch(`/members/edit`, data)

      // const getPostList = (
      //   id: string|undefined,
      //   index?: string|undefined,
      // ) => {
      //   if(index) {
      //     return api
      //       .get(`members/${id}/questionTitle`, {params: {index} })
      //       .then(res => res.data);
      //   } else {
      //     return api.get(`/members/${id}/questionTitle`).then(res => res.data);
      //   }
      // }
      const getPostList = async () => {
        await api.get(`members/questionTitle`).then(res=>res.data)
      }


  return {
      getMemberInfo,
      getMyInfo,
      patchFixMemberInfo,
      getPostList,
  }
};
