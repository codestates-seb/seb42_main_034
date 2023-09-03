import Avatar from 'component/mypage/Avatar';
import Modal from 'component/ui/editModal';
import useAPI from 'hooks/uesAPI';
import { FixmemberInfo, useFixInfo } from 'hooks/useFixInfo';
import React, { useCallback, useRef } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateUserInfo } from 'redux/userInfoSlice';
import styled from 'styled-components';
import { notifi } from 'utils/notifi';
import { AiOutlineEdit } from 'react-icons/ai';
import { Colors, FontSize } from 'component/style/variables';
import { Flex } from 'component/style/cssTemplete';
import { uploadToS3 } from 'api/imageUpload';
import { useImageUpload } from 'hooks/useImageUpload';
import EditNickNameInput from 'component/mypage/ProFileEdit/EditNickNameInput';
import EditImage from 'component/mypage/ProFileEdit/EditImage';
import { Button } from 'component/ui/Button';
function ProfileEditPage() {
  const api = useAPI();

  //위치정보 수정
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const userInfo = useAppSelector((state) => state.persistReducer.userInfo);
  //   const location = useGeolocation().coordinates || {
  //     latitude: 0,
  //     longitude: 0,
  //   };

  //유저이미지

  const [nickname, setNickname] = useState<string>(userInfo.nickname);
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [isPassword, setIsPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState<string>('');
  const [isNickname, setIsNickname] = useState<boolean>(false);
  //멤버정보이미지로 백엔드와 협의 후 변경
  // const [image, setImage] = useState<FileList>();
  // const [srcImage, setSrcImage] = useState<string>('');
  const { image, srcImage, isImageEdit, handleImageUpload, setIsImageEdit } = useImageUpload();
  const dispatch = useAppDispatch();
  const imageRef = useRef<HTMLInputElement>();
  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.files)
  //  //중요
  //   if (e.target.files === null) return;
  //   if (e.target.files?.length > 0) {

  //     const url = await uploadToS3(e.target.files[0]);

  //    setSrcImage(url);
  //    //이미지 객체 저장
  //    setImage(e.target.files)
  //   }
  // };
  console.log('src확인', srcImage);

  //바로 수정하는 훅
  const { mutate } = useFixInfo({
    nickname,
    location: userInfo?.location,
    password,
    avatarUrl: srcImage,
  });
  const handleSubmit = () => {
    if (isPassword === false) {
      notifi(dispatch, '회원가입 양식을 획인 해주세요.');
    } else {
      const isconfirm = window.confirm('수정을 완료 하시겠습니까?');
      if (!isconfirm) return;
      // setImage()
      mutate();
      setIsImageEdit(false);
      navigate(-1);
    }
  };
  const handleChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      //   notifi(dispatch, '1자 이상의 숫자와 1자 이상의 영문자 조합으로 8자리 이상 입력해주세요.');
      setPasswordMessage('1자 이상의 숫자와 1자 이상의 영문자 조합으로 8자리 이상 입력해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 비밀번호 형식입니다.');
      setIsPassword(true);
    }
  }, []);
  //닉네임
  const handleChangeNickname = useCallback<(event: React.ChangeEvent<HTMLInputElement>) => void>((event) => {
    setNickname(event.target.value);
    if (event.target.value.length < 2 || event.target.value.length > 10) {
      //   notifi(dispatch, '2글자 이상 10글자 미만으로 입력해주세요.');
      setNicknameMessage('2글자 이상 10글자 미만으로 입력해주세요.');
      setIsNickname(false);
    } else {
      setNicknameMessage('');
      setIsNickname(true);
    }
  }, []);

  const handleBlurNickname = () => {
    dispatch(updateUserInfo({ key: 'nickName', value: nickname }));
  };

  return (
    <>
      <SubTitle>
        회원정보 수정
        <AiOutlineEdit />
        <div className="color">닉네임을 수정 할 수 있습니다.</div>
      </SubTitle>
      <Layout>
        <EditImage isEdit={isImageEdit} image={srcImage} onImage={handleImageUpload} />
        {/* <ProfileEditBox> */}
        {/* <Avatar /> */}
        <EditNickNameInput
          onName={handleChangeNickname}
          name={nickname}
          onBlurName={handleBlurNickname}
          onNameMessage={setNicknameMessage}
          nameMessage={nicknameMessage}
        />
        <div className="miniTitle  ">도시설정</div>
        <div>
          <input
            className="input"
            placeholder="도시를 설정하기 위해 여기를 클릭"
            value={userInfo?.location || ''}
            disabled={false}
            onClick={() => {
              onClickToggleModal();
            }}
            readOnly
          />
        </div>{' '}
        <input placeholder="변경할 비밀번호를 입력해주세요" onChange={handleChangePassword} type="password" />
        <div>{passwordMessage}</div>
        <SubmitButton onClick={handleSubmit} className="Button">
          저장
        </SubmitButton>
        {isOpenModal && (
          <>
            <Modal onClickToggleModal={onClickToggleModal} />
          </>
        )}
        {/* </ProfileEditBox> */}
        {/* ) : ('잘못된 요청')}  */}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* font-size: 1.3rem;*/

  width: 100%;
  .username {
    padding-top: 2rem;
    padding-bottom: 0.5rem;
  }
  input {
    width: 70%;
    height: 2rem;
    margin-top: 10;
    padding: 5px;
    border-radius: 1.2rem;
    border: 1px solid grey;
  }
  .miniTitle {
    padding-top: 2rem;
    padding-bottom: 0.5rem;
    font-size: 15px;
    color: ${Colors.text_black};
    display: flex;
  }
  .check {
    border: 3px solid blue;
    width: 60px;
    font-size: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 5px;
    color: #016241;
    cursor: pointer;
    :hover {
      background-color: grey;
      color: #eaeaea;
    }
  }

  .image {
    box-sizing: border-box;
    width: 200px;
    height: 200px;
    border-radius: 1000px;
    border: 0.5px solid gray;
    cursor: pointer;
    :hover {
      border: 3px solid white;
    }
  }

  .input {
    display: flex;
    text-align: center;
    align-items: center;
  }
  .editicon {
    width: 20px;
    height: 20px;
    color: skyblue;
    cursor: pointer;
    padding-left: 5px;
  }
`;

const SubTitle = styled.p`
  font-size: 30px;
  color: black;
  margin-bottom: 35px;
  text-align: start;
  width: 90%;
  .color {
    color: ${Colors.text_grey};
    font-size: ${FontSize.md};
  }
`;

const SubmitButton = styled(Button)`
  height: 2rem;
  width: 7rem;
`;

const ProfileEditBox = styled.div``;

export default ProfileEditPage;
