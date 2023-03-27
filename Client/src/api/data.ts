import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { axiosInstance } from './instance';

// const axiosConfig: AxiosRequestConfig = {
//     baseURL: 'ec2-52-78-1-107.ap-northeast-2.compute.amazonaws.com:8080/login',
//     headers:

//   }
axios.defaults.withCredentials = true;
interface QuestionList {
  url: string;
  city: string;
  page: string;
  sortedBy: string;
}

export interface ReturnData {
  data: {
    questionId: string;
    title: string;
    tag: string;
    writer: string;
    createdAt: string;
  };
  pageInfo: {
    totalCnt: string;
    size: string;
    page: string;
    toatalPage: string;
  };
}
interface Mock {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface Argument {
  region: string;
  page?: number;
  sortedBy?: string;
}
//하나로 여러가지 메소드 실행
export class CRUDdata {
  url = '';
  constructor() {
    this.url = process.env.REACT_APP_HOST as string;
  }
  // async getCategoryKeyWord(keyword:string){
  //   return keyword === 'question' ? this.getQuestion
  // }
  //Promise<AxiosResponse<ReturnData>>
  //?category=${city}&page=${page}sortedBy=${sortedBy}`
  //city: string, page: string, sortedBy: string
  //   async getData(): Promise<AxiosResponse<Mock>> {
  //     const response = await axios.post(`${this.url}`, { username: 'dlwjddus16@naver.com', password: 'wjd123456!' });
  //     return response;
  //   }
  async getData(region: string, section: string): Promise<AxiosResponse<ReturnData>> {
    const response = await axiosInstance.get(section, {
      withCredentials: true,
      params: {
        category: region,
        page: 1,
        sortedBy: 'default',
      },
    });
    return response;
    // }
  }
}
// axios
//   .post(
//     'http://ec2-3-35-230-52.ap-northeast-2.compute.amazonaws.com:8080/members',
//     {

//       email: 'fsdassa16@naver.com',
//       password: 'wdsada123ds456!',
//       nickname: '뉸누느',

//     },
//     {
//       // headers: { 'Cache-Control': 'no-store' },
//       withCredentials: true,
//     },
//   )
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// export function useData (){

// axios
//   .post(
//     'http://ec2-3-35-230-52.ap-northeast-2.compute.amazonaws.com:8080/trip/login',
//     {
//       email: 'ddd@naver.com',
//       password: 'wjd2222!',
//     },
//     {
//       // headers: { 'Cache-Control': 'no-store' },
//       withCredentials: true,
//     },
//   )
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

axios
  .post(
    'http://ec2-3-35-230-52.ap-northeast-2.compute.amazonaws.com:8080/blog?category=부산&page=1&sortedBy=default',
    {
      memberId: 1,
      title: '갬성있는 식당 추천해주세요',
      content: '너무 비싸지 않은선에서 추천 부탁드려요 빵맛집이라면 더 좋습니다!',
      tag: '카페',
      category: '서울',
      image: 'fdsfdffff',
    },
    {
      // headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    },
  )
  .then(console.log)
  .catch(console.error);

function ss() {
  let num1;

  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도
      num1 = [lat, lon];
    });
  }
  return num1;
}
console.log(ss());
