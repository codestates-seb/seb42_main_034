import useAPI from '../hooks/uesAPI';
import axios from 'axios';
import { setUserInfo } from '../redux/userInfoSlice';
import { useAppDispatch } from '../redux/hooks';

interface Member {
  [key: string]: any;
  memberId: number;
  nickname: string;
  location: {
    latitude: string;
    longitude: string;
  };
  address: string;
  totalCount: number;
  avatarUrl: string;
  key: string;
  value: string;
  // memberId: number;
  // [key: string]: any;
  // // value: any;
  // // nickname: string;
  // name: string;
  // location: {
  //   lat: string | number;
  //   lon: string | number;
  // } | null;

  // address: string | null; 
  // totalCount: number;
  // avatarUrl: string;
}

// interface City {
//   content: {
//     CityId: number;
//     location: {
//       latitude: number | number;
//       longitude: number | number;
//     };
//   }[];
// }
export const useMypageAPI = () => {
  const api = useAPI();
  const dispatch = useAppDispatch();

    const getMemberInfo = async (id: string | number) =>
      await api.get(`/member/${id}`).then((res) => res.data);

  const getMyInfo = async (id: string | undefined) =>
      await api.get<Member>(`/member/${id}`).then(res => {
          dispatch(setUserInfo(res.data));
          return res.data;
      });

  return {
      getMemberInfo,
      getMyInfo,
  }
};
