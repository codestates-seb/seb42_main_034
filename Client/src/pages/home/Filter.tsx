import { Colors } from 'component/style/variables';
import { BoxShadow, ButtonTheme, HoverAction } from 'component/style/cssTemplete';
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
  // const { isLoading, error, data: city } = useQuery([filter], async () => await new CRUDdata().getData(citys.city)); //여기에 해당지역넣기
  // dd.getData().then(console.log).catch(console.error);
  const navigate = useNavigate();
  const [data, setData] = useState('');
  useEffect(() => {
    setState(filter);
  }, []);
  const handleBtnClick = () => {
    //해당지역으로이동
    // console.log(city);
    navigate(`/board/boardlist/questions/${citys.city}`, { state: citys.city });
  };

  return (
    <>
      {/* 버튼 호버했을때 글자 나오기 호버 안했을때는 이름 사진만 */}
      <RegionButton url={citys.url} onClick={handleBtnClick}>
        <div>{citys.city}</div>
        {/* <img src={citys.url} /> */}
        <div>{citys.content}</div>
      </RegionButton>
    </>
  );
}
const Absolute = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  &:hover {
    div {
      display: block;
    }
    div & {
      display: block;
    }
  }
`;
const Picture = styled.div<{ display: string }>`
  display: ${(props) => props.display};
`;
const RegionButton = styled(Button)<{ url: string }>`
  z-index: 0;
  background: none;
  border: none;
  margin: 1em;
  background-image: ${(props) => props.url && `url(${props.url})`};
  background-repeat:no-repeat;
  ${HoverAction}
  ${BoxShadow}
  font-size: 1.3rem;
  border-radius: 1rem;
  padding: 0.5rem;
  padding-top: 0.6rem;
  &:hover {
    cursor: pointer;
    background
  }
`;
