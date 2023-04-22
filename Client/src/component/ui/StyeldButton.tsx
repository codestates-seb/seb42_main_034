import LoginButton from "component/Sign/LoginButton";
import styled from "styled-components";
import React from "react";
import { keyframes } from "styled-components";


export const StyeldButton = () => {
    return (
<StyledLoginButton fontSize="small" backgroundColor="grey">
<span></span>
<span></span>
<span></span>
<span></span>
 버튼입니다
</StyledLoginButton>)

}

const btnAnim1 = keyframes`
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
`;

const btnAnim2 = keyframes`
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
`;

const btnAnim3 = keyframes`
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
`;

const btnAnim4 = keyframes`
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
`;
const StyledLoginButton = styled(LoginButton)`
  position: relative;
  display: inline-block;
  height: 2.5rem;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  overflow: hidden;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 10px;
  padding: 12px 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #0583c6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #0583c6, 0 0 25px #0583c6, 0 0 50px #0583c6, 0 0 100px #0583c6;
  }
  span {
    position: absolute;
    display: block;
  }
  span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;

    background: linear-gradient(90deg, transparent, #013ef6);

    animation: ${btnAnim1} 1s linear infinite;
  }
  span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;

    background: linear-gradient(180deg, transparent, #013ef6);

    animation: ${btnAnim2} 1s linear infinite;
    animation-delay: 0.25s;
  }
  span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;

    background: linear-gradient(270deg, transparent, #013ef6);

    animation: ${btnAnim3} 1s linear infinite;
    animation-delay: 0.5s;
  }
  span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;

    background: linear-gradient(360deg, transparent, #013ef6);

    animation: ${btnAnim4} 1s linear infinite;
    animation-delay: 0.75s;
  }
`;
