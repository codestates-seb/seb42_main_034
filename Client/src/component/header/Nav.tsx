import React from 'react';
import { Logo } from './Logo';
import { Props } from '../header/Logo';
import UserTab from './UserTab';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from 'component/style/variables';
import { Flex } from 'component/style/cssTemplete';
import Search from 'component/ui/Search';
const LogoStyle = styled(Logo)`
  transform: scale(1.6);
  width: 10rem;
  margin-left: 3rem;
  padding: 1rem;
  color: ${Colors.text_black};
`;
export default function Nav({ className }: Props) {
  return (
    <div className={className}>
      <Link to="/home">
        <LogoStyle />
      </Link>
      <Search />
      <UserTab />
    </div>
  );
}
