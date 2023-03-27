import { RegionInfo } from 'pages/Home';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import QuestionList from 'pages/question/QuestionList';

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
    const response = await axios.post(
      `${this.url}`,

      {
        username: 'dlwjddus16@naver.com',
        password: 'wjd123456!',
      },
      {
        // headers: { 'Cache-Control': 'no-cache' },
        withCredentials: true,
      },
    );
    return response;
  }
}
