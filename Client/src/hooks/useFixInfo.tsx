import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMypageAPI } from 'api/mypage';
import { useCallback } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { notifi } from 'utils/notifi';

export interface FixmemberInfo {
  nickname: string;
  location: string;
  password: string;
  // address: string;
  avatarUrl: string;
}

export const useFixInfo = (content: FixmemberInfo) => {
  const { patchFixMemberInfo } = useMypageAPI();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => patchFixMemberInfo(content), {
    onSuccess: () => {
      console.log(content);

      queryClient.invalidateQueries({ queryKey: ['me'] });
      notifi(dispatch, '정보가 수정 되었습니다.');
    },
  });
  return { mutate };
};
