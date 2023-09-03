import { MoveBtn } from 'pages/QuestionBoardList';
import React, { useState } from 'react';
import styled from 'styled-components';

export default function MyPostTab({
  text,
  activeIdx,
  clickIdx,
  onActiveIdx,
}: {
  text: string;
  activeIdx: number;
  clickIdx: number;
  onActiveIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const handleTabClick = (index: number) => {
    onActiveIdx(index);
    setSelectedTab(index);
  };

  return (
    <TabStyled
      onClick={() => {
        handleTabClick(clickIdx);
      }}
      isSelected={clickIdx === activeIdx}
    >
      {text}
    </TabStyled>
  );
}

const TabStyled = styled(MoveBtn)<{ isSelected: boolean }>`
  width: 200px;
  height: 2.5rem;
  position: relative;
  display: inline-block;
  height: 2.5rem;
  font-size: 14px;
  color: ${(props) => props.isSelected && 'black'};
  text-decoration: none;
  overflow: hidden;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 10px;
  background: ${(props) => props.isSelected && 'white'};
  padding: 12px 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #0583c6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #0583c6, 0 0 25px #0583c6, 0 0 50px #0583c6, 0 0 100px #0583c6;
  }
`;
