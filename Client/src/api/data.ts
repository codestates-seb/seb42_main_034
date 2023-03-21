import { RegionInfo } from 'pages/Home';
import axios, { AxiosResponse } from 'axios';
import QuestionList from 'pages/question/QuestionList';
interface QuestionList {
  url: string;
  city: string;
  page: string;
  sortedBy: string;
}
interface returnData {
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
//하나로 여러가지 메소드 실행
class CRUDdata {
  url = '';
  constructor(url: string) {
    this.url = url;
  }
  getData(url: string, city: string, page: string, sortedBy: string) {
    return axios.get(`${this.url}?category=${city}&page=${page}sortedBy=${sortedBy}`);
  }
}
