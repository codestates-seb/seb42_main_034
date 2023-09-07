import { Member } from 'api/mypage';
import { Colors } from 'component/style/variables';
import React from 'react';

import styled from 'styled-components';
import ProfileEditBtn from './EditBtn';
export default function UserInfo({ data }: { data: Member }) {
  return (
    <UserInfoContainer>
      <div>
        <div> {`닉네임: ${data.nickname || '로그인 정보를 불러오지 못했습니다.'}`}</div>
        <div> {`도시 : ${data.location || '도시가 설정되어 있지 않습니다.'}`}</div>
        <div>{`이메일 주소 : ${data.email || '이메일 정보를 불러오지 못했습니다.'}`}</div>
      </div>
      <ProfileEditBtn />
    </UserInfoContainer>
  );
}

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2rem;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100%;
  border-radius: 1rem;
  padding: 0.7rem;
  .click {
    padding-left: 8px;
    cursor: pointer;
  }
  .editprofile {
    display: flex;
    color: ${Colors.main_02};
    padding-top: 2rem;
    &:hover {
      color: ${Colors.main_01};
    }
  }
`;
