import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../../image/travel.svg';
import { Icon } from '../ui/Icon';
export type Props = {
  svg?: React.ReactNode;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
};
const LogoLink = styled.div`
  display: flex;
  align-items: center;
`;
const LogoImg = styled(Icon)<{ svg: React.ReactNode }>`
  position: relative;
  z-index: 1;
  opacity: 0.4;
  box-shadow: 1rem;
`;
//로고크기 줄이기
export const Logo: React.FC = () => {
  return (
    <Link to="/">
      <LogoLink>
        <LogoImg svg={<LogoIcon />}></LogoImg>
        <span className="logo">여기 가봤니?</span>
      </LogoLink>
    </Link>
  );
};
