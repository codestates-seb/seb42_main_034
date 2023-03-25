import { BoxShadow, HoverAction } from 'component/style/cssTemplete';
import { Colors, Route, ScreenSize } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import { Icon } from 'component/ui/Icon';
import { IconPng } from 'component/ui/Icons';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as TalkIcon } from '../../image/talk.svg';
import Gsap from './Gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);
const Hover = styled.div`
  background: ${Colors.main_04_white};
  margin: auto;
  text-align: center;
  position: relative;
  width: ${ScreenSize.max_width};
  transition: all ease-in 400ms;
  margin-bottom: 10rem;
  border-radius: 4rem;
  -webkit-box-shadow: 5px 5px 0px 0px #289fed, 10px 10px 0px 0px #5fb8ff, 15px 15px 0px 0px #a1d8ff,
    20px 20px 0px 0px #cae6ff, 25px 25px 0px 0px #e1eeff, 17px 20px 14px 11px rgba(0, 0, 0, 0);
  box-shadow: 5px 5px 0px 0px #289fed, 10px 10px 0px 0px #5fb8ff, 15px 15px 0px 0px #a1d8ff, 20px 20px 0px 0px #cae6ff,
    25px 25px 0px 0px #e1eeff, 17px 20px 14px 11px rgba(0, 0, 0, 0);
  &:hover {
    opacity: 0.5;
  }
`;
const StyledBtn = styled(Button)`
  position: absolute;
  bottom: 9rem;
  right: 26rem;
  font-size: xx-large;
  background: ${Colors.button_blue};
  border: none;
  padding: 2rem;
  border-radius: 3rem;
  ${HoverAction}
  ${BoxShadow}
`;
const LandingFrame = styled.div`
  /* background: ${Colors.main_02}; */
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  color: ${Colors.text_black};
`;
export default function TopCard() {
  const main = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate(`${Route.home}`);
  };
  return (
    <Hover>
      <LandingFrame>
        <div className="first">현지인이 추천하는 찐 맛집, 여행지.</div>
        <div className="second">더 시간 낭비 하지마시고 질문글을 올려서 여행계획을 세우세요!</div>
      </LandingFrame>
      {/* <Icon svg={<TalkIcon />} /> */}
      <IconPng src={`/image/selfie.png`} className="first" />
      <StyledBtn className="topBtn" children="정보 얻으러 가기" onClick={handleBtnClick} />
    </Hover>
  );
}
