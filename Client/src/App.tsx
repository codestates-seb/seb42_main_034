import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ScreenSize } from './component/style/variables';
import { Layout } from './component/ui/Layout';

const FixOutletHeight = styled.div<{ landingPage?: string }>`
  min-height: ${ScreenSize.middle_height};
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
        <ScrollTop />
      </FixOutletHeight>
    </Layout>
  );
}
