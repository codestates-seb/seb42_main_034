import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Props } from '../header/Logo';
import UserTab from './UserTab';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from 'component/style/variables';
import { Flex } from 'component/style/cssTemplete';
import Search from 'component/ui/Search';
import { useAppSelector } from 'redux/hooks';
import Searchbar from 'component/board/Searchbar';
const LogoStyle = styled(Logo)`
  width: 10rem;
  margin-left: 3rem;
  padding: 1rem;
  color: ${Colors.text_black};
`;
export default function Nav({ className }: Props) {
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const [login, setLogin] = useState(isLogin);
  useEffect(() => {
    setLogin(isLogin);
  }, [login]);
  return (
    <div className={className}>
      <Link to="/home">
        <LogoStyle />
      </Link>
      <Searchbar />
      <UserTab />
    </div>
  );
}
