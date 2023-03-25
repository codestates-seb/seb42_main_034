import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HoverAction } from '../style/cssTemplete';
import { Button } from 'component/ui/Button';
import { useAppSelector } from 'redux/hooks';

const MenuTabBtn = styled(Button)`
  border: none;
  background: none;
  ${HoverAction}
`;
export default function UserTab() {
  //상태넣을자리
  //로그인 상태에 따라서 로그인 ,회원가입 or 로그아웃,마이페이지
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const [login, setLogin] = useState(isLogin);
  const navigate = useNavigate();
  const handleClick = (route: string) => {
    navigate(route);
  };

  return (
    <>
      {login || (
        <div>
          <MenuTabBtn children="로그인" onClick={() => handleClick('/board/signin')} className="" />
          <MenuTabBtn children="회원가입" onClick={() => handleClick('/board/signup')} className="" />
        </div>
      )}
      {login && (
        <div>
          <MenuTabBtn children="로그아웃" onClick={() => handleClick('/board/signin')} className="" />
          <MenuTabBtn children="마이페이지" onClick={() => handleClick('/board/mypage')} className="" />
        </div>
      )}
    </>
  );
}
