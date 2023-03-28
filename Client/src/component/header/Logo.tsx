import useAPI from 'hooks/uesAPI';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../../image/travel.svg';
import { HoverAction } from '../style/cssTemplete';
import { Icon } from '../ui/Icon';
//이것도 따로 옮겨야할듯
export type Props = {
  svg?: React.ReactNode;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
  children?: string;
  src?: string;
};
const LogoLink = styled.div<{ nav?: number }>`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.nav}rem;
  .logo {
    position: absolute;
    z-index: 0;
  }
`;
const LogoImg = styled(Icon)<{ svg: React.ReactNode }>`
  position: relative;
  z-index: 1;
  opacity: 0.4;
  box-shadow: 1rem;
`;

//로고크기 줄이기
export const Logo: React.FC = ({ className }: Props) => {
  return (
    <LogoLink className={className}>
      <LogoImg svg={<LogoIcon className="img" />}></LogoImg>
      <span className="logo">여기 와 봤니?</span>
    </LogoLink>
  );
};
