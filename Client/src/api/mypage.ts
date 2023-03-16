import useAPI from '../hooks/uesAPI';
import axios from 'axios';
import { setUserInfo } from '../redux/userInfoReducer';
import { useAppDispatch } from '../redux/hooks';

interface Member {
  memberId: number;
  name: string;
  location: {
    lat: string | number;
    lon: string | number;
  } | null;

  address: string | null;
  totalCount: number;
  avatarUrl: string;
}

interface City {
  content: {
    CityId: number;
    location: {
      latitude: number | number;
      longitude: number | number;
    };
  }[];
}
export const useMypageAPI = () => {
  const api = useAPI();
  const dispatch = useAppDispatch();

  //   const getMemberInfo = async (id: string | number | undefined) =>
  //     await api.get(`/member/${id}`).then((res) => res.data);

  // const getMyInfo = async (id: string | undefined) =>
  //     await api.get<Member>(`/member/${id}`).then(res => {
  //         dispatch(setUserInfo(res.data));
  //         return res.data;
  //     });

  // return {
  //     getMemberInfo,
  //     getMyInfo,
  // }
};
