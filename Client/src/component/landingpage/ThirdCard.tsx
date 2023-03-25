import { Absolute, Border } from 'component/style/cssTemplete';
import { Colors, FontSize } from 'component/style/variables';
import { Icon } from 'component/ui/Icon';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Monitor } from '../../image/monitor.svg';
const Div = styled.div`
  text-align: center;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;
const Line = styled.div`
  border-top: 2px solid black;
  width: 7rem;
  position: absolute;
  top: 0;
  /* width: 30rem; */
`;
const Font = styled.div`
  .h2 {
    color: ${Colors.text_green};
    font-size: ${FontSize.h2};
    margin-bottom: 0.8rem;
  }
`;
export default function ThirdCard() {
  return (
    <Div>
      {' '}
      <Icon svg={<Monitor />} />
      <Line />
      <Absolute>카테고리별검색</Absolute>
      <Font>
        <div className="h2">지역별로 다양한 여행지 정보들을 확인해보세요</div>
        <div>카테고리를 이용해서 채택이 완료 된 답변들을 검색 할 수 있습니다.</div>
      </Font>
    </Div>
  );
}
