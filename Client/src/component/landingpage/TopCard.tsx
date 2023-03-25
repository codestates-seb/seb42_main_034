import { Absolute, BoxShadow, HoverAction } from 'component/style/cssTemplete';
import { Colors, Route, ScreenSize } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import { Icon } from 'component/ui/Icon';
import { IconPng } from 'component/ui/Icons';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as Message } from '../../image/message.svg';
import { ReactComponent as Comments } from '../../image/comments.svg';
import Gsap from './Gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);
const Hover = styled.div`
  margin: auto;
  text-align: center;
  position: relative;
  /* margin-bottom: 10rem; */
  width: ${ScreenSize.max_width};
  transition: all ease-in 400ms;
  margin-bottom: 7rem;
  border-radius: 4rem;
  -webkit-box-shadow: 5px 5px 0px 0px #289fed, 10px 10px 0px 0px #5fb8ff, 15px 15px 0px 0px #a1d8ff,
    20px 20px 0px 0px #cae6ff, 25px 25px 0px 0px #e1eeff, 17px 20px 14px 11px rgba(0, 0, 0, 0);
  box-shadow: 5px 5px 0px 0px #289fed, 10px 10px 0px 0px #5fb8ff, 15px 15px 0px 0px #a1d8ff, 20px 20px 0px 0px #cae6ff,
    25px 25px 0px 0px #e1eeff, 17px 20px 14px 11px rgba(0, 0, 0, 0);
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
const MessgeAbsolute = styled(Absolute)`
  z-index: 4;
  top: 19rem;
  left: 0.6rem;
  font-size: 1.8rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;
const ResizeMessageIcon = styled(Message)`
  width: 20rem;
`;
const MessageIconAbsolute = styled(Absolute)`
  z-index: 0;
  min-width: 20rem;
  top: -4rem;
  right: -1rem;
  max-width: 10rem;
  max-height: 13rem;
  display: flex;
`;
const Comment = styled(IconPng)`
  position: absolute;
  top: 10rem;
  left: 26rem;
  width: 6rem;
  z-index: 0;
`;
const SelfieIcon = styled(IconPng)`
  z-index: -1;
`;
export default function TopCard() {
  const main = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate(`${Route.home}`);
  };

  return (
    <Hover className="slide1">
      <LandingFrame>
        <div>실제 거주하는 현지인이 추천하는 여행지.</div>
        <div className="top1">궁금하신 지역에 질문글을 올려서 여행계획을 세우세요!</div>
      </LandingFrame>
      {/* <Absolute left={10}> */}
      <MessageIconAbsolute className="top2">
        <Icon svg={<ResizeMessageIcon />} />
        <MessgeAbsolute>대전 oo동 맛집이 어디인가요?</MessgeAbsolute>
      </MessageIconAbsolute>
      <Comment className="top2" src={'/image/comments.png'} />
      {/* </Absolute> */}
      {/* <Icon svg={<TalkIcon />} /> */}
      <SelfieIcon src={`/image/selfie.png`} className="top3" />
      <StyledBtn className="third" children="정보 얻으러 가기" onClick={handleBtnClick} />
    </Hover>
  );
}
