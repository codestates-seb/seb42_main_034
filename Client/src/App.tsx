import Modal from 'component/ui/Modal';
import ScrollTop from 'component/ui/ScrollTop';
import SignIn from 'pages/user/SignIn';
import SignUp from 'pages/user/SignUp';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from './component/ui/Layout';

const FixOutletHeight = styled.div<{ landingPage?: string }>`
  min-height: 100%;
`;
export default function App() {
  const [showButton, setShowButton] = useState(false);
  const { pathname } = useLocation();
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return null;
  };
  useEffect(() => {
    handleScroll();
  }, [pathname]);
  return (
    <Layout>
      <FixOutletHeight>
        <Outlet />
      </FixOutletHeight>
    </Layout>
  );
}
