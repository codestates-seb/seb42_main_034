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
import { setUserInfo } from 'redux/userInfoReducer';
import { deleteUserInfo, initialState } from 'redux/userInfoSlice';
import Modal from 'component/ui/Modal';
import SignIn from 'pages/user/SignIn';
import SignUp from 'pages/user/SignUp';
import { SignUpForm } from 'component/SignUp/SignUpForm';
const MenuTabBtn = styled(Button)`
  border: none;
  background: none;
  ${HoverAction}
  font-size: ${FontSize.md};
`;
export default function UserTab() {
  //상태넣을자리
  //로그인 상태에 따라서 로그인 ,회원가입 or 로그아웃,마이페이지
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUpModalActive, setIsSignUpModalActive] = useState(false);
  const [isSignInModalActive, setIsSignInModalActive] = useState(false);
  const handleClick = (route: string) => {
    navigate(route);
  };
  useEffect(() => {
    console.log();
  }, [isLogin]);
  const { deleteLogout } = useAuthAPI();
  const { mutate: mutateLogout } = useMutation(deleteLogout);
  const handleLogOut = () => {
    const confirm = window.confirm('로그아웃을 하시겠습니까?');
    if (!confirm) return;
    mutateLogout();
    dispatch(logout());
    dispatch(deleteUserInfo());
  };

  return (
    <>
      {isLogin || (
        <div>
          {isSignUpModalActive && (
            <Modal
              modal={isSignUpModalActive}
              setModal={setIsSignUpModalActive}
              width="350"
              height="500"
              children={
                <SignUp
                  setModal={setIsSignUpModalActive}
                  modal={isSignUpModalActive}
                  setsiginInModal={setIsSignInModalActive}
                />
              }
            />
          )}
          {isSignInModalActive && (
            <Modal
              modal={isSignInModalActive}
              setModal={setIsSignInModalActive}
              width="350"
              height="500"
              children={
                <SignIn
                  setModal={setIsSignInModalActive}
                  modal={isSignInModalActive}
                  setsignupModal={setIsSignUpModalActive}
                />
              }
            />
          )}
          <MenuTabBtn
            children="로그인"
            onClick={() => {
              // handleClick('/board/signin');
              setIsSignInModalActive(!isSignInModalActive);
            }}
            className=""
          />
          <MenuTabBtn
            children="회원가입"
            onClick={() => {
              // handleClick('/board/signup');
              setIsSignUpModalActive(!isSignUpModalActive);
            }}
            className=""
          />
        </div>
      )}
      {isLogin && (
        <MediaUserTab>
          <MenuTabBtn children="로그아웃" onClick={handleLogOut} className="" />
          <MenuTabBtn children="마이페이지" onClick={() => handleClick('/board/mypage')} className="" />
        </MediaUserTab>
      )}
    </>
  );
}
const MediaUserTab = styled.div`
  text-align: end;
`;
