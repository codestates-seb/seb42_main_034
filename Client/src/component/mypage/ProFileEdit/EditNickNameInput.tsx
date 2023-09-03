import TextInput from 'component/ui/Input';
import { MoveBtn } from 'pages/QuestionBoardList';
import React, { useCallback } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { updateUserInfo } from 'redux/userInfoSlice';
import styled from 'styled-components';
import { notifi } from 'utils/notifi';
interface NickNameEditProps {
  onName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  onBlurName: () => void;
  onNameMessage: React.Dispatch<React.SetStateAction<string>>;
  nameMessage: string;
}
export default function EditNickNameInput({ onName, name, onBlurName, onNameMessage, nameMessage }: NickNameEditProps) {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>
        <div className="miniTitle">닉네임</div>
        <div>
          <NickNameInput
            placeholder="수정할 닉네임을 작성하세요(15자이하)"
            disabled={false}
            type="nickname"
            value={name}
            onChange={onName}
            onBlur={onBlurName}
            maxLength={15}
            className="input"
          />
          <ConfirmBtn
            onClick={() => {
              notifi(dispatch, '사용가능한 닉네임 입니다.');
              console.log('nickname check');
            }}
          >
            중복확인
          </ConfirmBtn>
        </div>
      </div>

      <div>{nameMessage}</div>
    </div>
  );
}
const NickNameInput = styled.input``;
const ConfirmBtn = styled(MoveBtn)``;
