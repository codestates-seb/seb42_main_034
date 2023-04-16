import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFilterData, ReturnData } from 'api/data';
import { Flex, HoverAction, Relative } from 'component/style/cssTemplete';
import { Button } from 'component/ui/Button';
import styled from 'styled-components';
import { Colors } from 'component/style/variables';
import useAPI from 'hooks/uesAPI';
import { useAppDispatch } from 'redux/hooks';
import QuestionList from './QuestionList';
export const section: string[] = ['questions', 'blogs'];
export default function QuestionBoardList() {
  const navigate = useNavigate();
  const localFilter = getFilterData();
  // const city = useAppSelector((state) => state.boardDetail);
  const [filter, setFilter] = useState(localFilter);
  // const {
  //   isLoading,
  //   error,
  //   data: city,
  // } = useQuery([filter, 'region'] as const, async () => await new CRUDdata().getData('project', filter), {
  //   staleTime: 1000 * 15,
  // }); //여기에 해당지역넣기
  const handleClick = (section: string) => {
    setFilter(section);
    navigate(`/board/boardlist/${section}`);
  };

  // 블로그 버튼을 누르면 해당 블로그로 데이터 get 함 -> 필터를 바꿔야 useEffect로 다시 받아올수있음
  /**구성요소 달라서 블로그랑 질문 나눌거임
   * 그럼 어떻게 해야할까
   * 질문 / 블로그 필터를 만듦
   * 그에맞게 맞는 페이지로 넘김
   */
  return (
    <Flex direction="column" width="100%" height="900px">
      <Relative>
        {section.map((filter, idx) => (
          <StyledCategoryBtn
            key={idx}
            children={filter === 'blogs' ? '블로그' : '질문'}
            onClick={() => {
              handleClick(filter);
            }}
          />
        ))}
        <PostBtn
          children="글 작성하기"
          onClick={() => {
            navigate(`/board/${filter}post`);
          }}
        />
      </Relative>

      <div>{filter === 'questions' ? '질문' : '블로그'}을(를) 작성하고 목록을 확인할수있는 곳 입니다</div>

      <QuestionList filter={filter} />
    </Flex>
  );
}
export const MoveBtn = styled(Button)<{ width?: string; height?: string; display?: string }>`
  background: ${Colors.button_blue};
  width: ${(props) => props.width};
  display: ${(props) => props.display};
  height: ${(props) => props.height};
  font-size: 1rem;
  ${HoverAction}
  margin: 1rem;
  border-radius: 1rem;
`;
const PostBtn = styled(MoveBtn)`
  top: 1em;
  right: 3em;
  width: 8rem;
  position: absolute;
`;
export const StyledCategoryBtn = styled(Button)`
  background: none;
  font-size: 2rem;
  margin: 0.7rem;
  border: none;
  border-bottom: 7px solid ${Colors.button_blue};
  margin-top: 0;
  margin-right: 0.6rem;
  ${HoverAction}
`;
