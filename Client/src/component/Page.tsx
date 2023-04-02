import { ReturnData } from 'api/data';
import { StyledCategoryBtn } from 'pages/question/BoardList';
import React from 'react';
import styled from 'styled-components';
import { Flex, HoverAction, Relative } from './style/cssTemplete';
import { Colors } from './style/variables';
import { Button, IButtonProps } from './ui/Button';

export default function Page({
  pages,
  onPage,
}: {
  pages: Partial<ReturnData>;
  onPage: React.Dispatch<
    React.SetStateAction<{
      page: number;
      totalElements: number;
      totalPages: number;
      size: number;
    }>
  >;
}) {
  const { page, totalElements, totalPages, size } = pages;
  const handleLeftPage = () => {
    if (page === 1) return;
    onPage({ ...page, page: page - 1 });
  };
  const total: number = Math.ceil(totalElements / size);

  const handleRightPage = () => {
    if (page === total) return;
    onPage({ ...page, page: page + 1 });
  };
  return (
    <Flex width="100%" justify="space-between">
      <Ul>
        <StyledBtn children="<" onClick={handleLeftPage} />

        {Array(total)
          .fill('d')
          .map((page, idx) => (
            <li key={idx} onClick={() => onPage({ ...page, page: idx + 1 })}>
              <StyledBtn children={idx + 1} />
            </li>
          ))}

        <StyledBtn children=">" onClick={handleRightPage} />
      </Ul>
    </Flex>
  );
}
const StyledBtn = styled(Button)`
  background: none;
  border: 3px solid ${Colors.main_02};
  width: 3rem;
  height: 3rem;

  ${HoverAction}
`;
const Ul = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
