import Modal from 'component/ui/Modal';
import ScrollTop from 'component/ui/ScrollTop';
import SignIn from 'pages/user/SignIn';
import SignUp from 'pages/user/SignUp';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from './component/ui/Layout';
import { useMypageAPI } from 'api/mypage';
import { useAppSelector } from 'redux/hooks';
const FixOutletHeight = styled.div<{ landingPage?: string }>`
  min-height: 100%;
`;
export default function App() {
  const [showButton, setShowButton] = useState(false);
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const { getMyInfo } = useMypageAPI();
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return null;
  };
  useEffect(() => {
    handleScroll();
    getMyInfo();
  }, [isLogin]);
  return (
    <Layout>
      <FixOutletHeight>
        <Outlet />
      </FixOutletHeight>
    </Layout>
  );
}
