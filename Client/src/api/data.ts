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
  [key: string]: any;
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
    return response.data;
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

// axios
//   .get(
//     encodeURI(
//       `http://ec2-3-35-230-52.ap-northeast-2.compute.amazonaws.com:8080/blog?category=부산&page=1&sortedBy=hot`,
//     ),
//     // {
//     //   memberId: '1',
//     //   category: '바다',
//     //   title: '안녕하세요ㅠㅠㅠㅠ',
//     //   content: '돼주라 제발!',
//     //   tags: ['바다', '산'],
//     // },
//     {
//       headers: { 'Accept-Encoding': 'deflate, br' },
//       withCredentials: true,
//     },
//   )
//   .then(console.log)
//   .catch(console.error);
