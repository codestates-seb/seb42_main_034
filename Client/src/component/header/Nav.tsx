import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Props } from '../header/Logo';
import UserTab from './UserTab';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from 'component/style/variables';
import { useAppSelector } from 'redux/hooks';
import Modal from 'component/ui/Modal';
import SignIn from 'pages/user/SignIn';
const LogoStyle = styled(Logo)`
  width: 10rem;
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
      <Modal children={<SignIn />}></Modal>
      <Link to="/home">
        <LogoStyle />
      </Link>
      <UserTab />
    </div>
  );
}
