import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import BoardDetail from '../component/board/BoardDetail';

import { BoardData, CRUDdata, getFilterData, useGetData } from 'api/data';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'redux/hooks';

import Answer from 'component/question/Answer';
import { MoveBtn } from './QuestionBoardList';
import { Flex } from 'component/style/cssTemplete';

export default function QuestionDetails() {
  const data: BoardData = useLocation().state;
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();
  const { deleteBoardData } = useGetData();
  const { id } = useParams() as { id: string };
  const questionId = Number(id);
  console.log();

  const { getBoardData, getAnswerData } = useGetData();
  const {
    isLoading,
    error,
    data: detail,
  } = useQuery(['region', data] as const, async () => await getBoardData(questionId, 'questions'), {
    staleTime: 1000 * 15,
  });
  // useEffect(() => {
  //   getAnswerData(data.questionId, 'questions').catch(console.error);
  // });
  console.log(detail);

  return (
    <>
      {detail && detail.memberId === memberId && (
        <Flex justify="end" width="90%" gap="2rem">
          <MoveBtn
            children="수정"
            onClick={() => {
              navigate(`/board/modifyquestion/${questionId}`, { state: { detail } });
            }}
          />
          <MoveBtn
            children="삭제"
            onClick={() => {
              deleteBoardData(questionId, memberId, 'questions')
                .then((res) => {
                  navigate(-1);
                })
                .catch(console.error);
            }}
          />
        </Flex>
      )}
      <div>질문 </div>
      {isLoading && <div>로딩중..</div>}
      {detail && (
        <>
          <BoardDetail detail={detail} section="questions" />
          <Answer questionId={questionId} writerId={detail.memberId} />
        </>
      )}
    </>
  );
}
