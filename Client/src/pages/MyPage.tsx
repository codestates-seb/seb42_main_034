import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthAPI } from 'api/auth';
import { useMypageAPI } from 'api/mypage';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import Nbutton from 'component/ui/NButton';
import { logout } from 'redux/userSlice';
import { useState } from 'react';

import BlogsList from 'component/mypage/Blogslist';
import DeleteMyInfo from 'component/mypage/DeleteMyInfo';
import Profile from 'component/ui/Profile';
import Avatar from 'component/mypage/Avatar';
import UserInfo from 'component/mypage/UserInfo';
import MyPostTab from 'component/mypage/MyPostTab';
import PostList from 'component/mypage/Postlist';
import { Button } from 'component/ui/Button';
import { MoveBtn } from './QuestionBoardList';
import { Flex } from 'component/style/cssTemplete';

export default function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postTab: string[] = ['내 질문글', '내 블로그글', '내 댓글'];
  const { memberId, isLogin, avatarUrl } = useAppSelector((state) => state.loginInfo);
  const { deleteLogout } = useAuthAPI();
  const { mutate: mutateLogout } = useMutation(deleteLogout);
  const [activeTab, setActiveTab] = useState<number>(0);
  const { getMyInfo } = useMypageAPI();
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMyInfo(memberId),
    retry: false,
  });
  console.log(data);
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <PostList />
          </>
        );
      case 1:
        return (
          <>
            <BlogsList />
          </>
        );

      case 2:
        return <div>작성한 댓글을 찾을 수 없습니다.</div>;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (isLogin === false) {
      navigate(`/`);
    }
  }, [isLogin, avatarUrl]);

  console.log(activeTab);

  // const renderTabs = () => {
  //   return (
  //     <>
  //       <TabStyled onClick={() => handleTabClick(0)}>작성한 질문</TabStyled>
  //       <TabStyled onClick={() => handleTabClick(1)}>작성한 블로그 글</TabStyled>
  //       <TabStyled onClick={() => handleTabClick(2)}>작성한 댓글</TabStyled>
  //     </>
  //   );
  // };

  console.log();

  return (
    <>
      <MainContainer>
        <MyPageSection>
          <img src={`/image/home.png`} />
          <span>My Page</span>
        </MyPageSection>
        <ProfileContainer>
          {<Profile avatarUrl={avatarUrl} height="7rem" width="7rem" />}

          {data && <UserInfo data={data} />}
        </ProfileContainer>
        <TabContainer>
          {data &&
            postTab.map((post, idx) => (
              <MyPostTab text={post} activeIdx={activeTab} clickIdx={idx} key={idx} onActiveIdx={setActiveTab} />
            ))}
        </TabContainer>
        {renderTabContent()}
        <Flex>
          <LogOuttbutton
            onClick={() => {
              const confirm = window.confirm('로그아웃을 하시겠습니까?');
              if (!confirm) return;
              mutateLogout();
              dispatch(logout());
              navigate('/board/signin');
            }}
          >
            로그아웃
          </LogOuttbutton>
          <DeleteMyInfo />
        </Flex>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;

  flex-direction: column;
  min-width: 100%;
`;
const MyPageSection = styled.h2`
  display: flex;
  gap: 0.2rem;
`;
const ProfileContainer = styled.div`
  padding: 1.2rem;
  background-color: white;
  display: flex;
  justify-content: start;

  .profileimage {
    width: 100px;
    height: 100px;
    border-radius: 500px;
    border: 1px solid grey;
    box-sizing: border-box;
  }
  .editbtn {
    cursor: pointer;
  }
  .editbtnImg {
    display: grid;
    position: relative;
    right: 0;
    padding-left: 10px;
    cursor: pointer;
    padding-top: 20px;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 1rem 0;
  max-width: 800px;
`;

const LogOuttbutton = styled(MoveBtn)`
  margin-top: 2rem;
  &:hover {
    background: #0583c6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #0583c6, 0 0 25px #0583c6, 0 0 50px #0583c6, 0 0 100px #0583c6;
  }
`;
