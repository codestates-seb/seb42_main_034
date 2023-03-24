import { HoverAction } from 'component/style/cssTemplete';
import { Colors, ScreenSize } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import { Icon } from 'component/ui/Icon';
import { IconPng } from 'component/ui/Icons';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TalkIcon } from '../../image/talk.svg';
import Gsap from './Gsap';
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
  .animation {
    background: blue;
  }
`;
const StyledBtn = styled(Button)`
  position: absolute;
  top: 9rem;
  right: 10rem;
  font-size: xx-large;
  background: ${Colors.button_blue};
  border: none;
  ${HoverAction}
`;
const LandingFrame = styled.div`
  background: ${Colors.main_02};
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
`;
export default function TopCard() {
  return (
    <Hover className="animation">
      <LandingFrame>
        <div>현지인이 추천하는 찐 맛집, 여행지.</div>
        <div>더 시간 낭비 하지마시고 질문글을 올려서 여행계획을 세우세요!</div>
      </LandingFrame>
      {/* <Icon svg={<TalkIcon />} /> */}
      <IconPng src={`/image/selfie.png`} />
      <StyledBtn children="지금계획세우러가기" />
      <Gsap />
    </Hover>
  );
}
