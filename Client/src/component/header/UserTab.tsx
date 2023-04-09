import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HoverAction } from '../style/cssTemplete';
import { Button } from 'component/ui/Button';
import { useAppSelector } from 'redux/hooks';
import { logout } from 'redux/userSlice';
import { FontSize } from 'component/style/variables';
import { useAuthAPI } from 'api/auth';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
const MenuTabBtn = styled(Button)`
  border: none;
  background: none;
  ${HoverAction}
  font-size: ${FontSize.lg};
`;
export default function UserTab() {
  //상태넣을자리
  //로그인 상태에 따라서 로그인 ,회원가입 or 로그아웃,마이페이지
  const { isLogin } = useAppSelector((state) => state.loginInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (route: string) => {
    navigate(route);
  };
  useEffect(() => {
    console.log('s');
  }, [isLogin]);
  const { deleteLogout } = useAuthAPI();
  const { mutate: mutateLogout } = useMutation(deleteLogout);
  const handleLogOut = () => {
    const confirm = window.confirm('로그아웃을 하시겠습니까?');
    if (!confirm) return;
    mutateLogout();
    dispatch(logout());
  };

  return (
    <>
      {isLogin || (
        <div>
          <MenuTabBtn
            children="로그인"
            onClick={() => {
              handleClick('/board/signin');
            }}
            className=""
          />
          <MenuTabBtn
            children="회원가입"
            onClick={() => {
              handleClick('/board/signup');
            }}
            className=""
          />
        </div>
      )}
      {isLogin && (
        <div>
          <MenuTabBtn children="로그아웃" onClick={handleLogOut} className="" />
          <MenuTabBtn children="마이페이지" onClick={() => handleClick('/board/mypage')} className="" />
        </div>
      )}
    </>
  );
}
