import React from 'react';
import styled from 'styled-components';
interface Avatar {
  avatarUrl: string | null | undefined;
  width?: string;
  height?: string;
}
export default function Profile({ avatarUrl, width, height }: Avatar) {
  return (
    <>
      {avatarUrl ? (
        <Avatar src={avatarUrl} width={width} height={height} />
      ) : (
        <Avatar src={`/image/user.png`} width={width} height={height} />
      )}
    </>
  );
}
const Avatar = styled.img`
  border-radius: 100%;
  border: 1px solid black;
  width: ${(props) => props.width || '2rem'};
  height: ${(props) => props.height || '2rem'};
`;
