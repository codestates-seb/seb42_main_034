import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Button() {
  return (
    <LinkWrapper to="/board/questions">
      <ButtonWrapper>Create</ButtonWrapper>
    </LinkWrapper>
  );
}

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

export const ButtonWrapper = styled.button`
  width: 110px;
  height: 105px;
  font-size: var(--font-size-md);
  border: none;
  border-radius: 10px;
  background-color: var(--button-001);
  color: var(--button-text);
  &:active {
    background-color: var(--button-clicked);
  }
`;
