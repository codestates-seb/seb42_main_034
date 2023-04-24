import { AnswerData } from 'redux/answer/answerslice';
import { BlogData, ListData, PageProps } from './../redux/boardDetails';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { axiosInstance } from './instance';
import useAPI from 'hooks/uesAPI';
import { SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  blogId?: string | number;
  tags: string | null;
  title: string;
  viewCnt: number;
  writer: string;
  content: string;
  likeCnt: string;
}
export interface BlogBoarData {
  createdAt: string;
  modifiedAt: string;
  blogId: number;
  tags: string | null;
  title: string;
  viewCnt: number;
  writer: string;
  content: string;
  likeCnt: string;
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
  tags?: string[] | undefined;
  tag?: string[] | undefined;
  content: string;
  image?: null | string;
}
//블로그 좋아요 쿼리 타입
export interface BlogDataQuery {
  blogId: number | string | undefined;
  isLike: boolean;
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
      if (section === 'blogs') {
        onUpdate(res.data.answers);
      } else {
        onUpdate(res.data.data);
      }
    });
  const postAnswerData = async (
    questionId: number | string | undefined,
    body: AnswerRequestBody,
    section: string,
  ): Promise<AxiosResponse<BoardData>> =>
    await api.post(`/${section}/answer/${questionId}`, body).then((res) => res.data.data);
  const putAnswerData = async (section: string, id: number | string, content: string) =>
    await api.patch(`/${section}/answer/${id}`, { content }).then((res) => {
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
// const SearchList = async () => {
//   await api.get(`/blogs/search?searchText=${searchData}&type=${}&page=`)
// };
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
export const useLike = () => {
  const api = useAPI();
  const seletedQuestion = async (answerId: number) => {
    await api.post(`questions/answer/select/${answerId}`).then((res) => {
      return res;
    });
  };
  const setLike = async (answerId: number) => {
    await api
      .post(`questions/answer/like/${answerId}`)
      .then((res) => {
        console.log('성공ㅇㅇ');
        console.log(res.config);
      })
      .catch((error) => {
        throw new Error('실패');
      });
  };
  const blogLikes = async (data: BlogDataQuery) => {
    const { blogId, isLike } = data;

    if (isLike) {
      await api.post(`/blog/unlike/${blogId}`);
    } else {
      await api.post(`/blog/like/${blogId}`);
    }
  };
  const blogUnLikes = async (blogId: number | string | undefined) => {
    await api.post(`/blogs/unlike/${blogId}`);
  };
  return { setLike, seletedQuestion, blogLikes, blogUnLikes };
};
export const useSearch = () => {
  const api = useAPI();
  const searchTag = async (text: string, section: string, page: number) => {
    await api.get(`/tags/${section}?tagName=${text}&page=${page}`);
  };

  return { searchTag };
};
export const queryKeys = {
  data: ['region'] as const,
  getData: (todoId: string) => ['todos', todoId] as const,
};
export default function useAddTodoMutation() {
  const { blogLikes, blogUnLikes } = useLike();
  const queryClient = useQueryClient();
  return useMutation(blogLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.data); // mutation을 성공하면 todo list를 불러오는 useQuery를 무효화 시킨다.
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

//대댓글
export const useReply = () => {
  const api = useAPI();

  const createReply = async (answerId: number, section: string, content: string) => {
    await api.post(`${section}/answer/comments/${answerId}`, { content });
  };
  const patchReply = async (commentId: number, section: string, content: string) => {
    await api.patch(`${section}/answer/comments/${commentId}`, { content });
  };
  const deleteReply = async (commentId: number, section: string) => {
    await api.delete(`${section}/answer/comments/${commentId}`);
  };
  return { createReply, patchReply, deleteReply };
};
