import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
export default function ProfileEditBtn() {
  const navigate = useNavigate();

  const linkEditPage = () => {
    navigate('/board/mypage/edit');
  };
  return (
    <div className="editprofile">
      <p className="editbtn" onClick={linkEditPage}>
        프로필 수정하기 및 도시인증 하기
      </p>
      <FiEdit className="editbtnImg" onClick={linkEditPage} />
    </div>
  );
}
