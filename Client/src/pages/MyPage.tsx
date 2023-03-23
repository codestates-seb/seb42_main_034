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
import { logoutg } from 'redux/userSlice';


export default function MyPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab,  curTab, handleTabChange] = useTabs(['작성 글', '작성 댓글']);
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


  return(<> 
  <MainContainer>
    My Page   
    <ProfileContainer>
      <img
      className='profileimage'
      src={data?.avatarUrl}
      alt="프로필 이미지 입니다."
      >
      </img>

      <UserInfoContainer>
        <p>닉네임: {data?.name ?? '로그인 상태가 아닙니다.'}</p>
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

    <TabLists handleChange={handleTabChange} tabs={tab}/>
    {/* {curTab === '작성 글' && <글 리스트 컴포넌트 />}
    {curTab === '작성 댓글' && <글 리스트 컴포넌트 />} */}


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
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 90%;
  border: solid 2px red;
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

