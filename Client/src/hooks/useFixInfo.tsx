import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMypageAPI } from "api/mypage";
import { useAppDispatch } from "redux/hooks";
import { notifi } from "utils/notifi";


interface FixmemberInfo {
    nickname: string;
    location: {
        latitude: string | number;
        longitude: string | number;
    };
    address: string;
    avatarUrl: string;
}

export const useFixInfo = (content: FixmemberInfo) => {
    const {patchFixMemberInfo} = useMypageAPI();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient(); 

    const {mutate} = useMutation(() => patchFixMemberInfo(content), {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['myprofile']});
            notifi(dispatch, '정보가 수정 되었습니다.')
        }
    });
    return {mutate}
}