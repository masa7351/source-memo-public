import { useSelector } from 'react-redux';
import { RootState } from '../../../logics/reducers/rootReducer';

export const useLoading = () => {
  const isLoadingUser = useSelector<RootState, boolean>(
    state => state.auth.isLoadingUser
  );

  return {
    isLoadingUser
  };
};
