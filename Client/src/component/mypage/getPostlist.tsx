import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMypageAPI } from "api/mypage";
import { useAppSelector } from "redux/hooks";

const PostList: FunctionComponent = () => {
  const { id } = useAppSelector((state) => state.loginInfo);
  const { getMyInfo } = useMypageAPI();
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMyInfo(id),
    retry: false,
  });

  return (
    <MainContainer>
      {data?.nickname}
      {data?.comments}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #eaeaea;
`;

export default PostList;
