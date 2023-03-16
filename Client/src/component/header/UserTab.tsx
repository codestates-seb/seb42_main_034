import React from 'react';
import styled from 'styled-components';
import { NavButton } from '../ui/NavButton';
import { useNavigate } from 'react-router-dom';
import { HoverAction } from '../style/cssTemplete';
const MenuTabBtn = styled(NavButton)<{
  text: string;
  type: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
}>`
  border: none;
  ${HoverAction}
`;
export default function UserTab() {
  //상태넣을자리
  //로그인 상태에 따라서 로그인 ,회원가입 or 로그아웃,마이페이지
  const navigate = useNavigate();
  const handleClick = (route: string) => {
    navigate(route);
  };
  return (
    <div>
      <MenuTabBtn text="로그인" type="button" onClick={() => handleClick('/board/signin')} className="" />
      <MenuTabBtn text="회원가입" type="button" onClick={() => handleClick('/board/signup')} className="" />
    </div>
  );
}
