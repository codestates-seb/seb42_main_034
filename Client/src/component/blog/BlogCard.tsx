import { Flex, HoverAction } from 'component/style/cssTemplete';
import { Colors, FontSize } from 'component/style/variables';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BlogData, ListData } from 'redux/boardDetails';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { GrFormView } from 'react-icons/gr';
import { StyledTag } from 'component/style/ui/tagStyle';
export default function BlogCard({ city, region }: { city: BlogData; region: string }) {
  const navigate = useNavigate();
  const ss = useLocation();

  const handleClick = () => {
    navigate(`/board/blogsdetails/${city.blogId}`, { state: city });
  };
  console.log(city);

  return (
    <Card onClick={handleClick}>
      <CardImg src={`https://picsum.photos/250/${city.blogId}0`} />
      <CardBottom>
        <div>{city && city.tags.map((tag, idx) => <StyledTag key={idx}>#{tag}</StyledTag>)}</div>
        <div className="title">{city.title}</div>
        <WriterAndAcreateAtDiv>
          <div>{city.writer}</div>
          <div className="dateColor">{dayjs(city.createdAt).format('YYYY-MM-DD')}</div>
        </WriterAndAcreateAtDiv>
        <IconsDiv>
          <Flex>
            <GrFormView />
            {city.viewCnt}
          </Flex>
          <div>{`❤${city.likeCnt}`}</div>
          <div>{`💬${city.commentCnt}`}</div>
        </IconsDiv>
      </CardBottom>
    </Card>
  );
}
const Card = styled.li`
  margin: 2rem;
  list-style: none;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 1rem;
  ${HoverAction}
  &:hover {
    cursor: pointer;
  }
  .title {
    font-weight: bold;
    font-size: ${FontSize.lg};
  }
`;
const CardImg = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 0.3rem;
`;
const CardBottom = styled.div`
  height: 50%;
  padding: 0.5rem;
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: space-between;
`;
const WriterAndAcreateAtDiv = styled.div`
  font-size: ${FontSize.md};
  text-align: end;
  .dateColor {
    color: ${Colors.text_grey};
  }
`;
const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  font-size: ${FontSize.sm};
`;
