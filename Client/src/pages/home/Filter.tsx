import { Colors, Route } from 'component/style/variables';
import { BoxShadow, ButtonTheme, HoverAction } from 'component/style/cssTemplete';
import { RegionInfo } from 'pages/Home';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';
import { CRUDdata, ReturnData } from 'api/data';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
const RegionButton = styled(Button)`
  z-index: 0;
  /* ${ButtonTheme} */
  border: none;
  background: ${Colors.main_02};
  color: ${Colors.main_04_white};
  ${HoverAction}
  ${BoxShadow}
  position: absolute;
  font-size: 1.3rem;
  border-radius: 1.7rem;
  padding: 0.5rem;
  padding-top: 0.6rem;
`;

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
    navigate('/board/questionlist', { state: citys.city });
  };

  return (
    <RegionButton
      children={citys.city}
      className=""
      onClick={handleBtnClick} //경로랑
      style={{ left: `${citys.x}em`, top: `${citys.y}em` }}
    />
  );
}
