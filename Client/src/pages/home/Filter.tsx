import { FontSize } from 'component/style/variables';
import { BoxShadow } from 'component/style/cssTemplete';
import { RegionInfo } from 'pages/Home';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Filter({
  citys,
  setState,
  filter,
}: {
  citys: RegionInfo;
  region?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
}): JSX.Element {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  useEffect(() => {
    setState(filter);
  }, []);
  const handleBtnClick = () => {
    //해당지역으로이동

    navigate(`/board/boardlist/questions/${citys.city}`, { state: citys.url });
  };

  return (
    <>
      {/* 버튼 호버했을때 글자 나오기 호버 안했을때는 이름 사진만 */}
      <RegionButton url={citys.url} onClick={handleBtnClick}>
        <div className="cardTitle">{citys.city}</div>
        <ContentFont className="cardFont" display="none">
          {citys.content}
        </ContentFont>
      </RegionButton>
    </>
  );
}

const RegionButton = styled(Button)<{ url: string }>`
  background: none;
  border: none;
  margin: 1em;
  position: relative;
  border-radius: 1rem;
  ${BoxShadow}
  font-size: 1.3rem;
  transition: all 1s ease-out;
  padding: 0.5rem;
  padding-top: 0.6rem;

  &:hover {
    cursor: pointer;

    ::before {
      opacity: 0.6;
      background-size: 150%;
      background-position: center;
    }
    .cardTitle {
      font-size: ${FontSize.lg};
      margin-bottom: 1em;
    }
    .cardFont {
      display: block;
    }
  }

  .cardTitle {
    font-size: ${FontSize.h2};
    font-weight: bold;
    position: relative;
  }
  ::before {
    content: '';
    transition: all 1s ease-out;
    background-image: ${(props) => props.url && `url(${props.url})`};
    background-size: cover;
    position: absolute;
    border-radius: 1rem;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;
const ContentFont = styled.div<{ display: string }>`
  font-size: ${FontSize.md};
  position: relative;
  display: ${(props) => props.display};
  &:hover {
    display: block;
  }
`;
