import { Flex } from 'component/style/cssTemplete';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SiteInfo() {
  return (
    <div>
      <Div>2023 SEB_42_MAIN_PROPJECT</Div>
      <Flex gap="7px">
        <Link to="/">기업광고문의</Link>
        <Link to="/">이용약관</Link>
        <Link to="/">개인정보처리방침</Link>
      </Flex>
    </div>
  );
}
const Div = styled.div`
  margin-bottom: 5em;
`;
