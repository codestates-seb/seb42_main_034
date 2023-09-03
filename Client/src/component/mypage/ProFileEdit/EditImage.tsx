import { Flex } from 'component/style/cssTemplete';
import React from 'react';
import styled from 'styled-components';
interface EditImageProps {
  isEdit: boolean;
  image: string;
  onImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}
export default function EditImage({ isEdit, image, onImage }: EditImageProps) {
  return (
    <ImageUploadDiv>
      <label htmlFor="file">프로필 이미지 등록</label>
      <Flex direction="column" items="center">
        {isEdit && <img alt="" src={image} />}
        <input type="file" multiple className="input" accept=".png, .jpeg, .jpg" onChange={onImage} />
      </Flex>
    </ImageUploadDiv>
  );
}
const ImageUploadDiv = styled.div`
  width: 100%;
`;
