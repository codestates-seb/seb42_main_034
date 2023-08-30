import { useLike } from './data';
import { useMutation } from '@tanstack/react-query';
export default useupdataBulletinPostLike = ({ onSuccess, onError }) => {
  const queryKey = 'updateLike';
  const { setLike } = useLike();
  const { mutateAsync } = useMutation({ mutationKey: queryKey, mutationFn: () => setLike, onSuccess, onError });

  return { mutateAsync, queryKey };
};
