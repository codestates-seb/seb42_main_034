import { AnswerData } from 'redux/answer/answerslice';
import { BlogData, ListData, PageProps } from './../redux/boardDetails';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { axiosInstance } from './instance';
import useAPI from 'hooks/uesAPI';
import { SetStateAction } from 'react';

axios.defaults.withCredentials = true;
interface QuestionList {
  url: string;
  city: string;
  page: string;
  sortedBy: string;
}
//질문 블로그 두개 타입 합치는방법 있을까효
export interface ReturnData {
  [key: string]: any;
  data: ListData[] | [];
  pageInfo: PageProps;
}
export interface BlogReturnData {
  [key: string]: any;
  data: BlogData[] | [];
  pageInfo: PageProps;
}
export interface BoardData {
  createdAt: string;
  modifiedAt: string;
  questionId?: string | number | undefined;
  blogId?: string | number | undefined;
  tags: string | null;
  title: string;
  viewCnt: number;
  writer: string;
  content: string;
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
interface PatchBody {
  title: string;
  tag: string | null;
  content: string;
  image: null | string;
}
//중복사용되는 api는 훅으로 사용
export const useGetData = () => {
  const api = useAPI();
  const getData = async (region: string, section: string, page: number): Promise<AxiosResponse<ReturnData>> => {
    const response = await axiosInstance.get(section, {
      withCredentials: true,
      params: {
        category: encodeURIComponent(region),
        page: page,
        sortedBy: 'default',
      },
    });
    return response;
  };
  const getBoardData = async (id: number | string | undefined, filter: string) =>
    await api.get(`/${filter}/${id}`).then((res) => res.data.data);
  const deleteBoardData = async (
    questionId: number | string | undefined,
    memberId: number | string,
    filter: string,
  ): Promise<AxiosResponse<BoardData>> =>
    await api.delete(`/${filter}/${questionId}?memberId=${memberId}`).then((res) => res.data);

  const getAnswerData = async (
    questionId: number | string | undefined,
    section: string,
    onUpdate: React.Dispatch<React.SetStateAction<[] | AnswerData[]>>,
  ) =>
    await api.get(`/${section}/answer/${questionId}?page=1&sortedBy=hot`).then((res) => {
      onUpdate(res.data.answers);
      return res.data.answers;
    });
  const postAnswerData = async (
    questionId: number | string | undefined,
    body: AnswerRequestBody,
    section: string,
  ): Promise<AxiosResponse<BoardData>> =>
    await api.post(`/${section}/answer/${questionId}`, body).then((res) => res.data.data);
  const putAnswerData = async (section: string, id: number | string, content: string) =>
    await api.patch(`/${section}/answer/${id}`, { content }).then((res) => {
      console.log(res);

      return res;
    });

  const deleteAnswerData = async (section: string, id: number | string): Promise<AxiosResponse<BoardData>> =>
    await api.delete(`/${section}/answer/${id}`);

  const putBoardData = async (section: string, id: number | string, body: PatchBody) =>
    await api.patch(`/${section}/${id}`, body).then((res) => {
      console.log(res);

      return res;
    });
  return {
    putBoardData,
    getData,
    getBoardData,
    deleteBoardData,
    getAnswerData,
    deleteAnswerData,
    putAnswerData,
    postAnswerData,
  };
};
export function getDate(date: string) {
  const formatDate = new Date(date);
  return formatDate;
}
export function getFilterData() {
  const isFiltered = localStorage.getItem('filter');
  if (isFiltered) {
    return JSON.parse(isFiltered);
  }
}
