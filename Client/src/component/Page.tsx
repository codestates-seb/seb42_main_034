import { ReturnData } from 'api/data';

import React from 'react';
import styled from 'styled-components';
import { Flex } from './style/cssTemplete';
import { FontSize } from './style/variables';
import { Button } from './ui/Button';

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
    else {
      onPage({ ...page, page: page - 1 });
    }
  };
  const total: number = Math.ceil(totalElements / size);

  const handleRightPage = () => {
    if (page === 1 || page === total) return;
    else {
      onPage({ ...page, page: page + 1 });
    }
  };
  return (
    <Flex width="100%" justify="space-between">
      <Ul>
        <StyledBtn children="<" onClick={handleLeftPage} />

        {total > 0 ? (
          Array(total)
            .fill('d')
            .map((page, idx) => (
              <li
                key={idx}
                onClick={() => {
                  if (total) onPage({ ...page, page: idx + 1 });
                }}
              >
                <StyledBtn children={idx + 1} />
              </li>
            ))
        ) : (
          <StyledBtn children={1} />
        )}
        <li>
          <StyledBtn children=">" onClick={handleRightPage} />
        </li>
      </Ul>
    </Flex>
  );
}
const Ul = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const StyledBtn = styled(Button)`
  border: none;
  font-size: ${FontSize.sm};
`;
