import { useMypageAPI } from 'api/mypage';
import Nbutton from 'component/ui/NButton';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { deleteUserInfo } from 'redux/userInfoSlice';
import { logout } from 'redux/userSlice';
import styled from 'styled-components';
import Swal from 'sweetalert2';

export default function DeleteMyInfo() {
  const { deleteMemberInfo } = useMypageAPI();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    Swal.fire({
      title: '정말로 회원탈퇴하길 원하십니까? 삭제된 정보는 다시 복구되지 않습니다.',
      showCancelButton: true,
      confirmButtonText: '탈퇴하겠습니다',
      cancelButtonText: '아니오',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(
          '탈퇴 처리 완료되었습니다. 저희 서비스는 계속해서 개선해 나가고 있으니, 다음에 또 찾아주길 바랍니다.',
          '',
          'success',
        );
        deleteMemberInfo().then((res) => {
          dispatch(logout());
          dispatch(deleteUserInfo());
          navigate(`/`);
          console.log(res);
        });
      }
    });
  };
  return <Withdrawal onClick={handleDelete}>회원탈퇴</Withdrawal>;
}

const Withdrawal = styled(Nbutton)``;
