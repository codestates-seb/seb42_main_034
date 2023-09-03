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
      <label htmlFor="file" className=" miniTitle">
        프로필 이미지 등록
      </label>
      <Flex direction="column" items="start">
        {isEdit && <img alt="" src={image} />}
        <input type="file" multiple className="input width" accept=".png, .jpeg, .jpg" onChange={onImage} />
      </Flex>
    </ImageUploadDiv>
  );
}
const ImageUploadDiv = styled.div`
  width: 100%;
  .width {
    width: 99%;
  }
`;
