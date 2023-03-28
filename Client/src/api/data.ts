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

