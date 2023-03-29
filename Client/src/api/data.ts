import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { axiosInstance } from './instance';
import useAPI from 'hooks/uesAPI';

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
export interface BoardData {
  createdAt: string;
  modifiedAt: string;
  questionId: string | number;
  tags: string;
  title: string;
  viewCnt: number;
  writer: string;
  content?: string;
}
interface Argument {
  region: string;
  page?: number;
  sortedBy?: string;
}
interface AnswerRequestBody {
  memberId: number | string;
  content: string;
}
//하나로 여러가지 메소드 실행
export class CRUDdata {
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
  }
}
export const useGetData = () => {
  const api = useAPI();
  const getBoardData = async (questionId: number | string): Promise<AxiosResponse<BoardData>> =>
    await api.get(`/questions/${questionId}`).then((res) => res.data);
  const deleteBoardData = async (
    questionId: number | string,
    memberId: number | string,
  ): Promise<AxiosResponse<BoardData>> =>
    await api.delete(`/questions/${questionId}?memberId=${memberId}`).then((res) => res.data);

  const getAnswerData = async (questionId: number | string): Promise<AxiosResponse<BoardData>> =>
    await api.get(`/questions/answer/${questionId}?page=1&sortedBy=hot`).then((res) => res.data.data);
  const postAnswerData = async (
    questionId: number | string,
    body: AnswerRequestBody,
  ): Promise<AxiosResponse<BoardData>> =>
    await api.post(`/questions/answer/${questionId}`, body).then((res) => res.data.data);
  const putAnswerData = async (questionId: number | string): Promise<AxiosResponse<BoardData>> =>
    await api.patch(`/questions/answer/${questionId}`).then((res) => res.data.data);
  const deleteAnswerData = async (questionId: number | string): Promise<AxiosResponse<BoardData>> =>
    await api.delete(`/questions/answer/${questionId}`);

  const putBoardData = async (questionId: number | string): Promise<AxiosResponse<BoardData>> =>
    await api.patch(`/questions/answer/${questionId}?page=1&sortedBy=hot`).then((res) => res.data.data);
  return { getBoardData, deleteBoardData, getAnswerData, deleteAnswerData, putAnswerData, postAnswerData };
};
export function getDate(date: string) {
  const formatDate = new Date(date);
  return formatDate;
}
