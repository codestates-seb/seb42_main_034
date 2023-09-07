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
    <NicknameContainer>
      <div>
        <div className="miniTitle">닉네임</div>
        <div className="nameBottom">
          <NickNameInput
            placeholder="수정할 닉네임을 작성하세요(15자이하)"
            disabled={false}
            type="nickname "
            value={name}
            onChange={onName}
            onBlur={onBlurName}
            maxLength={15}
            className="input"
          />
          <ConfirmBtn
            onClick={() => {
              notifi(dispatch, '사용가능한 닉네임 입니다.');
            }}
          >
            중복확인
          </ConfirmBtn>
        </div>
      </div>

      <div>{nameMessage}</div>
    </NicknameContainer>
  );
}
const NicknameContainer = styled.div`
  width: 100%;
  .nameBottom {
    display: flex;
    align-items: baseline;
  }
`;
const NickNameInput = styled.input``;
const ConfirmBtn = styled(MoveBtn)`
  margin: 0.5rem;
`;
