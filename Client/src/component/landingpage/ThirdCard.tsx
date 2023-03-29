import { Absolute } from 'component/style/cssTemplete';
import { Colors, FontSize, Route } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import { Icon } from 'component/ui/Icon';
import { MoveBtn } from 'pages/question/BoardList';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Monitor } from '../../image/monitor.svg';
const Div = styled.div`
  text-align: center;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
`;
const Line = styled.div`
  border-top: 2px solid black;
  width: 7rem;
  transform: skewY(333deg);
  margin-top: 3rem;
  /* width: 30rem; */
`;
const Font = styled.div`
  .h2 {
    color: ${Colors.text_grey};
    font-size: ${FontSize.h1};
  }
  .h3 {
    font-size: ${FontSize.h3};
    margin-bottom: 2rem;
  }
  .font {
    font-size: 2rem;
  }
`;
const PointCategory = styled(Absolute)`
  top: 0;
  right: 50%;
  display: flex;
  align-items: center;
`;

export default function ThirdCard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${Route.signin}`);
  };
  return (
    <Div className="slide3">
      {' '}
      <Icon svg={<Monitor />} />
      <PointCategory className="third1">
        <Line />
        <div>카테고리별검색</div>
      </PointCategory>
      <Font>
        <div className="h2 third2">지역별로 다양한 여행지 정보들을 확인해보세요</div>
        <div className="h3">카테고리를 이용해서 채택이 완료 된 답변들을 검색 할 수 있습니다.</div>
        <MoveBtn
          className="font"
          children="지금가입하고 이용 해보세요!"
          onClick={() => {
            handleClick();
          }}
        />
      </Font>
    </Div>
  );
}
