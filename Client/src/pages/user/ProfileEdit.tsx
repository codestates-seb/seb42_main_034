import Avatar from "component/mypage/Avatar";
import Modal from "component/ui/Modal";
import { handleScroll } from "component/ui/ScrollTop";
import { useFixInfo } from "hooks/useFixInfo";
import useGeolocation from "hooks/useGeoLocation";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { updateUserInfo } from "redux/userInfoSlice";
import styled from "styled-components";
import { notifi } from "utils/notifi";


function ProfileEditPage() {
    //위치정보 수정
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const onClickToggleModal = useCallback(() => {
        setOpenModal(!isOpenModal);
    }, [isOpenModal])
    const userInfo = useAppSelector((state) => state.persistReducer.userInfo);

    const location = useGeolocation().coordinates || {
        latitude: 0,
        longitude: 0,
    };

    //유저이미지
    const {address, avatarUrl} = userInfo;
    const [nickname, setNickname] = useState(userInfo.name);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {mutate} = useFixInfo({
        nickname,
        location,
        address: address,
        avatarUrl,
    })

    //닉네임
    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }

    const handleBlurNickname = () => {
        dispatch(updateUserInfo({ key: 'nickname', value: nickname }));
      }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <Layout>

        {/* {userInfo.name ? ( */}
            <>
                <ProfileEditBox>
                    <SubTitle>회원정보 수정</SubTitle>
                    <Avatar/>
                    <p className="miniTitle">닉네임</p>
                    <div className="input">
                        <input 
                            placeholder="수정할 닉네임을 작성하세요(15자이하)"
                            disabled={false}
                            type="nickname"
                            value={nickname}
                            onChange={handleChangeNickname}
                            onBlur={handleBlurNickname}
                            maxLength={15}
                            className="nickname"
                        />
                        <button 
                        className="check"
                        onClick={() => {
                            notifi(dispatch, '사용가능한 닉네임 입니다.');
                        }}
                        >
                        중복확인
                        </button>
                    </div>

                        <p className="miniTitle">도시설정</p>
                        <div className="input">
                            <input 
                            placeholder="도시를 설정하기 위해 여기를 클릭"
                            value={address||''}
                            disabled={false}
                            onClick={() => {
                                onClickToggleModal();
                            }}
                            readOnly
                            />
                        </div>

                    <Button
                        onClick={() => {
                            const isconfirm = window.confirm('수정을 완료 하시겠습니까?');
                            if(!isconfirm) return;
                            mutate();
                            navigate('/board/mypage')
                        }}
                        className="Button"
                        
                    >
                        저장
                    </Button>
                            {isOpenModal && 
                            <>
                            <Modal onClickToggleModal={onClickToggleModal} />
                            <div>hihihihihihihihihihi</div>
                            </>
                            }
                </ProfileEditBox>
            </>
        {/* ) : ('잘못된 요청')}  */}


        </Layout>
    )
};



const Layout = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 1.3rem;
    text-align: center;
    width: 100%;

    .username {
        padding-top: 2rem;
        padding-bottom: 0.5rem;
    }
    input {
        width: 220px;
        margin-top: 10;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid grey;
    }

    .miniTitle {
        padding-top: 2rem;
        padding-bottom: 0.5rem;
        font-size: 15px;
        color: white;
        display: flex;
    }
`

const SubTitle = styled.p`
    font-size: 30px;
    color: white;
    margin-bottom: 35px;
    width: 50%;
`

const Button = styled.button`
    font-size: 1rem;
    color: skyblue;
    background-color: white;
    border-radius: 5px;
    width: 40%;
`

const ProfileEditBox = styled.div`
    border: 3px solid red;
    display: flex;
    flex-direction: column;
    width: 40%;
    top: 22%;
    padding: 1.2rem;
    background-color: #52a3e9;
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 12px;
    margin-top: 120px;
    align-items: center;

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

    .nickname{
        width: 160px;
    }

    .image{
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

    .Button {
        margin-top: 2.5rem;
        width: 230px;
        font-size: 16px;
        background-color: skyblue;
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

export default ProfileEditPage;