import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthAPI } from 'api/auth';
import { useMypageAPI } from 'api/mypage';
import useTabs from 'hooks/useTabs';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import styled from 'styled-components'
import {FiEdit} from 'react-icons/fi'
import TabLists from 'component/ui/MypageTabs';
import Nbutton from 'component/ui/NButton';
import { logout } from 'redux/userSlice';
import { useEffect } from 'react';
import { useState } from 'react';
interface Tab {
  id: number;
  name: string;
}
export default function MyPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [tab,  curTab, handleTabChange] = useTabs(['작성 글', '작성 질문', '작성 댓글']);
  // const values = ['Tab 1', 'Tab 2', 'Tab 3'];
  // const [tabs, curTab, handleTabChange] = useTabs(values);
  const [tabs] = useState<Tab[]>([
    { id: 1, name: 'Tab 1' },
    { id: 2, name: 'Tab 2' },
    { id: 3, name: 'Tab 3' },
  ]);

  const [items, curTab, handleTabChange] = useTabs(tabs.map((tab) => tab.name));



  const {id} = useAppSelector(state => state.loginInfo)
  const {deleteLogout} = useAuthAPI();
  const {mutate: mutateLogout} = useMutation(deleteLogout);

  const linkEditPage = () => {
    navigate('/mypage/edit')
  };
  const { getMyInfo } = useMypageAPI();

  const {data} = useQuery({
    queryKey: ['myprofile'],
    queryFn: ()=> getMyInfo(id),
    retry: false,
  });
  useEffect(() => {
    console.log('curTab changed: ', curTab);
  }, [curTab]);

  return(<> 
  <MainContainer>
    My Page   
    <ProfileContainer>
      <img
      className='profileimage'
      // src={data?.avatarUrl}
      src="https://lh3.googleusercontent.com/ogw/AAEL6sg-m7ztfOSB36OJ7dQw_VPXqbBiEolmcTY7aii3DA=s64-c-mo"
      alt="프로필 이미지 입니다."
      >
      </img>

      <UserInfoContainer>
        <p>닉네임: {data?.nickname ?? '로그인 상태가 아닙니다.'}</p>
        <p>
          도시 : {data?.address ?? '도시가 설정되어 있지 않습니다.'}
        </p>
        <div className='editprofile'>
          <p className='editbtn' onClick={linkEditPage}>
            수정하기
          </p>
          <FiEdit className='editbtnImg' onClick={linkEditPage}/>
        </div>
      </UserInfoContainer>
    </ProfileContainer>

    <div>
      <TabLists tabs={items} handleChange={handleTabChange} />
      {curTab && <div>{curTab.name} content</div>}
    </div>

    {/* <div>
      <h1>My Page</h1>
      <TabLists
        tabs={tabs.map((tab, index) => ({ ...tab, selected: items[index].selected }))}
        handleChange={handleTabChange}
      />
      {curTab && <div>{curTab.name} content</div>}
    </div> */}
{/* 
    <TabLists handleChange={handleTabChange} tabs={tabs}/>

<div>
      {tabs.map((tab) => (
        <div key={tab.id} onClick={() => handleTabChange(tab.id)}>
          {tab.name}
        </div>
      ))}
      <div>Selected Tab: {curTab?.name}</div>
    </div> */}



    <Nbutton
    onClick={() => {
      const confirm = window.confirm('로그아웃을 하시겠습니까?');
      if(!confirm) return;
      mutateLogout();
      dispatch(logout());
      navigate('/board/signin');
    }}
    >
      로그아웃
    </Nbutton>


  </MainContainer>
  </>
  )
}



const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
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
  }
`
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
`

