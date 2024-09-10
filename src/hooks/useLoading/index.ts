import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../store/loading/loading';

export const useLoading = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state:any) => state.loading.isLoading);

  const setLoading = (status:any) => {
    if (status) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  };

  return { isLoading, setLoading };
};
