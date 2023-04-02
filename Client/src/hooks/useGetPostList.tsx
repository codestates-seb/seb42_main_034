import { useInfiniteQuery } from "@tanstack/react-query";
import { useMypageAPI } from "api/mypage"



// export const useGetPostList = () => {

//     const {getPostList} = useMypageAPI();

//     const {
//         data: getPost,
//     } = useInfiniteQuery({
//         queryKey: ['getPost'],
//         queryFn: ({pageParam = undefined}) => getPostList(pageParam),
//         getNextPageParam: lastPage => {
//             return lastPage?.content?.slice(-1)[0]?.postId;
//         }
//     });
//     return {
//         getPost
//     }
// } 