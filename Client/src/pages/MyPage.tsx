import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthAPI } from 'api/auth';
import { useMypageAPI } from 'api/mypage';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import Nbutton from 'component/ui/NButton';
import { logout } from 'redux/userSlice';
import { useState } from 'react';
import PostList from 'component/mypage/getPostlist';
import BlogsList from 'component/mypage/getBlogslist';

export default function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memberId, isLogin } = useAppSelector((state) => state.loginInfo);
  const { deleteLogout } = useAuthAPI();
  const { mutate: mutateLogout } = useMutation(deleteLogout);

  const linkEditPage = () => {
    navigate('/board/mypage/edit');
  };
  const { getMyInfo } = useMypageAPI();

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMyInfo(memberId),
    retry: false,
  });
  console.log(data);

  useEffect(() => {
    if (isLogin === false) {
      navigate(`/`);
    }
  }, [isLogin]);

  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const renderTabs = () => {
    return (
      <>
        <TabStyled onClick={() => handleTabClick(0)}>작성한 질문</TabStyled>
        <TabStyled onClick={() => handleTabClick(1)}>작성한 블로그 글</TabStyled>
        <TabStyled onClick={() => handleTabClick(2)}>작성한 댓글</TabStyled>
      </>
    );
  };
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

  return (
    <>
      <MainContainer>
        My Page
        <ProfileContainer>
          <img
            className="profileimage"
            // src={data?.avatarUrl}
            src="https://cdn.discordapp.com/attachments/1049217694601330710/1089858376487411893/2023-03-20_125506.png"
            alt="프로필 이미지 입니다."
          ></img>

          <UserInfoContainer>
            <p>닉네임: {data?.nickname ?? '로그인 정보를 불러오지 못했습니다.'}</p>
            <p>
              도시 : {data?.location ?? '도시가 설정되어 있지 않습니다.'}
              {data?.address}
            </p>
            <div className="editprofile">
              <p className="editbtn" onClick={linkEditPage}>
                프로필 수정하기 및 도시인증 하기
              </p>
              <FiEdit className="editbtnImg" onClick={linkEditPage} />
            </div>
          </UserInfoContainer>
        </ProfileContainer>
        <TabContainer>{renderTabs()}</TabContainer>
        {renderTabContent()}
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
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 90%;
`;
const ProfileContainer = styled.div`
  width: 90%;
  padding: 1.2rem;
  background-color: white;
  border: solid 1px blue;

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
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2rem;
  border: solid 1px black;
  .click {
    padding-left: 8px;
    cursor: pointer;
  }
  .editprofile {
    display: flex;
    color: skyblue;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 1rem 0;
  max-width: 800px;
`;

const TabStyled = styled.button`
  width: 200px;
  height: 2.5rem;
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
`;

const LogOuttbutton = styled(Nbutton)`
  margin-top: 300px;
  &:hover {
    background: #0583c6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #0583c6, 0 0 25px #0583c6, 0 0 50px #0583c6, 0 0 100px #0583c6;
  }
`;
