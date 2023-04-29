import { Absolute, BoxShadow, HoverAction } from 'component/style/cssTemplete';
import { Colors, FontSize, Route, ScreenSize } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import { Icon } from 'component/ui/Icon';
import { IconPng } from 'component/ui/Icons';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as Message } from '../../image/message.svg';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

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
const Hover = styled.div`
  margin: auto;
  margin-top: 3em;
  text-align: center;
  position: relative;
  /* margin-bottom: 10rem; */
  width: 90%;
  transition: all ease-in 400ms;
  margin-bottom: 20rem;
  border-radius: 4rem;
  -webkit-box-shadow: 5px 5px 0px 0px #289fed, 10px 10px 0px 0px #5fb8ff, 15px 15px 0px 0px #a1d8ff,
    20px 20px 0px 0px #cae6ff, 25px 25px 0px 0px #e1eeff, 17px 20px 14px 11px rgba(0, 0, 0, 0);
  box-shadow: 5px 5px 0px 0px #289fed, 10px 10px 0px 0px #5fb8ff, 15px 15px 0px 0px #a1d8ff, 20px 20px 0px 0px #cae6ff,
    25px 25px 0px 0px #e1eeff, 17px 20px 14px 11px rgba(0, 0, 0, 0);
`;
const StyledBtn = styled(Button)`
  position: absolute;
  top: 26em;
  left: 25em;
  width: 10em;
  height: 3em;
  font-size: ${FontSize.md};
  background: ${Colors.button_blue};
  border: none;
  padding: 2rem;
  border-radius: 3rem;
  span {
    position: absolute;
    top: 1em;
    left: 1.2em;
  }
  ${HoverAction}
  ${BoxShadow}
`;
const LandingFrame = styled.div`
  /* background: ${Colors.main_02}; */
  display: block;
  font-size: ${FontSize.h2};
  font-weight: bold;
  color: ${Colors.text_black};
  @media (max-width: 762px) {
    font-size: ${FontSize.lg};
  }
`;
const MessgeAbsolute = styled(Absolute)`
  z-index: 4;
  top: 19rem;
  left: 0.6rem;
  font-size: ${FontSize.md};
  padding-left: 1em;
  width: 9em;
`;
const ResizeMessageIcon = styled(Message)`
  width: 13em;
`;
const MessageIconAbsolute = styled(Absolute)`
  z-index: 0;
  min-width: 20rem;
  top: -4rem;
  right: -1rem;
  max-width: 10rem;
  max-height: 10rem;
  display: flex;
`;
const Comment = styled(IconPng)`
  position: absolute;
  top: 7rem;
  left: 16rem;
  width: 6rem;
  z-index: 0;
`;
const SelfieIcon = styled(IconPng)`
  z-index: -1;
  width: 30em;
  height: 30em;
`;
