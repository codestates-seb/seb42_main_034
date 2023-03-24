import { RegionInfo } from 'pages/Home';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import QuestionList from 'pages/question/QuestionList';
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
//하나로 여러가지 메소드 실행
export class CRUDdata {
  url = '';
  constructor() {
    this.url = 'https://jsonplaceholder.typicode.com/todos';
  }

  //Promise<AxiosResponse<ReturnData>>
  //?category=${city}&page=${page}sortedBy=${sortedBy}`
  //city: string, page: string, sortedBy: string
  //   async getData(): Promise<AxiosResponse<Mock>> {
  //     const response = await axios.post(`${this.url}`, { username: 'dlwjddus16@naver.com', password: 'wjd123456!' });
  //     return response;
  //   }
  async getData(): Promise<AxiosResponse<Mock>> {
    const response = await axios.get(
      `${this.url}`,

      // {
      //   username: 'dlwjddus16@naver.com',
      //   password: 'wjd123456!',
      // },
      // {
      //   // headers: { 'Cache-Control': 'no-cache' },
      //   withCredentials: true,
      // },
    );
    return response;
  }
}
// axios
//   .post(
//     'http://ec2-3-35-230-52.ap-northeast-2.compute.amazonaws.com:8080/members',
//     {
//       email: 'sdaddss16@naver.com',
//       password: 'wjd123d456!',
//       nickname: '뉸누dd',
//       location: '경주',
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
  .get(
    'http://ec2-3-35-230-52.ap-northeast-2.compute.amazonaws.com:8080/questions?category=dd&page=1&sortedBy=default',
    //  {
    //   memberId: 1,
    //   title: '갬성있는 식당 추천해주세요',
    //   content: '너무 비싸지 않은선에서 추천 부탁드려요 빵맛집이라면 더 좋습니다!',
    //   tag: '카페',
    //   category: '부산',
    // })
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
